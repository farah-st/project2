const express = require('express');
const mongodb = require('./db/connect');
const recipesRoutes = require('./routes/recipes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Adjust the path if needed

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use recipes routes
app.use('/recipes', recipesRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to the database and start the server
const PORT = process.env.PORT || 8080;
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
