import { HttpContext } from '@adonisjs/core/http'
import Client from '../models/clients.js'
import { clientValidator } from '../validators/client.js'

import { addressValidator } from '../validators/address.js'
import Address from '../models/addresses.js'
import { phoneValidator } from '../validators/phone.js'
import Phone from '../models/phone.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.all()
    const res = clients.sort((a, b) => a.id - b.id)

    return response.ok({ data: res })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    return response.created({ data: await Client.create(payload) })
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    const client = await Client.findOrFail(params.id)
    const res = await client.merge({ name: payload.name, cpf: payload.cpf }).save()

    return response.ok({ data: res })
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
    const res = await Address.create(payload)

    return response.created({ data: res })
  }

  async storePhoneNumber({ request, response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const validatedRequest = await request.validateUsing(phoneValidator)
    const payload = {
      client_id: client.id,
      number: validatedRequest.number,
    }

    const res = await Phone.create(payload)

    return response.created({ data: res })
  }

  async delete({ response, params }: HttpContext) {
    const user = await Client.findOrFail(params.id)
    await user.delete()

    return response.ok({ message: 'client has been succesfully deleted' })
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

      if (clientSales.length === 0) return response.notFound({ message: 'sale not found' })

      const res = {
        client: { client, sales: clientSales },
      }

      return response.ok({ data: res })
    }

    const clientSales = await client.related('sale').query().orderBy('created_at', 'desc')

    const clientAddresses = await client.related('address').query()

    const clientPhoneNumbers = await client.related('phone').query()

    if (clientSales.length === 0) return response.ok({ data: client })

    const res = {
      data: { client, sales: clientSales, adresses: clientAddresses, numbers: clientPhoneNumbers },
    }

    return response.ok(res)
  }
}
