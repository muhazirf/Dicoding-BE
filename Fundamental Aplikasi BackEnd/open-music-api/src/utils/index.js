/* eslint-disable camelcase */
const mapDBToModelSong = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
  created_at,
  updated_at
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
  createdAt: created_at,
  updatedAt: updated_at
})

const mapDBToModelAlbum = ({
  id,
  name,
  year,
  created_at,
  updated_at
}, song) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
  songs: song
})

module.exports = { mapDBToModelSong, mapDBToModelAlbum }
