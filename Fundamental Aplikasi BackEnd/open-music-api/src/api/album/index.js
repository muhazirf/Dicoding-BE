const AlbumHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { AlbumService, StorageService, validator }) => {
    const albumHandler = new AlbumHandler(AlbumService, StorageService, validator)
    server.route(routes(albumHandler))
  }
}
