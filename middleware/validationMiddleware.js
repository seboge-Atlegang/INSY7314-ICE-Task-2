const { books } = require('../data/store');

function validationError(res, errors) {
  return res.status(400).json({ message: 'Validation failed', errors });
}

function validateBook(req, res, next) {
  const { id, title, author, genre, year, isbn } = req.body;
  const errors = [];
  if (typeof id !== 'string' || !id.trim()) errors.push('id is required');
  if (typeof title !== 'string' || !title.trim()) errors.push('title is required');
  if (typeof author !== 'string' || !author.trim()) errors.push('author is required');
  if (typeof genre !== 'string' || !genre.trim()) errors.push('genre is required');
  if (!Number.isInteger(Number(year)) || Number(year) < 1000 || Number(year) > new Date().getFullYear()) {
    errors.push('year must be a valid four-digit year');
  }
  if (typeof isbn !== 'string' || !/^\d{10}(\d{3})?$/.test(isbn.trim())) {
    errors.push('isbn must contain 10 or 13 digits');
  }
  if (typeof id === 'string' && books.some((book) => book.id === id.trim())) errors.push('id must be unique');
  if (errors.length) return validationError(res, errors);
  return next();
}

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];
  if (typeof name !== 'string' || name.trim().length < 2) errors.push('name must be at least 2 characters');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('a valid email is required');
  if (typeof password !== 'string' || password.length < 8) errors.push('password must be at least 8 characters');
  if (errors.length) return validationError(res, errors);
  return next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];
  if (typeof email !== 'string' || !email.trim()) errors.push('email is required');
  if (typeof password !== 'string' || !password) errors.push('password is required');
  if (errors.length) return validationError(res, errors);
  return next();
}

function validateGadget(req, res, next) {
  const { name, brand, category, price } = req.body;
  const errors = [];
  if (typeof name !== 'string' || !name.trim()) errors.push('name is required');
  if (typeof brand !== 'string' || !brand.trim()) errors.push('brand is required');
  if (typeof category !== 'string' || !category.trim()) errors.push('category is required');
  if (!Number.isFinite(Number(price)) || Number(price) <= 0) errors.push('price must be greater than zero');
  if (errors.length) return validationError(res, errors);
  return next();
}

module.exports = { validateBook, validateRegister, validateLogin, validateGadget };
