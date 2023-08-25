/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    user_id: {
      type: 'varchar(50)',
      notNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: '"users"'
    },
    album_id: {
      type: 'varchar(50)',
      notNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: '"albums"'
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

exports.down = pgm => {}
