/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('song', {
    id: {
      type: 'VARCHAR',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR',
      notNull: true,
    },
    year: {
      type: INT,
      notNull: true,
    },
    performer: {
      type: 'VARCHAR',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR',
      notNull: true,
    },
    duration: {
      type: INT,
    },
    albumId: {
      type: INT,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('song');
};
