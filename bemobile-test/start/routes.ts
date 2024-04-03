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

router.post('/clients', [ClientsController, 'store']).use(middleware.auth({ guards: ['jwt'] }))
router.get('/clients', [ClientsController, 'index']).use(middleware.auth({ guards: ['jwt'] }))
router.get('/clients/:id', [ClientsController, 'show']).use(middleware.auth({ guards: ['jwt'] }))
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

router.post('/products', [ProductsController, 'store']).use(middleware.auth({ guards: ['jwt'] }))
router.get('/products', [ProductsController, 'index']).use(middleware.auth({ guards: ['jwt'] }))

router
  .delete('/products/:id', [ProductsController, 'delete'])
  .use(middleware.auth({ guards: ['jwt'] }))

router
  .put('/products/:id', [ProductsController, 'update'])
  .use(middleware.auth({ guards: ['jwt'] }))

router.get('/products/:id', [ProductsController, 'show']).use(middleware.auth({ guards: ['jwt'] }))

router
  .post('/sales/:clientId/:productId', [SalesController, 'store'])
  .use(middleware.auth({ guards: ['jwt'] }))
