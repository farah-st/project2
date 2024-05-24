const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

// Route to retrieve all recipes
router.get('/', recipeController.getAllRecipes);

// Route to retrieve a single recipe by ID
router.get('/:id', recipeController.getSingleRecipe);

// Route to create a new recipe
router.post('/', recipeController.createRecipe);

// Route to update an existing recipe
router.put('/:id', recipeController.updateRecipe);

// Route to delete an existing recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;

