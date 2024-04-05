import type { HttpContext } from '@adonisjs/core/http'

import Product from '../models/product.js'
import { productValidator } from '../validators/product.js'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query()
      .where('is_deleted', false)
      .select('id', 'name', 'description', 'price', 'brand')
    const res = products.sort((a, b) => a.name.localeCompare(b.name))

    return response.ok({ data: res })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(productValidator)
    return response.created({ data: await Product.create(payload) })
  }

  async delete({ response, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.merge({ isDeleted: true }).save()

    return response.ok({ message: 'product has been succesfully deleted' })
  }

  async update({ request, response, params }: HttpContext) {
    const { name, brand, price, description } = await request.validateUsing(productValidator)
    const product = await Product.findOrFail(params.id)
    await product.merge({ name, brand, price, description }).save()

    const productSelectedRows = await Product.query()
      .where('id', params.id)
      .select('id', 'name', 'description', 'price', 'brand', 'created_at', 'updated_at')

    return response.ok({ data: productSelectedRows })
  }

  async show({ response, params }: HttpContext) {
    const product = await Product.query()
      .where('id', params.id)
      .where('isDeleted', false)
      .preload('sale')
      .select('id', 'name', 'description', 'price', 'brand', 'created_at', 'updated_at')
      .firstOrFail()

    const res = {
      product: product.serialize(),
      sales: product.sale,
    }

    return response.ok({ data: res })
  }
}
