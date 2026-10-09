// Temporary in-memory data stores. Data resets whenever the server restarts.
const books = [
  { id: 'b1', title: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'Fiction', year: 1958, isbn: '9780385474542' }
];

const users = [];
const gadgets = [];

module.exports = { books, users, gadgets };
