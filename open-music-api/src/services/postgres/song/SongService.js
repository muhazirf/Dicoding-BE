const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../../exceptions/InvariantError')
const NotFoundError = require('../../../exceptions/NotFoundError')
const { mapDBToModelSong } = require('../../../utils')

class SongService {
  constructor () {
    this._pool = new Pool()
  }

  async addSong ({ title, year, performer, genre, duration = null, albumId = null }) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO song VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId, createdAt, updatedAt]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('data song gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getSongs ({ title = '', performer = '' }) {
    const query = {
      text: 'SELECT id, title, performer FROM song WHERE title ILIKE $1 and performer ILIKE $2',
      values: [`%${title}%`, `%${performer}%`]
    }
    const { rows } = await this._pool.query(query)
    return rows
  }

  async getSongById (id) {
    const query = {
      text: 'SELECT * FROM song WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('data song tidak ditemukan')
    }
    return result.rows.map(mapDBToModelSong)[0]
  }

  async editSongById (id, { title, year, performer, genre, duration, albumId }) {
    const updatedAt = new Date().toISOString()

    const query = {
      text: 'UPDATE song SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, updatedAt, id]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui data song, Id tidak ditemukan')
    }
    return result.rows[0].id
  }

  async deleteSongById (id) {
    const query = {
      text: 'DELETE FROM song WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus data song, Id tidak ditemukan')
    }

    return result.rows[0].id
  }
}

module.exports = SongService
