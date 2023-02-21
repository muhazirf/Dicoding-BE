const {
  addBookHandler,
  getAllBooksHandler,
  getAllBookReadingHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  deleteBookFinishHandler
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  },
  {
    method: 'GET',
    path: '/books/reading/{reading?}',
    handler: getAllBookReadingHandler
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/finished/{id}',
    handler: deleteBookFinishHandler
  }
]

module.exports = routes
