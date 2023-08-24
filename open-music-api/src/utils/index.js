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
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at
})

const mapDBToModelPlaylistSong = (playlistData, songData) => ({
  playlist: {
    id: playlistData.id,
    name: playlistData.name,
    username: playlistData.username,
    songs: songData,
    createdAt: playlistData.created_at,
    updatedAt: playlistData.updated_at
  }
})

const mapDBToModelPlaylistActivity = (playlistId, activities) => ({
  playlistId,
  activities
})

module.exports = { mapDBToModelSong, mapDBToModelAlbum, mapDBToModelPlaylistSong, mapDBToModelPlaylistActivity }
