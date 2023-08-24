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
      text: 'INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [id, playlistId, songId, userId, 'add', time, createdAt, updatedAt]
    }
    await this._pool.query(query)
  }

  async deleteActivity (playlistId, userId, songId) {
    const id = nanoid(16)
    const time = new Date()
    const createdAt = time.toISOString()
    const updatedAt = createdAt
    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [id, playlistId, songId, userId, 'delete', time, createdAt, updatedAt]
    }

    await this._pool.query(query)
  }
}

module.exports = ActivityService
