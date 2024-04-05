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
    router.post('/', [ClientsController, 'store']).use(middleware.auth({ guards: ['jwt'] }))

    router.get('/', [ClientsController, 'index']).use(middleware.auth({ guards: ['jwt'] }))

    router.get('/:id', [ClientsController, 'show']).use(middleware.auth({ guards: ['jwt'] }))

    router.put('/:id', [ClientsController, 'update']).use(middleware.auth({ guards: ['jwt'] }))

    router.delete('/:id', [ClientsController, 'delete']).use(middleware.auth({ guards: ['jwt'] }))

    router
      .post('/:id/addresses', [ClientsController, 'storeAddress'])
      .use(middleware.auth({ guards: ['jwt'] }))

    router
      .post('/:id/phones', [ClientsController, 'storePhoneNumber'])
      .use(middleware.auth({ guards: ['jwt'] }))
  })
  .prefix('clients')

router
  .group(() => {
    router.post('/', [ProductsController, 'store']).use(middleware.auth({ guards: ['jwt'] }))

    router.get('/', [ProductsController, 'index']).use(middleware.auth({ guards: ['jwt'] }))

    router.delete('/:id', [ProductsController, 'delete']).use(middleware.auth({ guards: ['jwt'] }))

    router.put('/:id', [ProductsController, 'update']).use(middleware.auth({ guards: ['jwt'] }))

    router.get('/:id', [ProductsController, 'show']).use(middleware.auth({ guards: ['jwt'] }))
  })
  .prefix('/products')

router
  .post('/sales/:clientId/:productId', [SalesController, 'store'])
  .use(middleware.auth({ guards: ['jwt'] }))
