const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Serve Swagger UI at /api-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Mount the recipes routes under the /recipes endpoint
router.use('/recipes', require('./recipes')); // Assuming 'recipes' routes are defined in ./recipes

module.exports = router;

