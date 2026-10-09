const express = require('express');
const { getBooks, getBookById, createBook } = require('../controllers/bookController');
const { validateBook } = require('../middleware/validationMiddleware');

const router = express.Router();

router.route('/').get(getBooks).post(validateBook, createBook);
router.get('/:id', getBookById);

module.exports = router;
