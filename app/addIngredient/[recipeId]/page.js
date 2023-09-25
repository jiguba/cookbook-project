"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// const createRequestURL = process.env.BASE_URL + "/createRecipe"

export default function AddIngredient({ params }) {

    const router = useRouter();
    const recipeId = params.recipeId;

    console.log(recipeId);
    const createIngredientURL = `${process.env.BASE_URL}/addIngredient`;
    console.log("The recipe page we are on is " + recipeId);

    const [ingredients, setIngredients] = useState({
        recipeID: recipeId,
        ingredients: ""
    });

    const handleChange = (event) => {
        const { name , value } = event.target

        setIngredients((prevIngredient) => {
            return {
                ...prevIngredient, [name]: value
            }
        })
        console.log(ingredients)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ingredientsList = ingredients.ingredients.split(/\n/);
        console.log(ingredientsList)


        ingredientsList.map(async (ingredient) => {

            console.log("Submitting names");
            console.log(ingredient, recipeId);

            const res = await fetch(createIngredientURL, {
                method: 'POST',
                body: JSON.stringify({recipeId: recipeId, name: ingredient})
            })

            const ingredientId = await res.json();
            console.log(ingredientId);
        })

        // const ingredientsCollection = await Promise.all(ingredientsPromise);

        // console.log(JSON.stringify({recipeId,ingredientsCollection}));

        // const ingredientRes = await fetch("/api/saveRecipe", {
        //     method: "PUT",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({recipeId,ingredientsCollection})
        // });
    }

    return (
        <form
            className="formContainer"
            onSubmit={handleSubmit}
            style={{display: "flex", flexDirection: "column", alignItems: "center"}}
        >
            <TextField
                className="formField"
                required
                id="outlined-multiline-static-required"
                placeholder="Recipe Ingredients"
                rows={10}
                multiline
                name="ingredients"
                onChange={handleChange}
                value={ingredients.ingredients}
            />
            <Button 
                className="submit"
                variant="contained"
                type="submit"
            >
                Submit
            </Button>
        </form>)
}