require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const gadgetRoutes = require('./routes/gadgetRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Allow the configured browser client while still supporting tools such as Postman,
// which do not send an Origin header.
const allowedOrigins = [process.env.CLIENT_ORIGIN || 'http://localhost:3000'];
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error('Origin is not allowed by CORS');
    error.statusCode = 403;
    return callback(error);
  },
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '20kb' }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'INSY7314 Secure API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptimeSeconds: Math.floor(process.uptime()) });
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gadgets', gadgetRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
