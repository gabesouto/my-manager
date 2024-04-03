import vine from '@vinejs/vine'

export const productValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(256),
    description: vine.string().trim().minLength(10).maxLength(256),
    price: vine.number().decimal(2).min(1.0),
    brand: vine.string().trim().minLength(3).maxLength(256),
  })
)
