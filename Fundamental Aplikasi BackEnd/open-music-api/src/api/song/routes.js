const routes = () => [
  {
    method: 'post',
    path: '/song',
    handler: handler.postSongHandler
  },
  {
    method: 'get',
    path: '/song',
    hendler: handler.getSongHandler
  }
]
