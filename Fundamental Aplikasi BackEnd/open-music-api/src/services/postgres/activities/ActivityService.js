const { nanoid } = require('nanoid')
const { Pool } = require('pg')

class ActivityService {
  constructor () {
    this._pool = new Pool()
  }

  async addActivity (playlistId, userId, songId) {
    const id = nanoid(16)
    const time = new Date()
    const createdAt = time.toISOString()
    const updatedAt = createdAt
    const query = {
      text: 'insert into playlist_song_activities values $1, $2, $3, $4, $5, $6, $7',
      values: [id, playlistId, songId, userId, 'add', createdAt, updatedAt]
    }

    await this._pool.query(query)
  }

  async deleteActivity (playlistId, userId, songId) {
    const id = nanoid(16)
    const time = new Date()
    const createdAt = time.toISOString()
    const updatedAt = createdAt
    const query = {
      text: 'insert into playlist song playlist_song_activities values $1, $2, $3, $4, $5, $6, $7',
      values: [id, playlistId, songId, userId, 'delete', createdAt, updatedAt]
    }

    await this._pool.query(query)
  }
}

module.exports = ActivityService
