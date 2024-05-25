const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
// Mount the recipes routes under the /recipes endpoint
router.use('/recipes', require('./recipes')); // Corrected mount path

module.exports = router;

