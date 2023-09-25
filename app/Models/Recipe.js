import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    id: String,
    name: String
})

const recipesSchema = new mongoose.Schema({
    id: String,
    name: String,
    directions: String,
    ingredients: [ingredientsSchema]
})

const Ingredient = new mongoose.model("Ingredient", ingredientsSchema);
const Recipe = new mongoose.model("Recipe", recipesSchema);

module.exports = {Ingredient, Recipe}