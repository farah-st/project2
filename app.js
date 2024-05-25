const express = require('express');
const { initDb } = require('./db/connect');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/recipes', recipesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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



