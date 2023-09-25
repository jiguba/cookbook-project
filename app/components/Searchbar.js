"use client"

import {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));

export default function Searchbar(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleClick = () => {
        props.onClick(searchQuery)
    }

    return (<Search className="searchContainer">
        <StyledInputBase
            placeholder={props.placeholder}
            onChange={e => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
        />
        <Button onClick={handleClick}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
        </Button>
    </Search>)
}
