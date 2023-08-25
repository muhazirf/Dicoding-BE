const ClientError = require('../../exceptions/ClientError')
class AlbumHandler {
  constructor (albumService, StorageService, validator) {
    this._albumService = albumService
    this._storageService = StorageService
    this._validator = validator
  }

  async postAlbumHandler (request, h) {
    const albumValidated = this._validator.validateAlbumPayload(request.payload)

    const albumId = await this._albumService.addAlbum(albumValidated)

    const response = h.response({
      status: 'success',
      data: {
        albumId
      }
    })

    response.code(201)
    return response
  }

  async getAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params
      const album = await this._albumService.getAlbumById(id)

      const response = h.response({
        status: 'success',
        data: {
          album
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

      await this._albumService.editAlbumById(id, albumValidated)

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
      await this._albumService.deleteAlbumById(id)
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

  async postAlbumCoverHandler (request, h) {
    const { cover } = request.payload
    const { id } = request.params

    await this._validator.validateAlbumCoverPayload(cover.hapi.headers)

    const coverUrl = await this._storageService.writeFile(cover, cover.hapi)

    await this._albumService.addCoverAlbum(id, coverUrl)

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah'
    })
    response.code(201)
    return response
  }

  async postAlbumLikeHandler (request, h) {
    const { id: credentialId } = request.auth.credentials
    const { id } = request.params

    await this._albumService.getAlbumById(id)

    await this._albumService.verifyExistUser(id, credentialId)

    await this._albumService.addAlbumLike(id, credentialId)

    const response = h.response({
      status: 'success',
      message: 'berhasil menyukai album'
    })
    response.code(201)
    return response
  }

  async deleteAlbumLikeHandler (request, h) {
    const { id: credentialId } = request.auth.credentials
    const { id } = request.params

    await this._albumService.deleteAlbumLike(id, credentialId)

    const response = h.response({
      status: 'success',
      message: 'berhasil menyukai album'
    })
    response.code(200)
    return response
  }

  async getAlbumLikeHandler (request, h) {
    const { id } = request.params

    const result = await this._albumService.getAlbumLike(id)

    if (result.isCache === true) {
      const response = h.response({
        status: 'success',
        data: result.result
      })
      response.header('X-Data-Source', 'cache')
      return response
    }

    const response = h.response({
      status: 'success',
      data: result.result
    })
    return response
  }
}

module.exports = AlbumHandler
