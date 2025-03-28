import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:'',
    id:'',
    email:'',
    name:''
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {token,name,email,id}=action.payload;
            state.email=email;
            state.id=id;
            state.token=token;
            state.name=name;
        },
        removeUser:(state)=>{
            state.token = '';
            state.email='';
            state.id="";
            state.name="";
        }
    }
})
export const {removeUser,setUser}=userSlice.actions;
export default userSlice.reducer;