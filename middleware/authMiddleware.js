const jwt = require('jsonwebtoken');
const { users } = require('../data/store');

function protect(req, res, next) {
  const authorization = req.headers.authorization || '';
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const token = authorization.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'development_only_secret_change_me');
    const user = users.find((item) => item.id === payload.userId);
    if (!user) return res.status(401).json({ message: 'Token user no longer exists' });
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Administrator access is required' });
  return next();
}

module.exports = { protect, requireAdmin };
