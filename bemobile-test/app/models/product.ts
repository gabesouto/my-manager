import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Sale from './sale.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Sale)
  declare sale: HasMany<typeof Sale>

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare brand: string

  @column()
  declare isDeleted: boolean
}
