import express, { json } from 'express';
import cors from 'cors';

class Server {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.middleware();
    this.routers(); // Deve ser criado
  }

  private middleware() {
    this.application.use(json()); // Realiza a conversão dos dados para o formato json
    this.application.use(cors()); // Permite a comunicação entre domínios distintos
  }

  private routers() {
    this.application.get('/', (req, res) => res.send('Teste'));
  }
}

export default new Server().application;
