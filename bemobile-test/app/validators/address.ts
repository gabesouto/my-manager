import vine from '@vinejs/vine'

export const addressValidator = vine.compile(
  vine.object({
    street: vine.string().trim().maxLength(256),
    zipCode: vine.string().trim().maxLength(256),
    city: vine.string().trim().maxLength(256),
    state: vine.string().trim().maxLength(256),
  })
)
