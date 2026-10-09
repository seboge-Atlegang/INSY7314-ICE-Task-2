const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/store');

const jwtSecret = () => process.env.JWT_SECRET || 'development_only_secret_change_me';

async function register(req, res) {
  const email = req.body.email.trim().toLowerCase();
  if (users.some((user) => user.email === email)) {
    return res.status(409).json({ message: 'Email is already registered' });
  }

  const user = {
    id: `u${users.length + 1}`,
    name: req.body.name.trim(),
    email,
    passwordHash: await bcrypt.hash(req.body.password, 10),
    role: 'user'
  };
  users.push(user);
  return res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

async function login(req, res) {
  const email = req.body.email.trim().toLowerCase();
  const user = users.find((item) => item.email === email);
  const passwordMatches = user && await bcrypt.compare(req.body.password, user.passwordHash);
  if (!passwordMatches) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret(),
    { expiresIn: '1h' }
  );
  return res.status(200).json({ token, expiresIn: '1h' });
}

function profile(req, res) {
  res.status(200).json({ user: req.user });
}

module.exports = { register, login, profile };
