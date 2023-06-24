const { mapDBToModelAlbum } = require('../../utils/index')
const ClientError = require('../../exceptions/ClientError')
class AlbumHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  async postAlbumHandler (request, h) {
    const albumValidated = this._validator.validateAlbumPayload(request.payload)

    const albumId = await this._service.addAlbum(albumValidated)

    const response = h.response({
      status: 'success',
      data: {
        albumId
      }
    })

    response.code(201)
    console.log(albumId)
    return response
  }

  async getAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params
      const album = await this._service.getAlbumById(id)

      const resultMappingAlbum = mapDBToModelAlbum(album.id, album)

      const response = h.response({
        status: 'success',
        data: {
          album: resultMappingAlbum
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
        response.code(404)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async editAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params
      const albumValidated = this._validator.validateAlbumPayload(request.payload)

      await this._service.editAlbumById(id, albumValidated)

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbaharui'
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
        status: 'fail',
        message: 'Maaf, terjadi kesalahan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async deleteAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params
      await this._service.deleteAlbumById(id)
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: 'Catatan gagal dihapus. Id tidak ditemukan'
        })
        response.code(404)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = AlbumHandler
