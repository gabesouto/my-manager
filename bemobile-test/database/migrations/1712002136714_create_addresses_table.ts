import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.string('city').notNullable()
      table.string('zip_code').notNullable()
      table.string('state').notNullable()
      table.string('street').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
