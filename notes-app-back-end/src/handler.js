// const { nanoid } = require('nanoid')
const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).lengtj > 0

  if (isSuccess) {
    const response = h.reponse({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    staus: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

module.exports = { addNotesHandler }
