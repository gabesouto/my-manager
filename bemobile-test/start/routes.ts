/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import User from '../app/models/user.js'
import { middleware } from './kernel.js'
const UsersController = () => import('../app/controllers/users_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')

router.get('/', async () => {
  const users = User.all()
  return {
    users,
  }
})

router.post('/clients', [ClientsController, 'store']).use(middleware.auth({ guards: ['jwt'] }))
router.get('/clients', [ClientsController, 'index']).use(middleware.auth({ guards: ['jwt'] }))
router.put('/clients/:id', [ClientsController, 'update']).use(middleware.auth({ guards: ['jwt'] }))
router
  .delete('/clients/:id', [ClientsController, 'delete'])
  .use(middleware.auth({ guards: ['jwt'] }))

router
  .post('/clients/:id/addresses', [ClientsController, 'storeAddress'])
  .use(middleware.auth({ guards: ['jwt'] }))

router
  .post('/clients/:id/phones', [ClientsController, 'storePhoneNumber'])
  .use(middleware.auth({ guards: ['jwt'] }))

router.post('/login', [UsersController, 'login'])
router.post('/signup', [UsersController, 'signup'])
