import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(4).maxLength(256),
    password: vine.string().trim().minLength(6).maxLength(256),
  })
)
