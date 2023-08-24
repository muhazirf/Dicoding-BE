/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('playlists', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    name: {
      type: 'varchar(50)',
      notNull: true
    },
    owner: {
      type: 'varchar(30)',
      references: '"users"',
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
  pgm.dropTable('playlists')
}
