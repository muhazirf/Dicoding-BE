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
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  },
  {
    method: 'GET',
    path: '/books/reading/{reading?}',
    handler: getAllBookReadingHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/finished/{bookId}',
    handler: deleteBookFinishHandler
  }
]

module.exports = routes
