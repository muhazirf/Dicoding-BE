/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    created_at: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    updated_at: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  })
}

exports.down = pgm => { pgm.dropTable('playlist_song_activities') }
