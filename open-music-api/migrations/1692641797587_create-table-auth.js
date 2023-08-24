/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('authentications', {
    token: {
      type: 'text',
      notNull: true
    },
    created_at: {
      type: 'varchar(50)',
      notNull: true
    },
    updated_at: {
      type: 'varchar(50)',
      notNull: false
    }
  })
}

exports.down = pgm => { pgm.dropTable('authentications') }
