import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import toast from 'react-hot-toast';
import { createContract } from '../../services/contractService';

// import { API } from '../../service/axios';
// import { DataContext } from '../../context/DataProvider';

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

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    clientName: '',
    contractAmount: '',  // Added new field for contract amount
    categories: '',
}

const CreatContract = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    // const { account } = useContext(DataContext);
    const [url, setUrl] = useState('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')

    // const url = post.image ? post.image : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("image", file);
                console.log(data)
                const response = await uploadImage(data)
                console.log(response)
                // const response = await API.uploadFile(data);
                setUrl(response.url)
                // post.image = response.url;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        // post.username = account.username;
    }, [file])

    const savePost = async () => {
        try {
            const response = await createContract(post)
            console.log(response)
       
            post.image = url
            console.log(post)
      
            toast.success('Contract created successfully!');
            
            navigate('/');
     
        } catch (error) {
            toast.error(error.response.data.errors[0].message)
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                
                
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>
            <InputTextField onChange={(e) => handleChange(e)} name='clientName' placeholder="Client name" />
            <InputTextField 
                onChange={(e) => handleChange(e)} 
                name='price' 
                placeholder="Contract Amount ($)" 
                type="number" 
            />
            <Textarea
                rowsMin={5}
                placeholder="Write the key contract details, including parties involved, obligations, and timeline..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatContract;