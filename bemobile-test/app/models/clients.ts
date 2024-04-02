import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Address from './addresses.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Phone from './phone.js'

export default class Client extends BaseModel {
  @hasMany(() => Address)
  declare address: HasMany<typeof Address>

  @hasMany(() => Phone)
  declare phone: HasMany<typeof Phone>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string
}
