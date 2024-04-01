import vine from '@vinejs/vine'

export const clientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(256),
    cpf: vine.string().trim().maxLength(256),
  })
)
