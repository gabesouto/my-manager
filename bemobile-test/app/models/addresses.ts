import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Client from './clients.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare client_id: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare city: string

  @column()
  declare zip_code: string

  @column()
  declare street: string

  @column()
  declare state: string
}
