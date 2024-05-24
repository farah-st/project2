const { getDb } = require('../db/connection');

exports.createRecipe = async (req, res) => {
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cookTime: req.body.cookTime,
    difficulty: req.body.difficulty
  };

  try {
    const db = getDb();
    console.log('MongoDB client:', db); // Log the MongoDB client instance
    console.log('Collections:', db.collections); // Log the collections available in the database
    const result = await db.collection('recipes').insertOne(recipe);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error('Error creating recipe:', err); // Log any errors
    res.status(400).json({ message: err.message });
  }
};


exports.updateRecipe = async (req, res) => {
  try {
    const db = getDb(); // Use getDb function to get the database instance
    const updatedRecipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      difficulty: req.body.difficulty
    };
    const result = await db.collection('recipes').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedRecipe });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const db = getDb(); // Use getDb function to get the database instance
    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};