/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    plyalist_id: {
      type: 'varchar(50)',
      notNull: true
    },
    song_id: {
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

exports.down = pgm => {
  pgm.dropTable('playlist_songs')
}
