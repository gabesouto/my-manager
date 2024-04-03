import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Laptop',
        description: 'Powerful laptop for productivity',
        price: 999.99,
        brand: 'Brand A',
        isDeleted: false,
      },
      {
        name: 'Smartphone',
        description: 'High-end smartphone with advanced features',
        price: 699.99,
        brand: 'Brand B',
        isDeleted: false,
      },
    ])
  }
}
