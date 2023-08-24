/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    playlist_id: {
      type: 'varchar(30)',
      references: '"playlists"',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    song_id: {
      type: 'varchar(30)',
      references: '"song"',
      onDelete: 'cascade',
      onUpdate: 'cascade'
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
