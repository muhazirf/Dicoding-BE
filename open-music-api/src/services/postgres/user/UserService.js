const { Pool } = require('pg')
const { nanoid } = require('nanoid')
// const bcrypt = require('bcrypt')
const bcrypt = require('bcrypt')

const InvariantError = require('../../../exceptions/InvariantError')
const NotFoundError = require('../../../exceptions/NotFoundError')
const AuthenticationError = require('../../../exceptions/AuthenticationError')

class UserService {
  constructor () {
    this._pool = new Pool()
  }

  async verifyUserCredential ({ username, password }) {
    const query = {
      text: 'select id, username, fullname, password from users where username = $1',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new AuthenticationError('Username atau Password yang anda berikan salah!')
    }

    const { id, password: hashedPassword } = result.rows[0]

    const match = await bcrypt.compare(password, hashedPassword)

    if (!match) {
      throw new AuthenticationError('Username atau Password yang anda berikan salah!')
    }

    return id
  }

  async verifyUsername (username) {
    const query = {
      text: 'select username from users where username = $1',
      values: [username]
    }

    const result = await this._pool.query(query)

    if (result.rowCount) {
      throw new InvariantError('Username sudah digunakan!')
    }
  }

  async addUser ({ username, password, fullname }) {
    await this.verifyUsername(username)

    const id = nanoid(16)
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const query = {
      text: 'insert into users values($1, $2, $3, $4, $5, $6) returning id',
      values: [id, username, fullname, hashedPassword, createdAt, updatedAt]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan!')
    }

    return result.rows[0].id
  }

  async getUserById (userId) {
    const query = {
      text: 'select id, username, fullname from users where id = $1',
      values: [userId]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan!')
    }
  }
}

module.exports = UserService
