const { Pool } = require('pg')
const { nanoid } = require('nanodi')
const InvariantError = require('../../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const { mapDBToModelSong } = require('../../../utils')

class SongService {
  constructor () {
    this._pool = new Pool()
  }

  async addSong ({ title, year, performer, genre, duration, albumId }) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSER INTO song VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId, createdAt, updatedAt]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('data song gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getSong() {
    const result = await this._pool.query('SELECT * FROM song')
    return result.rows.map(mapDBToModelSong)
  }

  async getSongById (id) {
    const query ={
      text: 'SELECT id, title, performer FROM song WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('data song tidak ditemukan')
    }
    return result.rows.map(mapDBToModelSong)[0]
  }

  async editSongById (id,{title, name, year, performer,genre, duration, albumId}) {
  const query
}
