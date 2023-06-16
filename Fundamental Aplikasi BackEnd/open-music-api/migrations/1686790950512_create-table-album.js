/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('album', {
    id: {
      type: 'VARCHAR',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR',
      notNull: true,
    },
    year: {
      type: 'VARCHAR',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
