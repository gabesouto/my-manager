import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()

      table.string('name').notNullable()
      table.string('description').notNullable()
      table.decimal('price').notNullable()
      table.string('brand').notNullable()
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
