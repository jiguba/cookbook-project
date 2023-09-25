import connectDb from '../../database/database';
import { NextResponse } from 'next/server';
import {Recipe, Ingredient} from "../../Models/Recipe"

export async function POST(request) {
    console.log("Hello from api-page!");

    await connectDb();  // This will log connection status messages to the server console
  
    if(request.method === 'POST') {
        try {
            const { recipeId, name, directions } = await request.json();
            const newRecipe = new Recipe({
                id: recipeId,
                name: name,
                directions: directions,
                ingredients: []
            })

            console.log(newRecipe);

            const savedRecipe = await newRecipe.save();
            console.log("Recipe saved!");

        } catch(error) {
            console.log("error occured when saving recipe");
        }
    }

    return NextResponse.json({message: "Success"});
}

export async function PUT(request) {
    console.log("Hello from api-page!");

    await connectDb();  // This will log connection status messages to the server console

    if(request.method === 'PUT') {
        try {
            const { recipeId, ingredientsCollection } = await request.json();

            const ingredientsPromise = ingredientsCollection.map( async(ingredient) => {
                const newIngredient = new Ingredient({
                    id: ingredient.id,
                    name: ingredient.name
                })

                const savedIngredient = await newIngredient.save();
                console.log("Ingredient saved!");

                return newIngredient;
            })

            const ingredients = await Promise.all(ingredientsPromise);
            console.log(ingredients);

            const updatedRecipe = await Recipe.findOneAndUpdate({id: recipeId}, {ingredients: ingredients});

            console.log(updatedRecipe);
            console.log("Recipe updated!");

        } catch(error) {
            console.log(error);
        }
    }

    return NextResponse.json({message: "Success"});
}
