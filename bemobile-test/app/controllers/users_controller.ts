import type { HttpContext } from '@adonisjs/core/http'
import { userValidator } from '../validators/user.js'
import User from '../models/user.js'

export default class UsersController {
  async index({}: HttpContext) {}

  async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(userValidator)
    const user = await User.verifyCredentials(email, password)

    return await auth.use('jwt').generate(user)
  }

  async signup({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(userValidator)
    const user = new User()
    await user.fill({ email, password }).save()

    return {
      user,
    }
  }
}
