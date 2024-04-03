import { HttpContext } from '@adonisjs/core/http'
import Client from '../models/clients.js'
import { clientValidator } from '../validators/client.js'
import HttpStatus from '../helpers/http_status_enum.js'
import { addressValidator } from '../validators/address.js'
import Address from '../models/addresses.js'
import { phoneValidator } from '../validators/phone.js'
import Phone from '../models/phone.js'
import Product from '../models/product.js'
import { log } from 'node:console'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.all()
    const clientsSorted = clients.sort((a, b) => a.id - b.id)

    return response.status(HttpStatus.OK).send({ data: clientsSorted })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    return response.status(HttpStatus.Created).send({ data: await Client.create(payload) })
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    const client = await Client.findOrFail(params.id)
    const updatedClient = await client.merge({ name: payload.name, cpf: payload.cpf }).save()

    return response.status(HttpStatus.OK).send({ data: updatedClient })
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

    return response.status(HttpStatus.Created).send({ data: newAddress })
  }

  async storePhoneNumber({ request, response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const validatedRequest = await request.validateUsing(phoneValidator)
    const payload = {
      client_id: client.id,
      number: validatedRequest.number,
    }

    const newPhoneNumber = await Phone.create(payload)

    return response.status(HttpStatus.Created).send({ data: newPhoneNumber })
  }

  async delete({ response, params }: HttpContext) {
    const user = await Client.findOrFail(params.id)
    await user.delete()

    return response.status(HttpStatus.OK).send({ message: 'client has been succesfully deleted' })
  }

  async show({ response, params, request }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const { month, year } = request.qs()

    if (month && year) {
      const clientSales = await client
        .related('sale')
        .query()
        .whereRaw(`MONTH(created_at) = ? AND YEAR(created_at) = ?`, [month, year])
        .orderBy('created_at', 'desc')

      if (clientSales.length === 0)
        return response.status(HttpStatus.NotFound).send({ message: 'sale not found' })

      const res = {
        client,
        sales: clientSales,
      }

      return response.status(HttpStatus.OK).send(res)
    }

    const clientSales = await client.related('sale').query().orderBy('created_at', 'desc')

    const res = {
      client,
      sales: clientSales,
    }

    return response.status(HttpStatus.OK).send(res)
  }

  async showByDate({ response, params, request }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const { month, year } = request.qs()

    const clientSales = await client
      .related('sale')
      .query()
      .whereRaw(`MONTH(created_at) = ? AND YEAR(created_at) = ?`, [month, year])
      .orderBy('created_at', 'desc')

    if (clientSales.length === 0)
      return response.status(HttpStatus.NotFound).send({ message: 'sale not found' })

    const res = {
      client,
      sales: clientSales,
    }

    return response.status(HttpStatus.OK).send(res)
  }
}
