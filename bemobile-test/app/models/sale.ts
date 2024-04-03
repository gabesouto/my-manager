import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './clients.js'
import Product from './product.js'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare client_id: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare product_id: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare unit_price: number

  @column()
  declare total_price: number

  @column()
  declare quantity: number

  @column.date({ autoCreate: true })
  declare createdAt: DateTime
}
