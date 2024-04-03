import type { HttpContext } from '@adonisjs/core/http'
import HttpStatus from '../helpers/http_status_enum.js'
import Product from '../models/product.js'
import { productValidator } from '../validators/product.js'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query()
      .where('is_deleted', false)
      .select('id', 'name', 'description', 'price', 'brand')
    const productsSorted = products.sort((a, b) => a.name.localeCompare(b.name))

    return response.status(HttpStatus.OK).send({ data: productsSorted })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(productValidator)
    return response.status(HttpStatus.Created).send({ data: await Product.create(payload) })
  }

  async delete({ response, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.merge({ is_deleted: true }).save()

    return response.status(HttpStatus.OK).send({ message: 'product has been succesfully deleted' })
  }

  async update({ request, response, params }: HttpContext) {
    const { name, brand, price, description } = await request.validateUsing(productValidator)
    const product = await Product.findOrFail(params.id)
    const updatedProduct = await product.merge({ name, brand, price, description }).save()

    return response.status(HttpStatus.OK).send({ data: updatedProduct })
  }

  async show({ response, params }: HttpContext) {
    const product = await Product.query()
      .where('is_deleted', false)
      .where('id', params.id)
      .select('id', 'name', 'description', 'price', 'brand')

    return response.status(HttpStatus.OK).send({ data: product })
  }
}
