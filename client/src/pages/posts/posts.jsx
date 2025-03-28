import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { getContracts } from '../../services/contractService';
import Post from './post';

const Posts = ({handleTotalPage,currentPage,searchTerm}) => {
    const [posts, setPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const handlePagination=()=>{

    }
    useEffect(() => {
        console.log(searchTerm,'the search term,in posts')
        const fetchData = async () => { 
            console.log(currentPage,'the current page')
            const response = await getContracts(currentPage,searchTerm)
            console.log(response)
            handleTotalPage(response.totalPages)
            setPosts(response.contracts);
        }
        fetchData();
    }, [currentPage,searchTerm]);

    return (
        <Grid container spacing={6}>
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <Grid item  key={post.id} >
                        <Link 
                            style={{
                                textDecoration: 'none', 
                                color: 'inherit', 
                                width: '100%',
                                height: '100%'
                            }} 
                            to={`details/${post.id}`}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Box sx={{
                        color: '878787', 
                        margin: '30px 80px', 
                        fontSize: 18,
                        width: '100%'
                    }}>
                        No data is available for selected category
                    </Box>
                </Grid>
            )}
        </Grid>
    )
}

export default Posts;