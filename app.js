const express = require('express');
const bodyParser = require('body-parser');
//const swaggerUi = require('swagger-ui-express');
const { connectDB } = require('./db/connection'); // Import connectDB instead of initDb
require('dotenv').config();

//const swaggerFile = require('./swagger_output.json'); // Ensure this path is correct

const app = express();

// Middleware
app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Database connection
connectDB(() => {
  // Routes
  const recipeRoutes = require('./routes/recipes');
  app.use('/recipes', recipeRoutes);

  // Start server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});