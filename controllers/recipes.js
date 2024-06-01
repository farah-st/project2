const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const validateRecipe = (recipe) => {
  if (!recipe.title || typeof recipe.title !== 'string') return 'Invalid title';
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return 'Invalid ingredients';
  if (!recipe.instructions || typeof recipe.instructions !== 'string') return 'Invalid instructions';
  if (!recipe.cookTime || typeof recipe.cookTime !== 'string') return 'Invalid cookTime';
  if (!recipe.difficulty || typeof recipe.difficulty !== 'string') return 'Invalid difficulty';
  return null;
};

const getAllRecipes = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('recipes').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes.' });
  }
};

const getSingleRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').findOne({ _id: recipeId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Recipe not found.' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recipe.' });
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      difficulty: req.body.difficulty
    };
    const validationError = validateRecipe(recipe);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: 'Failed to create recipe.' });
    }
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'An error occurred while creating the recipe.' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      difficulty: req.body.difficulty
    };
    const validationError = validateRecipe(recipe);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const response = await mongodb.getDb().db().collection('recipes').replaceOne({ _id: recipeId }, recipe);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Recipe updated successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found or no changes made.' });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'An error occurred while updating the recipe.' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: recipeId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Recipe not found.' });
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'An error occurred while deleting the recipe.' });
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};

