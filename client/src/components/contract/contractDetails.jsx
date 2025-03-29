import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';


import { useContractContext } from '../../context/contractContext';
import { updateContractStatus, getContractById, deleteContractById } from '../../services/contractService';
import toast from 'react-hot-toast';
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

const HeadingContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px'
    },
}));

const ContractInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px'
    },
}));

const PriceBox = styled(Typography)({
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 12px',
    backgroundColor: '#f0f7ff',
    borderRadius: '4px',
    border: '1px solid #e0e0e0'
});

const StatusBadge = styled(Box)(({ theme, status }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.8rem',
    backgroundColor: getStatusColor(status),
    color: 'white',
    marginLeft: '10px',
    cursor: 'pointer'
}));

const StatusDropdown = styled(Box)`
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 10;
`;

const StatusOption = styled(Box)`
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

// Function to determine status color
const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
        case 'draft': return '#9370DB';      // Muted Purple
        case 'in progress': return '#FFA500'; // Orange
        case 'finalized': return '#2E8B57';   // Sea Green
        case 'pending': return '#4169E1';     // Royal Blue
        case 'cancelled': return '#DC143C';   // Crimson
        default: return '#808080';            // Gray
    }
}

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const { contracts, updateContractStatus: globalUpdateStatus } = useContractContext();
    const [post, setPost] = useState({});
    const [socket, setSocket] = useState(null);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const STATUSES = ['Draft', 'Finalized', 'Pending', 'Cancelled'];
    
    useEffect(() => {
        // Establish Socket.IO connection
        if (contracts[id]) {
            setPost(contracts[id]);
        }
      
        // Fetch initial contract data
        const fetchData = async () => {
            try {
                let response = await getContractById(id);
                if (response) {
                    setPost(response.contract);
                }
            } catch (error) {
                console.error('Failed to fetch contract:', error);
            }
        }
        fetchData();
    }, [id,contracts]);

    const handleStatusChange = async (newStatus) => {
        try {
            // Update status via API
            await updateContractStatus(id, newStatus);
            
            // Emit socket event for real-time update
            globalUpdateStatus(id, newStatus);

            // Close dropdown
            setShowStatusDropdown(false);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    }

    const deleteContract = async () => {  
        // Uncomment and implement actual delete functionality
        await deleteContractById(id);
        toast.success('Contract deleted successfully!');
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

    // Format price with currency symbol
    const formatPrice = (price) => {
        if (!price) return '$0.00';
        return `$${Number(price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

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
                        <DeleteIcon onClick={deleteContract} color="error" />
                    </>
                )}
            </Box>
            <HeadingContainer>
                <Heading component="h1">{post.contractTitle}</Heading>
                <Box style={{ position: 'relative' }}>
                    <StatusBadge 
                        component="span" 
                        status={post.status}
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    >
                        {post.status}
                    </StatusBadge>
                    {showStatusDropdown && (
                        <StatusDropdown>
                            {STATUSES.filter(status => status.toLowerCase() !== post.status?.toLowerCase())
                                .map((status) => (
                                    <StatusOption 
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                    >
                                        {status}
                                    </StatusOption>
                                ))
                            }
                        </StatusDropdown>
                    )}
                </Box>
            </HeadingContainer>

            <Author>
                <ContractInfo>
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
                    
                    <PriceBox component="span">
                        Contract Amount: {formatPrice(post.contractAmount || post.price)}
                    </PriceBox>
                </ContractInfo>
                
                <Typography 
                    component="span"
                    style={{
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