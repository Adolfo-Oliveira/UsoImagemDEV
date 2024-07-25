import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Aluno from '../model/aluno.model'

class AlunoController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async find (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      console.log('aluno.controller: find')
      const { CPF } = req.params

      console.log(CPF)

      const registro = await Aluno.findOne({
        where: {
          CPF
        },
        attributes: ['CPF', 'Nome', 'DataNascimento', 'Email', 'CEP', 'DDD', 'Telefone']
      })
      return res.status(200).json({ data: registro })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.message })
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

export default new AlunoController()
