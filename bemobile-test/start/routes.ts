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
const AddressesController = () => import('../app/controllers/addresses_controller.js')
const UsersController = () => import('../app/controllers/users_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')

router.get('/', async () => {
  const users = User.all()
  return {
    users,
  }
})

router.post('clients', [ClientsController, 'store'])

router.post('addresses', [AddressesController, 'store'])

router.post('login', [UsersController, 'login'])
router.post('signup', [UsersController, 'signup'])
