import controller from '../controller/aluno.controller'
import { Router } from 'express'

// import routerMiddleware from '../middleware/router.middleware'

class AlunoRouter {
  public router!: Router

  constructor () {
    this.router = Router()
    // this.router.use(routerMiddleware.authenticated)
    this.routers()
  }

  private routers () {
    this.router.get('/search/', controller.search)
    this.router.get('/', controller.all)
    this.router.post('/', controller.create)
    this.router.get('/:CPF', controller.find)
    this.router.post('/:id/edit', controller.update)
    this.router.post('/:id/delete', controller.delete)
  }
}

export default new AlunoRouter().router
