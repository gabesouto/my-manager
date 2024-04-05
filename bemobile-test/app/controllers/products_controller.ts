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
    const res = await product.merge({ name, brand, price, description }).save()

    return response.ok({ data: res })
  }

  async show({ response, params }: HttpContext) {
    const res = await Product.query()
      .where('is_deleted', false)
      .where('id', params.id)
      .select('id', 'name', 'description', 'price', 'brand')

    return response.ok({ data: res })
  }
}
