import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './clients.js'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare number: String
}
