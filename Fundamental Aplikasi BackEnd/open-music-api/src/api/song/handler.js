const ClientError = require('../../exceptions/ClientError')

class SongHandler {
  constructor (service) {
    this._service = service
  }

  postSongHandler (request, h) {
    try {
      const songId = this._service.addSong(request.payload)

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

  getSongsHandler () {
    const songs = this._service.getSongs()

    return {
      status: 'suucces',
      data: {
        songs
      }
    }
  }

  getSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      const song = this._service.getSongsById(id)
      return {
        status: 'success',
        data: {
          song
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(404)
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

  putSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      const { title, year, performer, genre, duration } = request.payload

      this._service.editSongById(id, { title, year, performer, genre, duration })
      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(404)
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

  deleteSongByIdHandler (request, h) {
    try {
      const { id } = request.params
      this._service.deleteSongById(id)
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(404)
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
