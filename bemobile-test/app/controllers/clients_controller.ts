import { HttpContext } from '@adonisjs/core/http'
import Client from '../models/clients.js'
import { clientValidator } from '../validators/client.js'
import HttpStatus from '../helpers/http_status_enum.js'
import { addressValidator } from '../validators/address.js'
import Address from '../models/addresses.js'
import { phoneValidator } from '../validators/phone.js'
import Phone from '../models/phone.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.all()
    const clientsSorted = clients.sort((a, b) => a.id - b.id)

    response.status(HttpStatus.OK).send({ data: clientsSorted })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    response.status(HttpStatus.Created).send({ data: await Client.create(payload) })
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    const client = await Client.findOrFail(params.id)
    const updatedClient = await client.merge({ name: payload.name, cpf: payload.cpf }).save()

    response.status(HttpStatus.OK).send({ data: updatedClient })
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

    response.status(HttpStatus.Created).send({ data: newAddress })
  }

  async storePhoneNumber({ request, response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const validatedRequest = await request.validateUsing(phoneValidator)
    const payload = {
      client_id: client.id,
      number: validatedRequest.number,
    }

    const newPhoneNumber = await Phone.create(payload)

    response.status(HttpStatus.Created).send({ data: newPhoneNumber })
  }

  async delete({ response, params }: HttpContext) {
    const user = await Client.findOrFail(params.id)
    await user.delete()

    response.status(HttpStatus.OK).send({ message: 'client has been succesfully deleted' })
  }
}
