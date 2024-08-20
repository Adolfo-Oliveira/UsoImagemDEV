import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Assinatura from '../model/assinatura.model'
import moment from 'moment-timezone'
const { v4: uuidv4 } = require('uuid')

class AssinaturaController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await Assinatura.findAll({
        order: [['nome', 'asc']]
      })
      res.status(200).json({ data: Assinatura })
    } catch (error) {
      res.status(401).json({ message: 'assinatura não encontrada' })
    }
  }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { cpf, nome, dataNasc, email, fkEvento, ip } = req.body
      const localTime = moment.tz(new Date(), 'America/Sao_Paulo').format()

      console.log(req.body)

      await Assinatura.create({
        id: uuidv4(),
        cpf,
        nome,
        dataNasc,
        email,
        fkEvento,
        ip,
        createdAt: localTime,
        updatedAt: localTime
      })

      res.status(200).json({ message: 'Assinatura realizada com sucesso' })
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
      // console.log("qqqqq" + id);

      const registro = await Assinatura.findAll({
        where: {
          fkEvento: id
        }
        // include: [Perfil],

      })
      // console.log( registro );

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
