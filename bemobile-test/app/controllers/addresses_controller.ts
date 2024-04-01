import type { HttpContext } from '@adonisjs/core/http'
import Address from '../models/addresses.js'
import { addressValidator } from '../validators/address.js'

export default class AddressesController {
  async index({}: HttpContext) {}
  async store({ request }: HttpContext) {
    const validatedRequest = await request.validateUsing(addressValidator)
    const payload = {
      street: validatedRequest.street,
      state: validatedRequest.state,
      city: validatedRequest.city,
      zip_code: validatedRequest.zipCode,
    }
    return Address.create(payload)
  }
}
