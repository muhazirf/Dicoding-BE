require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

// Albums
const albums = require('./api/album')
const AlbumService = require('./services/postgres/album/AlbumService')
const { AlbumValidator } = require('./validator/album')

// Songs
const songs = require('./api/song')
const SongService = require('./services/postgres/song/SongService')
const { SongValidator } = require('./validator/song')

// Users
const users = require('./api/user')
const UserService = require('./services/postgres/user/UserService')
const { UserValidator } = require('./validator/user')

// Playlists
const playlists = require('./api/playlist')
const PlaylistService = require('./services/postgres/playlist/PlaylistService')
const { PlaylistValidator } = require('./validator/playlist')

// Authentications
const authentications = require('./api/auth')
const AuthenticationService = require('./services/postgres/auth/AuthService')
const TokenManager = require('./token/TokenManager')
const { AuthenticationValidator } = require('./validator/authentication')

// Activities
const ActivityService = require('./services/postgres/activities/ActivityService')

// Collaborations
const collaborations = require('./api/collaboration')
const CollaborationService = require('./services/postgres/collaboration/CollaborationService')
const { CollaborationValidator } = require('./validator/collaboration')

// Exceptions
const ClientError = require('./exceptions/ClientError')

const init = async () => {
  const albumService = new AlbumService()
  const albumValidator = new AlbumValidator()
  const songService = new SongService()
  const songValidator = new SongValidator()
  const userService = new UserService()
  const userValidator = new UserValidator()
  const activityService = new ActivityService()
  const playlistValidator = new PlaylistValidator()
  const collaborationService = new CollaborationService(userService)
  const collaborationValidator = new CollaborationValidator()
  const playlistService = new PlaylistService(songService, activityService, collaborationService)
  const authenticationValidator = new AuthenticationValidator()
  const authenticationService = new AuthenticationService()

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
      plugin: Jwt
    }
  ])

  server.auth.strategy('open_music_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      Credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: albumValidator
      }
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: songValidator
      }
    },
    {
      plugin: playlists,
      options: {
        service: playlistService,
        validator: playlistValidator
      }
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: userValidator
      }
    },
    {
      plugin: authentications,
      options: {
        authenticationService,
        userService,
        tokenManager: TokenManager,
        validator: authenticationValidator
      }
    },
    {
      plugin: collaborations,
      options: {
        collaborationService,
        playlistService,
        validator: collaborationValidator
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
        return h.continue
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      newResponse.code(500)
      console.error(response)
      return newResponse
    }

    return h.continue
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
