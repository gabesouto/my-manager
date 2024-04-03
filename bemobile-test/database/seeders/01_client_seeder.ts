import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/clients.js'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        name: 'John Doe',
        cpf: '12345678901',
      },
      {
        name: 'Jane Smith',
        cpf: '98765432109',
      },
      // Add more clients as needed
    ])
  }
}
