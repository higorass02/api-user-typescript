import {Router} from 'express'
import UserController from './controllers/UserController'
import User from './schemas/User'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.post('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

export default routes
