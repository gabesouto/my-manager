import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sale from '#models/sale'
import { DateTime } from 'luxon'

export default class SaleSeeder extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        clientId: 1,
        productId: 1,
        unitPrice: 999.99,
        totalPrice: 999.99,
        quantity: 1,
        createdAt: DateTime.fromISO('2021-01-17'),
      },
      {
        clientId: 1,
        productId: 2,
        unitPrice: 699.99,
        totalPrice: 1399.98,
        quantity: 2,
        createdAt: DateTime.fromISO('2023-01-15'),
      },
      // Add more sales as needed
    ])
  }
}
