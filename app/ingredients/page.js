'use client';

import "./styles.css";

import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Searchbar from "../components/Searchbar"

const searchIngredientsURL = `${process.env.BASE_URL}/searchIngredients`;

const key = "searchTerm";

export default function SearchRecipes() {

    // const [ingredients, setIngredients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    // useEffect(() => {
    //     async function fetchRecipes() {
    //         const res = await fetch(`${searchIngredientsURL}?${encodeURIComponent(key)}=${encodeURIComponent(searchQuery)}`);
    //         const recipes = await res.json();
    //     }
    //     fetchRecipes();
    // }, [searchQuery]);

    const handleClick = async (searchQuery) => {   
        
        if(searchQuery !== "") {
            const res = await fetch(`${searchIngredientsURL}?${encodeURIComponent(key)}=${encodeURIComponent(searchQuery)}`, {
                method: 'GET',
            })
    
            if (res.ok) {
                // Parse the JSON data from the response
                const filteredIngredients = await res.json();
                setFilteredIngredients(filteredIngredients);
                setSearchQuery("");
            } else {
                // Handle HTTP errors
                console.error('HTTP Error:', res.status, res.statusText);
            }
        }
    }

    return (            
    <Box>
        <Searchbar onClick={handleClick}
            placeholder="Search ingredients"/>
            
        <Box className="ingredientContainer">
            {
                filteredIngredients.map((ingredients,i) => {

                    return (
                        ingredients.recipes.map((recipes, j) => {
                            return (    
                                <Card
                                    key={j}>
                                    <CardContent >
                                        <Typography className="recipeTitle" variant="h5" component="div">
                                            {recipes.name}
                                        </Typography>        
                                    </CardContent>
                                </Card>)
                        })
                    )
                })
            }
        </Box>

    </Box>
    )
}