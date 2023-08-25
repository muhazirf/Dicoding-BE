const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../../exceptions/InvariantError')
const NotFoundError = require('../../../exceptions/NotFoundError')
const { mapDBToModelAlbum, mapDBToModelAlbumLike } = require('../../../utils')
const CacheService = require('../../cache/CacheService')

class AlbumService {
  constructor (CachceService) {
    this._pool = new Pool()
    this._cacheService = CacheService
  }

  async getAlbumLikes (userId) {
    try {
      const result = await this._cacheService.get(`albums:${userId}`)
      return JSON.parse(result)
    } catch (error) {
      const query = {
        text: `SELECT album.id, album.name, album.year, album.performer
        FROM album
        LEFT JOIN user_album_likes ON user_album_likes.album_id = album.id
        WHERE user_album_likes.user_id = $1`,
        values: [userId]
      }

      const result = await this._pool.query(query)
      const mappedResult = mapDBToModelAlbumLike(result.rows[0].count)
      await this._cacheService.set(`albums:${userId}`, JSON.stringify(mappedResult))
      return { result: mappedResult }
    }
  }

  async likesAlbum (userId, albumId) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, albumId, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan like album')
    }

    await this._cacheService.delete(`albums:${userId}`)
  }

  async unlikesAlbum (userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus like album')
    }

    await this._cacheService.delete(`albums:${userId}`)
  }

  async verifyLikeAlbum (userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Album sudah dilike')
    }
  }

  async addAlbum ({ name, year }) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const query = {
      text: 'INSERT INTO album VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, name, year, null, createdAt, updatedAt]
    }
    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Data album gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async addCoverAlbum (id, coverUrl) {
    const updatedAt = new Date().toISOString()

    const query = {
      text: 'UPDATE albums SET cover = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [coverUrl, updatedAt, id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui cover album, Id tidak ditemukan')
    }
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
