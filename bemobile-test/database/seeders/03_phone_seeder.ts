import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phone from '#models/phone'

export default class PhoneSeeder extends BaseSeeder {
  async run() {
    await Phone.createMany([
      {
        clientId: 1,
        number: '123-456-7890',
      },
      {
        clientId: 2,
        number: '987-654-3210',
      },
      // Add more phones as needed
    ])
  }
}
