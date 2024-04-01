import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Address from './addresses.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
  @hasOne(() => Address)
  declare profile: HasOne<typeof Address>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string
}
