import { Request, Response, NextFunction } from 'express'
import { IController } from './controller.inteface'
import Assinatura from '../model/assinatura.model'
import moment from 'moment-timezone'
import EmailEnviar from '../model/emailEnviar.model'
import Usuario from '../model/usuario.model'
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
      const { cpf, nome, dataNasc, email, ddd, telefone, cpfResp, nomeResp, dataNascResp, emailResp, dddResp, telefoneResp, fkEvento, ip } = req.body
      const localTime = moment.tz(new Date(), 'America/Recife').format()
      const dataNascLocal = moment.tz(dataNasc, 'America/Recife').format('YYYY-MM-DD HH:mm:ss')
      const dataNascLocalResp = dataNascResp ? moment.tz(dataNascResp, 'America/Recife').format('YYYY-MM-DD HH:mm:ss') : null

      console.log(req.body)

      await Assinatura.create({
        id: uuidv4(),
        cpf,
        nome,
        dataNasc: dataNascLocal,
        email,
        ddd,
        telefone,
        cpfResp,
        nomeResp,
        dataNascResp: dataNascLocalResp,
        emailResp,
        dddResp,
        telefoneResp,
        fkEvento,
        ip,
        createdAt: localTime,
        updatedAt: localTime
      })

      await EmailEnviar.create({
        id: uuidv4(),
        de: 'semresposta@pe.senac.br',
        para: email,
        cc: emailResp,
        titulo: 'Confirmação da assinatura',
        conteudo: `${nome}, o termo de uso de imagem SENAC-PE foi assinado com sucesso.`,
        enviado: false,
        dataHoraEnvio: null
      })

      // Responda com sucesso
      res.status(200).json({ message: 'Assinatura realizada com sucesso!' })
    } catch (error: any) {
      console.error('Erro ao assinar:', error)

      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ message: 'O usuario já assinou o termo.' })
      } else {
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

  async confirmarAcesso (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.body

      console.log('gggg')
      const usuario = await Usuario.findOne({ where: { id } })


      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' })
      }

      // Após a validação do outro setor, atualize o campo acesso
      await usuario.update({ acesso: true }) // Assumindo que 'true' é a validação

      return res.status(200).json({ message: 'Usuário validado pela GTI.' })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'Erro ao validar usuário.' })
    }
  }


  async delete (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async search (req: Request, res: Response, next: NextFunction): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

export default new AssinaturaController()
