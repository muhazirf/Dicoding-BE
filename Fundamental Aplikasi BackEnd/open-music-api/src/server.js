require('dotenv').config()
const Hapi = require('@hapi/hapi')

const song = require('./api/song')
const SongService = require('./services/postgres/SongService')
const {SongValidator} = require('./validator/song')

const album = require('./api/album')
const AlbumService = require('./services/postgres/AlbumService')
const {AlbumValidator} = require('./validator/album')

const ClientError = require('./exceptions/ClientError')