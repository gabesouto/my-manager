/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SalesController = () => import('../app/controllers/sales_controller.js')
const ProductsController = () => import('../app/controllers/products_controller.js')
const UsersController = () => import('../app/controllers/users_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')

router.post('/login', [UsersController, 'login'])
router.post('/signup', [UsersController, 'signup'])

router
  .group(() => {
    router.post('/', [ClientsController, 'store'])

    router.get('/', [ClientsController, 'index'])

    router.get('/:id', [ClientsController, 'show'])

    router.put('/:id', [ClientsController, 'update'])

    router.delete('/:id', [ClientsController, 'delete'])

    router.post('/:id/addresses', [ClientsController, 'storeAddress'])

    router.post('/:id/phones', [ClientsController, 'storePhoneNumber'])
  })
  .prefix('clients')
  .use(middleware.auth({ guards: ['jwt'] }))

router
  .group(() => {
    router.post('/', [ProductsController, 'store'])

    router.get('/', [ProductsController, 'index'])

    router.delete('/:id', [ProductsController, 'delete'])

    router.put('/:id', [ProductsController, 'update'])

    router.get('/:id', [ProductsController, 'show'])
  })
  .prefix('/products')
  .use(middleware.auth({ guards: ['jwt'] }))

router
  .post('/sales/:clientId/:productId', [SalesController, 'store'])
  .use(middleware.auth({ guards: ['jwt'] }))
