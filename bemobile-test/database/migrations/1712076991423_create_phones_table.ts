import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.string('number').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
