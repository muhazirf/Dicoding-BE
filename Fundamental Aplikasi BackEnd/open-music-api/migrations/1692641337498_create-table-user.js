/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    username: {
      type: 'varchar(50)',
      notNull: true
    },
    fullname: {
      type: 'varchar(50)',
      notNull: true
    },
    password: {
      type: 'text',
      notNull: true
    },
    created_at: {
      type: 'varchar(50)',
      notNull: true
    },
    updated_at: {
      type: 'varchar(50)',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}
