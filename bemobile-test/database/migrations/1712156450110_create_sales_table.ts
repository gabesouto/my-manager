import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table.decimal('unit_price').notNullable()
      table.decimal('total_price').notNullable()
      table.integer('quantity').notNullable()
      table.dateTime('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
