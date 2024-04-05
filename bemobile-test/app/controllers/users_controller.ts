import type { HttpContext } from '@adonisjs/core/http'
import { userValidator } from '../validators/user.js'
import User from '../models/user.js'

export default class UsersController {
  async index({}: HttpContext) {}

  async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(userValidator)
      const user = await User.verifyCredentials(email, password)
      const res = await auth.use('jwt').generate(user)

      return response.ok({ data: res })
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }

  async signup({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(userValidator)
      const user = new User()
      const res = await user.fill({ email, password }).save()

      return response.created({ data: res })
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
