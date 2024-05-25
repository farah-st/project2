const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve all recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 */
router.get('/', recipesController.getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Retrieve a single recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single recipe
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', recipesController.getSingleRecipe);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RecipeInput'
 *     responses:
 *       201:
 *         description: Recipe created
 */
router.post('/', recipesController.createRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RecipeInput'
 *     responses:
 *       200:
 *         description: Recipe updated
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', recipesController.updateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;


