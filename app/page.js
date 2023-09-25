import './recipes/styles.css'

import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box className="recipeContainer"
      style={{justifyContent: "center"}}>
      <h1 style={{fontSize: "3rem"}}>Jason Guba's Cookbook App for Appiphony</h1> 
    </Box>
    )
}
