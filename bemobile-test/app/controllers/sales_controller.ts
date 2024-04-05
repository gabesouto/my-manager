import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import Client from '../models/clients.js'
import { saleValidator } from '../validators/sale.js'
import Sale from '../models/sale.js'

export default class SalesController {
  async store({ request, response, params }: HttpContext) {
    const product = await Product.findOrFail(params.productId)
    const client = await Client.findOrFail(params.clientId)

    const { quantity } = await request.validateUsing(saleValidator)

    const totalPrice = Number((product.price * quantity).toFixed(2))

    const res = new Sale()
    res
      .fill({
        quantity,
        clientId: client.id,
        productId: product.id,
        unitPrice: product.price,
        totalPrice,
      })
      .save()

    return response.created({ data: res })
  }
}
