const express = require('express');
const { createGadget, deleteGadget } = require('../controllers/gadgetController');
const { validateGadget } = require('../middleware/validationMiddleware');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, validateGadget, createGadget);
router.delete('/:id', protect, requireAdmin, deleteGadget);

module.exports = router;
