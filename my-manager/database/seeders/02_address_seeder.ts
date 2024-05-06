import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '../../app/models/addresses.js'
export default class AddressSeeder extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        clientId: 1,
        city: 'New York',
        zipCode: '10001',
        state: 'NY',
        street: '123 Main St',
      },
      {
        clientId: 2,
        city: 'Los Angeles',
        zipCode: '90001',
        state: 'CA',
        street: '456 Elm St',
      },
    ])
  }
}
