import { Request, Response, NextFunction } from 'express'
import ActivityDirectory from 'activedirectory'
import Usuario from '../model/usuario.model'
import ConfiguracaoGlobal from '../model/configuracaoGeral.model'
import bcrypt from 'bcrypt'
import { Utils } from 'sequelize'
import emailUtils from '../utils/email.utils'

class AuthenticationController {
  async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const configuracao = await ConfiguracaoGlobal.findOne()

      const config = {
        url: configuracao?.urlAd,
        baseDN: configuracao?.baseDN,
        username: configuracao?.usernameAd,
        password: configuracao?.passwordAd
      }

      const ad = new ActivityDirectory(config)
      console.log('aqui:'+JSON.stringify(ad))

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
            return res.status(401).json({ message: 'Login ou senha inválidos.' })
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
            console.log('Usuário após criação:', usuario)

            // Verifica se o acesso é verdadeiro
            if (usuario?.acesso === true) {
              return res.status(200).json({
                message: 'Usuário validado com sucesso.',
                token: usuario?.generateToken()
              })
            } else {
              console.log('Acesso negado:', usuario?.acesso)

              const txEmail = `
            <b>O usuário ${usuario?.email}.</b><br>
            <b>Solicita acesso ao sistema de uso de imagem</b><br>
           
            <br/>
            <a href="http://10.9.9.150:3000/confirmar-acesso/${usuario?.id}">Aprovar acesso</a><p>
            `

              emailUtils.enviar('adolfoooliveira@gmail.com', txEmail)
              return res.status(403).json({
                message: 'Acesso negado. Você deve ser validado pelo setor GTI.'
              })
            }
          }
        })
      } else {
        const registro = await Usuario.findOne({
          where: { email, ativo: true }
        })

        if (!registro) {
          return res.status(401).json({ message: 'Não foi possível localizar o usuário.' })
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
          emailUtils.enviar('adolfoooliveira@gmail.com', txEmail)
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

  // async validarAcesso (req: Request, res: Response): Promise<any> {
  //   try {
  //     const { id } = req.body
  //     const usuario = await Usuario.findOne({ where: { id } })

  //     if (!usuario) {
  //       return res.status(404).json({ message: 'Usuário não encontrado.' })
  //     }

  //     // Após a validação do outro setor, atualize o campo acesso
  //     await usuario.update({ acesso: true }) // Assumindo que 'true' é a validação

  //     return res.status(200).json({ message: 'Usuário validado pela GTI.' })
  //   } catch (err) {
  //     console.log(err)
  //     return res.status(400).json({ message: 'Erro ao validar usuário.' })
  //   }
  // }

  async logged (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      res.status(200).json({ data: req.usuario })
    } catch (err) {
      return res.status(401).json({ message: err.errors[0].message })
    }
  }
}

export default new AuthenticationController()
