/* esl'INTEGER'-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('song', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    duration: {
      type: 'INTEGER'
    },
    album_id: {
      type: 'VARCHAR(50)',
      references: '"album"',
      notNull: false,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    created_at: {
      type: 'TEXT',
      notNull: true
    },
    updated_at: {
      type: 'TEXT',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('song')
}
