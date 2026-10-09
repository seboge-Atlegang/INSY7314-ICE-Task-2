const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', loginLimiter, validateLogin, login);
router.get('/profile', protect, profile);

module.exports = router;
