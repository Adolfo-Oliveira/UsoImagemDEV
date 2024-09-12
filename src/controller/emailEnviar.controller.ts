import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import EmailEnviar from '../model/emailEnviar.model'
import { v4 as uuidv4 } from 'uuid'

class EmailEnviarController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { de, para, cc, titulo, conteudo, enviado, dataHoraEnvio } = req.body
      const newEmail = await EmailEnviar.create({
        id: uuidv4(), // Gerando um UUID
        de,
        para,
        cc,
        titulo,
        conteudo,
        enviado,
        dataHoraEnvio
      })

      return res.status(201).json(newEmail)
    } catch (error) {
      next(error)
    }
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
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

export default new EmailEnviarController()
