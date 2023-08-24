/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('collaborations', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    playlist_id: {
      type: 'varchar(50)',
      notNull: true
    },
    user_id: {
      type: 'varchar(50)',
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

exports.down = pgm => { pgm.dropTable('collaborations') }
