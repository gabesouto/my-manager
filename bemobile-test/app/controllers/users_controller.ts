import type { HttpContext } from '@adonisjs/core/http'
import { userValidator } from '../validators/user.js'
import User from '../models/user.js'
import HttpStatus from '../helpers/http_status_enum.js'

export default class UsersController {
  async index({}: HttpContext) {}

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(userValidator)
    const user = await User.verifyCredentials(email, password)
    const res = await auth.use('jwt').generate(user)
    response.status(HttpStatus.OK).send(res)
  }

  async signup({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(userValidator)
    const user = new User()
    const res = await user.fill({ email, password }).save()
    response.status(HttpStatus.Created).send(res)
  }
}
