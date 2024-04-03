import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import Client from '../models/clients.js'
import { saleValidator } from '../validators/sale.js'
import Sale from '../models/sale.js'
import HttpStatus from '../helpers/http_status_enum.js'

export default class SalesController {
  async store({ request, response, params }: HttpContext) {
    const product = await Product.findOrFail(params.productId)
    const client = await Client.findOrFail(params.clientId)

    const { quantity } = await request.validateUsing(saleValidator)

    const newSale = new Sale()
    newSale
      .fill({
        quantity,
        clientId: client.id,
        productId: product.id,
        unit_price: product.price,
        total_price: product.price * quantity,
      })
      .save()

    return response.status(HttpStatus.Created).send({ data: newSale })
  }
}
