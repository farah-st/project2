const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const Joi = require('joi');

const recipeSchema = Joi.object({
  title: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  instructions: Joi.string().required(),
  cookTime: Joi.string().required(),
  difficulty: Joi.string().required()
});

const validateRecipe = (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  return error ? error.details[0].message : null;
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
    const { title, ingredients, instructions, cookTime, difficulty } = req.body;
    const recipe = { title, ingredients, instructions, cookTime, difficulty };
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
    const { title, ingredients, instructions, cookTime, difficulty } = req.body;
    const recipe = { title, ingredients, instructions, cookTime, difficulty };
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
      res.status(200).json({ message: 'Recipe deleted successfully' });
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
