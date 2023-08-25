const Joi = require('joi')

const SongPayloadSchema = Joi.object({
  title: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(2021).required(),
  performer: Joi.string().max(50).required(),
  genre: Joi.string().max(50).required(),
  duration: Joi.number().integer(),
  albumId: Joi.string()
})

module.exports = { SongPayloadSchema }
