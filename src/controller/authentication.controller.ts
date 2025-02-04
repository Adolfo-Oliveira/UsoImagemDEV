import { Request, Response, NextFunction } from 'express'
import ActivityDirectory from 'activedirectory'
import Usuario from '../model/usuario.model'
import ConfiguracaoGlobal from '../model/configuracaoGeral.model'
import bcrypt from 'bcrypt'
import emailUtils from '../utils/email.utils'

class AuthenticationController {
  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const configuracao = await ConfiguracaoGlobal.findOne()
      const emailAutoriza = configuracao?.emailAutoriza

      const config = {
        url: configuracao?.urlAd,
        baseDN: configuracao?.baseDN,
        username: configuracao?.usernameAd,
        password: configuracao?.passwordAd
      }

      const ad = new ActivityDirectory(config)

      if (!email) {
        return res.status(401).json({ message: 'O campo e-mail deve ser preenchido corretamente.' })
      }

      if (!password) {
        return res.status(401).json({ message: 'O campo senha deve ser preenchido corretamente.' })
      }

      if (configuracao?.autenticacaoAd) {
        ad.authenticate(`${email}`, password, async (err, auth) => {
          if (err) {
            return res.status(401).json({ message: 'Login ou senha inválidos.' })
          }

          if (auth) {
            try {
              let usuario = await Usuario.findOne({ where: { email } })
              if (!usuario) {
                await Usuario.create({ email, password })
              }

              usuario = await Usuario.findOne({ where: { email } })

              if (usuario?.acesso === true) {
                return res.status(200).json({ message: 'Usuário validado com sucesso.', token: usuario?.generateToken() })
              } else {
                const dataSolicitacao = new Date()
                dataSolicitacao.setDate(dataSolicitacao.getDate())

                const user = await Usuario.sequelize?.query(`
                  SELECT TOP 1 NOME, CARGO, UNIDADE
                  FROM TermoAceite.dbo.TOTVS
                  WHERE email = '${usuario?.email}' AND EMAIL LIKE '%@pe.senac.br%' AND SITUACAO <> 'Demitido'
                `)

                const userResult = user[0]?.[0]

                const txEmail = `
                <h1> Sistema Uso de Imagem </h1>
                <br>O usuário ${userResult?.NOME}, de cargo ${userResult?.CARGO} da unidade ${userResult?.UNIDADE}, com o email ${usuario?.email}, <br></>
                <b>Solicitou acesso ao sistema de uso de imagem na data: ${dataSolicitacao.toLocaleDateString('pt-BR')}.</b><br>
                <br/>
                <a href="https://www7.pe.senac.br/usoimagem/confirmar-acesso/${usuario?.id}">Aprovar acesso</a><p>
                `

                try {
                  if (emailAutoriza) {
                    await emailUtils.enviar(emailAutoriza, txEmail)
                  } else {
                    console.warn('E-mail de autorização não configurado.')
                  }
                } catch (error) {
                  console.error('Erro ao enviar e-mail:', error)
                }

                return res.status(403).json({ message: 'Acesso negado. Você deve ser validado pelo setor GTI.' })
              }
            } catch (error) {
              console.error('Erro ao processar login:', error)
              return res.status(500).json({ message: 'Erro ao processar login.' })
            }
          }
        })
      } else {
        try {
          const registro = await Usuario.findOne({ where: { email, ativo: true } })

          if (!registro) {
            return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
          }

          if (!(await bcrypt.compare(password, registro.passwordHash))) {
            return res.status(401).json({ message: 'Senha inválida.' })
          }

          if (registro.acesso === true) {
            return res.status(200).json({ message: 'Usuário validado com sucesso.', token: registro.generateToken() })
          } else {
            try {
              if (emailAutoriza) {
                await emailUtils.enviar(emailAutoriza, txEmail)
              } else {
                console.warn('E-mail de autorização não configurado.')
              }
            } catch (error) {
              console.error('Erro ao enviar e-mail:', error)
            }

            return res.status(403).json({ message: 'Acesso negado. Você deve ser validado pelo setor GTI.' })
          }
        } catch (error) {
          console.error('Erro ao processar login:', error)
          return res.status(500).json({ message: 'Erro ao processar login.' })
        }
      }
    } catch (err) {
      console.error('Erro geral:', err)
      res.status(400).json({ message: 'Erro inesperado ao realizar login.' })
    }
  }

  async logged (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      res.status(200).json({ data: req.usuario })
    } catch (err) {
      return res.status(401).json({ message: err.errors[0].message })
    }
  }
}

export default new AuthenticationController()
