import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Grid 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledButton } from '../components/materialui';

const Categories = ({handleSearchChange}) => {
  
    const handleSearchtermChange = (event) => {
       
        console.log(event.target.value,'the value')
        handleSearchChange(event.target.value)
    };

    return (
        <Grid container item xs={12} sm={10} lg={12} spacing={2} width={1000} alignItems="center">
            <Grid item xs={2}>
                <Link to={`/create`} style={{ textDecoration: 'none', width: '100%' }}>
                    <StyledButton variant="contained" fullWidth>
                        Create Contract
                    </StyledButton>
                </Link>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search"
                    
                    onChange={handleSearchtermChange}
                />
            </Grid>
        </Grid>
    )
}

export default Categories;