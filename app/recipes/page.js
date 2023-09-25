'use client';

import "./styles.css"

import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Searchbar from "../components/Searchbar"

const searchRecipeURL = `${process.env.BASE_URL}/searchRecipes`;
const key = "searchTerm";

export default function SearchRecipes() {

    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = async (searchQuery) => {    
        const res = await fetch(`${searchRecipeURL}?${encodeURIComponent(key)}=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
        })

        if (res.ok) {
            // Parse the JSON data from the response
            const filteredData = await res.json();
            setFilteredRecipes(filteredData);
        } else {
            // Handle HTTP errors
            console.error('HTTP Error:', res.status, res.statusText);
        }
      }

    const handleRecipeClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (            
    <Box>
        <Searchbar onClick={handleClick}
            placeholder="Search recipes"
        />
        <Box className="recipeContainer"
            onClick={handleRecipeClick}>
            {
                filteredRecipes.map((recipes,i) => {
                    return (    
                        <Card className="recipe"
                            key={i}>
                            <CardContent >
                                <Typography className="recipeTitle" variant="h5" component="div">
                                    {recipes.name}
                                </Typography>        
                                <Typography className="recipeContent" variant="subtitle1" color="text.secondary">
                                    Ingredients: {recipes.ingredients.map(ing => ing.name).join(', ')}
                                </Typography>
                                <Typography className="recipeContent" variant="body2">
                                    Directions: {isExpanded ? recipes.directions : `${recipes.directions.slice(0, 250)}...`}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    </Box>
    )
}