import React, { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase, Stack } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getContractById, updateContractById } from '../../services/contractService';
// import { getContractById, updateBlogById, uploadImage } from '../../services/contractService';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    background-color: #f5f5f5;
    padding: 10px 15px;
    border-radius: 4px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 50px;
    padding: 15px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
        border-color: primary;
    }
`;

const initialPost = {
    contractTitle: '',
    clientName: '',
    contractData: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getContractById(id);
                if (response) {
                    setPost(response.contract);
                }
            } catch (error) {
                toast.error('Failed to fetch contract details');
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("image", file);
                
                try {
                    const response = await uploadImage(data);
                    if (response) {
                        setPost(prevPost => ({
                            ...prevPost,
                            picture: response.url,
                            image: response.url
                        }));
                        setImageURL(response.url);
                    }
                } catch (error) {
                    toast.error('Failed to upload image');
                    console.error(error);
                }
            }
        }
        getImage();
    }, [file]);

    const updateContractPost = async () => {
        try {
            console.log(post,post.id,'the contract to update')
            const response = await updateContractById(post, post.id);
            toast.success('Contract updated successfully');
            navigate(`/details/${id}`);
        } catch (error) {
            const errorMessage = error.response?.data?.error?.[0]?.message || 'Error updating contract';
            toast.error(errorMessage);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    }

    return (
        <Container>
            <Image src={imageURL} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" style={{cursor: 'pointer'}} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Stack spacing={2} direction="row" sx={{ width: '100%', alignItems: 'center' }}>
                    <InputTextField 
                        fullWidth
                        placeholder="Contract Title"
                        name='contractTitle'
                        value={post.contractTitle}
                        onChange={handleChange}
                    />
                    <InputTextField 
                        fullWidth
                        placeholder="Client Name"
                        name='clientName'
                        value={post.clientName}
                        onChange={handleChange}
                    />
                    <InputTextField 
                        fullWidth
                        placeholder="Contract Amount"
                        type='number'
                        name='price'
                        value={post.price}
                        onChange={handleChange}
                    />
                    <Button 
                        onClick={updateContractPost} 
                        variant="contained" 
                        color="primary"
                    >
                        Update
                    </Button>
                </Stack>
            </StyledFormControl>

            <StyledTextArea
                minRows={5}
                placeholder="Contract Details..."
                name='contractData'
                value={post.contractData}
                onChange={handleChange}
            />
        </Container>
    )
}

export default Update;