import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/clients.js'
import { clientValidator } from '../validators/client.js'

export default class ClientsController {
  async index({}: HttpContext) {}

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    return Client.create(payload)
  }
}
