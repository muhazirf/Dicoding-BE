const { CollaborationPayloadSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

class CollaborationValidator {
  validateCollaborationPayload (payload) {
    const validationResult = CollaborationPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }

    return validationResult.value
  }
}

module.exports = { CollaborationValidator }
