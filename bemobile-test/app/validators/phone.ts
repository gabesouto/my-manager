import vine from '@vinejs/vine'

export const phoneValidator = vine.compile(
  vine.object({
    number: vine.string().trim().minLength(6).maxLength(256),
  })
)
