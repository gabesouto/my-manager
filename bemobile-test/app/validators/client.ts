import vine from '@vinejs/vine'

export const clientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(256),
    cpf: vine.string().trim().fixedLength(11),
  })
)

export const searchParamsValidator = vine.compile(
  vine.object({
    month: vine.number().min(1),
    year: vine.number().min(2019),
  })
)
