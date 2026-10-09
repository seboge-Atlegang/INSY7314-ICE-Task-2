const { books } = require('../data/store');

function getBooks(req, res) {
  res.status(200).json({ count: books.length, books });
}

function getBookById(req, res) {
  const book = books.find((item) => item.id === req.params.id);
  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(book);
}

function createBook(req, res) {
  const book = {
    id: req.body.id.trim(),
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    genre: req.body.genre.trim(),
    year: Number(req.body.year),
    isbn: req.body.isbn.trim()
  };
  books.push(book);
  res.status(201).json({ message: 'Book created', book });
}

module.exports = { getBooks, getBookById, createBook };
