import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('name').notNullable
      table.string('cpf').notNullable
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
