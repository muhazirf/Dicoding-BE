const ClientError = require('../../exceptions/ClientError')

class SongHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  async postSongHandler (request, h) {
    try {
      const songValidated = this._validator.validateSongPayload(request.payload)
      const songId = await this._service.addSong(songValidated)
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      const response = h.resonse({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async getSongsHandler (request, h) {
    const { title, performer } = request.query
    const songs = await this._service.getSongs({ title, performer })

    const response = h.response({
      status: 'success',
      data: {
        songs
      }
    })
    return response
  }

  async getSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      const song = await this._service.getSongById(id)
      const response = h.response({
        status: 'success',
        data: {
          song
        }
      })
      response.code(200)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async editSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      const songValidated = this._validator.validateSongPayload(request.payload)

      await this._service.editSongById(id, songValidated)
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil diperbarui'
      })
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async deleteSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      await this._service.deleteSongById(id)
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus'
      })
      response.code(200)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = SongHandler
