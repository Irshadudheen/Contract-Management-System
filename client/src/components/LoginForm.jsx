import { useEffect, useLayoutEffect, useState } from "react";
import { loginUser as userLogin, userSignUp } from "../services/authService";

import { useNavigate } from "react-router-dom";
import { Component, LoginButton, SignupButton, Text, Wrapper } from "./materialui";
import { Box, TextField } from "@mui/material";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import {setUser} from '../redux/userSlice'
import useGetUserData from "../hooks/useGetUser";





const loginInitialValues = {
  email: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  email: '',
  password: '',
};
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useGetUserData()
  useEffect(()=>{
    if(currentUser.token){
      navigate('/')
    }
  },[currentUser])
  const [error, showError] = useState('');
  const [account, toggleAccount] = useState('login');
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
   const signupUser = async () => {
        try {
            console.log(signup)
            const response = await userSignUp(signup);
            console.log(response)
          
                showError('');
                 
                toggleAccount('login');
                toast.success('Account created successfully!');
            
        } catch (error) {
          toast.error(error.response.data.errors[0].message)
            console.log(error)
        }

    }
  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
}
const loginUser = async () => {
  // let response = await API.userLogin(login);
  try {
      

  console.log(login)
  const response = await userLogin(login)
  console.log(response)
 
      

     
      // setAccount({ name: response.data.name, username: response.data.username });

      // isUserAuthenticated(true)
      setLogin(loginInitialValues);
      // console.log(response)
      // return
      dispatch(setUser({
          name: response.user.name,
          email:response.user.email,
          id: response.user.id,
          token:response.token
      }))
     
      toast.success('Login successful!');
      navigate('/')
    }
      catch(error){
        toast.error(error.response.data.errors[0].message)

      }
    }
const onValueChange = (e) => {
  setLogin({ ...login, [e.target.name]: e.target.value });
}

const onInputChange = (e) => {
  setSignup({ ...signup, [e.target.name]: e.target.value });
}

  return (
    <Component>
      
    <Box>
    <h1 style={{marginLeft:"40px",paddingTop:'50px'}}>Contract Management</h1>
        {
            account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" value={login.email} onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                    <TextField variant="standard" value={login.password} type='password' onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                    {error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                </Wrapper> :
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} type='password' name='password' label='Enter Password' />

                    <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
        }
    </Box>
</Component>
  );
};

export default LoginForm;
