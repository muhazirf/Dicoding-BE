const { AlbumPayloadSchema, AlbumCoverPayloadSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

class AlbumValidator {
  validateAlbumPayload = (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
    return validationResult.value
  }

  validateAlbumCoverPayload = (payload) => {
    const validationResult = AlbumCoverPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }

    return validationResult.value
  }
}

module.exports = { AlbumValidator }
