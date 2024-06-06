const express = require('express');
const { initDb } = require('./db/connect');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(helmet());
// Adjusting CORS to allow requests from 'https://project2-0vw8.onrender.com'
app.use(cors({
  origin: 'https://cse341-recipes-frontend.netlify.app'
}));
app.use(morgan('combined'));

// Routes
app.use('/recipes', recipesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal error occurred.' });
});

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});






