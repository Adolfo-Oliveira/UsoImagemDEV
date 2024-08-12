import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Evento from '../model/evento.model'
// import {QRCodeCanvas} from 'qrcode.react';
const { v4: uuidv4 } = require('uuid')

class EventoController implements IController {
  async all (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const eventos = await Evento.findAll({
        order: [['titulo', 'asc']]
      })
      res.status(200).json({ data: eventos })
    } catch (error) {
      res.status(401).json({ message: 'Registro não encontrado' })
    }
  }

  // async gerarQr (req: Request, res: Response, next: NextFunction): Promise<any> {
  //   try {
  //     const { link } = req.params
  //     const retorno = <QRCodeCanvas value= ${link} />

  //     res.status(200).json({ data: retorno })
  //   } catch (error) {
  //     res.status(401).json({ message: 'Registro não encontrado' })
  //   }
  // }

  async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      // console.log('evento.controller: create')
      const { titulo, data, hora, descricao, categoria, eixo } =
        req.body

      // console.log(req.body)
      // console.log(JSON.stringify(req))
      await Evento.create({
        id: uuidv4(),
        titulo,
        data,
        hora,
        descricao,
        categoria,
        eixo,
        fkUsuario: req.usuario.id
        // fkQr
      })

      res
        .status(200)
        .json({ message: 'Evento criado com sucesso' })
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      res.status(500).json({ message: 'Erro ao criar evento' })
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

export default new EventoController()
