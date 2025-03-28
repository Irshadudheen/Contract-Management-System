import React, { useState } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';

// Components
import Banner from '../components/Banner';
import Categories from './Categories';
import Posts from './posts/posts';

const Home = () => {
    // State for search input
    const [searchTerm, setSearchTerm] = useState('');
    // State for current page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage]=useState(1)
    // Handler for search input
    const handleSearchChange = (event) => {
        setSearchTerm(event);
    };
    const handleTotalPage=(total)=>{
        setTotalPage(total)
    }
    // Handler for pagination
    const handlePageChange = (event, value) => {
        console.log(value,'the page change')
        setCurrentPage(value);
    };
     

    return (
        <>
            <Banner />
            

            <Grid container spacing={2}  >
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories handleSearchChange={handleSearchChange} />
                </Grid>
                
                <Grid container item xs={12} sm={12} lg={12} direction="column">
                   
                    <Grid container paddingLeft={4} >
                        <Posts 
                            searchTerm={searchTerm} 
                            currentPage={currentPage} 
                            handleTotalPage={handleTotalPage}
                            />
                    </Grid>

                    {/* Pagination */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mt: 2, 
                        width: '100%' 
                    }}>
                        <Pagination
                            count={totalPage}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;