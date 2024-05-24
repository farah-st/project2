const express = require('express');
const router = express.Router();

// Mount the recipes routes under the /recipes endpoint
router.use('/recipes', require('../controllers/recipes'));

module.exports = router;
