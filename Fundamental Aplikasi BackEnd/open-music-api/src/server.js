require('dotenv').config()
const Hapi = require('@hapi/hapi')

const song = require('./api/song')
const SongService = require('./services/postgres/song/SongService')
const { SongValidator } = require('./validator/song')

const album = require('./api/album')
const AlbumService = require('./services/postgres/album/AlbumService')
const { AlbumValidator } = require('./validator/album')

const ClientError = require('./exceptions/ClientError')

const init = async () => {
  const songService = new SongService()
  const albumService = new AlbumService()

  const songValidator = new SongValidator()
  const albumValidator = new AlbumValidator()

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: album,
      options: {
        service: albumService,
        validator: albumValidator
      }
    },
    {
      plugin: song,
      options: {
        service: songService,
        validator: songValidator
      }
    }
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }

      if (!response.isServer) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })

      newResponse.code(500)
      return newResponse
    }

    return h.continue
  })
}

init()
