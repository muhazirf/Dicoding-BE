const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../../exceptions/InvariantError')
const NotFoundError = require('../../../exceptions/NotFoundError')
const { mapDBToModelAlbum } = require('../../../utils')

class AlbumService {
  constructor () {
    this._pool = new Pool()
  }

  async addAlbum ({ name, year }) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO album VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Data album gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getAlbum () {
    const result = await this._pool.query('SELECT * FROM album')

    if (!result.rows.length) {
      throw new NotFoundError('Data album tidak ditemukan')
    }

    return result.rows.map(mapDBToModelAlbum)
  }

  async getAlbumById (id) {
    const queryAlbum = {
      text: 'SELECT * FROM album WHERE id = $1',
      values: [id]
    }

    const resultAlbum = await this._pool.query(queryAlbum)

    if (!resultAlbum.rows.length) {
      throw new NotFoundError('Data album tidak ditemukan')
    }

    const album = resultAlbum.rows.map(mapDBToModelAlbum)[0]

    const querySongs = {
      text: 'SELECT * FROM song WHERE album_id = $1',
      values: [album.id]
    }
    const resultSongs = await this._pool.query(querySongs)
    console.log(querySongs)
    if (!resultSongs.rows.length) {
      album.songs = []
      return album
    }

    album.songs = resultSongs.rows.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
      genre: song.genre
    }))

    return album
  }

  async editAlbumById (id, { name, year }) {
    const updatedAt = new Date().toISOString()

    const query = {
      text: 'UPDATE album SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui data album, Id tidak ditemukan')
    }
    return result.rows[0].id
  }

  async deleteAlbumById (id) {
    const query = {
      text: 'DELETE FROM album WHERE id = $1 RETURNING id',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus data album, Id tidak ditemukan')
    }
    return result.rows[0].id
  }
}

module.exports = AlbumService
