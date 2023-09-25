"use client"

import "./styles.css";

import {useState} from "react"
import {useRouter} from "next/navigation"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateRecipe() {

    const createRecipeURL = process.env.BASE_URL + "/createRecipe";
    const router = useRouter()

    const [recipe, setRecipe] = useState({
        name: "",
        directions: ""
    });

    const handleChange = (event) => {
        const { name , value } = event.target

        setRecipe((prevRecipe) => {
            return {
                ...prevRecipe, [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, directions } = recipe

        const res = await fetch(createRecipeURL, {
            method: 'POST',
            body: JSON.stringify({name, directions})
        })

        const result = await res.json()
        const recipeId = result.id;

        router.push(`/addIngredient/${recipeId}`);

        // const recipeRecord = {
        //     recipeId : recipeId,
        //     name : name,
        //     direction : directions,
        // }


        // const recipeRes = await fetch("/api/saveRecipe", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({recipeId, name, directions})
        // });
     }

    return (
        <Box >
            <form 
                className="formContainer"
                onSubmit={handleSubmit}
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <TextField
                    className="formField"
                    required
                    id="outlined-required"
                    placeholder="Recipe Name"
                    name="name"
                    onChange={handleChange}
                    value={recipe.name}
                />
                <TextField
                    className="formField"
                    required
                    id="outlined-multiline-static-required"
                    placeholder="Recipe Directions"
                    multiline
                    rows={10}
                    name="directions"
                    onChange={handleChange}
                    value={recipe.directions}
                />
                <Button 
                    className="submit"
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
)
}