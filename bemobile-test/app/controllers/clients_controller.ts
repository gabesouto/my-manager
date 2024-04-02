import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/clients.js'
import { clientValidator } from '../validators/client.js'
import HttpStatus from '../helpers/http_status_enum.js'
import { addressValidator } from '../validators/address.js'
import Address from '../models/addresses.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    response.status(HttpStatus.OK).send(await Client.all())
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    response.status(HttpStatus.Created).send(await Client.create(payload))
  }

  async storeAddress({ request, response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const validatedRequest = await request.validateUsing(addressValidator)

    const payload = {
      client_id: client.id,
      street: validatedRequest.street,
      state: validatedRequest.state,
      city: validatedRequest.city,
      zip_code: validatedRequest.zipCode,
    }
    const newAddress = await Address.create(payload)

    response.status(HttpStatus.Created).send(newAddress)
  }
}
