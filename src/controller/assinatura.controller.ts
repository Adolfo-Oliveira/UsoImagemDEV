import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Assinatura from '../model/assinatura.model'
import moment from 'moment-timezone'
import emailUtils from '../utils/email.utils'
const { v4: uuidv4 } = require('uuid')

class AssinaturaController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const assinaturas = await Assinatura.findAll({
        order: [['nome', 'asc']]
      })
      res.status(200).json({ data: assinaturas })
    } catch (error) {
      res.status(401).json({ message: 'Assinatura não encontrada' })
    }
  }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { cpf, nome, dataNasc, email, fkEvento, ip } = req.body
      const localTime = moment.tz(new Date(), 'America/Recife').format()
      const dataNascLocal = moment.tz(dataNasc, 'America/Recife').format('YYYY-MM-DD HH:mm:ss')

      console.log(req.body)

      await Assinatura.create({
        id: uuidv4(),
        cpf,
        nome,
        dataNasc: dataNascLocal,
        email,
        fkEvento,
        ip,
        createdAt: localTime,
        updatedAt: localTime
      })

      const txEmail = `
        <b>${nome}, sua assinatura dos direitos de imagem para o SENAC foi realizada com sucesso. </b><br>
        <br/>
      `

      // Tenta enviar o email e captura erros, se houver
      try {
        await emailUtils.enviar(email, txEmail)
        res.status(200).json({ message: 'Assinatura realizada com sucesso' })
      } catch (emailError) {
        console.error('Erro ao enviar e-mail:', emailError)
        res.status(200).json({
          message: 'Assinatura realizada com sucesso, mas ocorreu um erro ao enviar o e-mail de confirmação.'
        })
      }
    } catch (error: any) {
      console.error('Erro ao assinar:', error)

      if (error.name === 'SequelizeUniqueConstraintError') {
        // Trata erros de duplicação de chave
        res.status(409).json({ message: 'O CPF já está cadastrado.' })
      } else {
        // Trata outros tipos de erros
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
        res.status(500).json({ message: `Erro ao assinar: ${errorMessage}` })
      }
    }
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params

      const registro = await Assinatura.findAll({
        where: {
          fkEvento: id
        }
      })

      res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.errors[0].message })
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new AssinaturaController()
