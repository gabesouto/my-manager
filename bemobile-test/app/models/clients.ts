import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Address from './addresses.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Phone from './phone.js'
import Sale from './sale.js'
import { DateTime } from 'luxon'

export default class Client extends BaseModel {
  @hasMany(() => Address)
  declare address: HasMany<typeof Address>

  @hasMany(() => Phone)
  declare phone: HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare sale: HasMany<typeof Sale>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare updatedAt: DateTime
}
