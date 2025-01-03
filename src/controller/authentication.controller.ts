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
        return res.status(401).json({
          message: 'O campo e-mail deve ser preenchido corretamente.'
        })
      }

      if (!password) {
        return res.status(401).json({
          message: 'O campo senha deve ser preenchido corretamente.'
        })
      }

      if (configuracao?.autenticacaoAd) {
        ad.authenticate(`${email}`, password, async (err, auth) => {
          if (err) {
            return res
              .status(401)
              .json({ message: 'Login ou senha inválidos.' })
          }

          if (auth) {
            let usuario = await Usuario.findOne({ where: { email } })
            console.log('Usuário encontrado:', usuario)
            if (!usuario) {
              await Usuario.create({
                email,
                password
              })
            }

            usuario = await Usuario.findOne({ where: { email } })

            // Verifica se o acesso é verdadeiro
            if (usuario?.acesso === true) {
              return res.status(200).json({
                message: 'Usuário validado com sucesso.',
                token: usuario?.generateToken()
              })
            } else {
              console.log('Acesso negado:', usuario?.acesso)

              const dataSolicitacao = new Date(usuario?.createdAt)
              dataSolicitacao.setDate(dataSolicitacao.getDate() + 1)

              const user = await Usuario.sequelize?.query(`
                SELECT TOP 1 NOME, CARGO, UNIDADE
                FROM TermoAceite.dbo.TOTVS
                WHERE email = '${usuario?.email}' AND EMAIL LIKE '%@pe.senac.br%' AND SITUACAO <> 'Demitido'
              `)

              console.log(JSON.stringify(user))
              const userResult = user[0]?.[0]

              const txEmail = `
              <h1> Sistema Uso de Imagem </h1>
              <br>O usuário ${userResult.NOME}, de cargo ${userResult.CARGO} da unidade ${userResult.UNIDADE}, com o email ${usuario?.email}, <br></>
              <b>Solicitou acesso ao sistema de uso de imagem na data: ${dataSolicitacao.toLocaleDateString(
                'pt-BR'
              )}.</b><br>
              <br/>
              <a href="https://www7.pe.senac.br/usoimagem/confirmar-acesso/${
                usuario?.id
              }">Aprovar acesso</a><p>
              `

              emailUtils.enviar(configuracao?.emailAutoriza, txEmail)
              return res.status(403).json({
                message:
                  'Acesso negado. Você deve ser validado pelo setor GTI.'
              })
            }
          }
        })
      } else {
        const registro = await Usuario.findOne({
          where: { email, ativo: true }
        })

        if (!registro) {
          return res
            .status(401)
            .json({ message: 'Não foi possível localizar o usuário.' })
        }

        if (!(await bcrypt.compare(password, registro.passwordHash))) {
          return res.status(401).json({ message: 'Senha inválida.' })
        }

        // Verifica se o acesso é verdadeiro
        if (registro.acesso === true) {
          return res.status(200).json({
            message: 'Usuário validado com sucesso.',
            token: registro.generateToken()
          })
        } else {
          emailUtils.enviar(configuracao?.emailAutoriza, txEmail)
          return res.status(403).json({
            message: 'Acesso negado. Você deve ser validado pelo setor GTI.'
          })
        }
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Login ou senha inválidos.' })
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
