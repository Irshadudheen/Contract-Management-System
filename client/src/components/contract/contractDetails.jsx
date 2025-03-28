import { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getContractById } from '../../services/contractService';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const StatusBadge = styled(Box)(({ theme, status }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.8rem',
    backgroundColor: getStatusColor(status),
    color: 'white',
    marginLeft: '10px'
}));

// Function to determine status color
const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
        case 'draft': return '#9370DB';      // Muted Purple
        case 'in progress': return '#FFA500'; // Orange
        case 'completed': return '#2E8B57';   // Sea Green
        case 'pending': return '#4169E1';     // Royal Blue
        case 'cancelled': return '#DC143C';   // Crimson
        default: return '#808080';            // Gray
    }
}

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await getContractById(id);
            if (response) {
                setPost(response.contract);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        // Uncomment and implement actual delete functionality
        // await deleteBlogById(id);
        navigate('/')
    }

    // Format date with more detailed options
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Check if created and updated dates are the same
    const areDatesEqual = () => {
        if (!post.createdAt || !post.updatedAt) return true;
        return new Date(post.createdAt).getTime() === new Date(post.updatedAt).getTime();
    }

    return (
        <Container>
            <Image src={post.image || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {true && (
                    <>  
                        <Link to={`/update/${post.id}`}>
                            <EditIcon color="primary" />
                        </Link>
                        <DeleteIcon onClick={deleteBlog} color="error" />
                    </>
                )}
            </Box>
            <Heading>
                {post.contractTitle}
                {post.status && <StatusBadge component="span" status={post.status}>{post.status}</StatusBadge>}
            </Heading>

            <Author>
                <Link 
                    to={`/?username=${post.contractTitle}`} 
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                >
                    <Typography component="span">
                        Client: {post.clientName && 
                            <Typography component="span" sx={{fontWeight: 600, marginLeft: '5px'}}>
                                {post.clientName}
                            </Typography>
                        }
                    </Typography>
                </Link>
                <Typography 
                    component="span"
                    style={{
                        marginLeft: 'auto', 
                        color: '#666',
                        fontStyle: 'italic'
                    }}
                >
                    {areDatesEqual() 
                        ? `Created: ${formatDate(post.createdAt)}` 
                        : `Created: ${formatDate(post.createdAt)} | Updated: ${formatDate(post.updatedAt)}`
                    }
                </Typography>
            </Author>

            <Typography component="div">{post.contractData}</Typography>
        </Container>
    )
}

export default DetailView;