import vine from '@vinejs/vine'

export const saleValidator = vine.compile(
  vine.object({
    quantity: vine.number().min(1),
  })
)
