import { Router } from 'express'

import ResizerController from './controllers/ResizerController'

const routes = Router()

/**
 * Users
 */
routes.get('/', ResizerController.index)

export default routes
