import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        token:"",
        currentUser:null,
        isFetching:false,
        isError:false
    },
    reducers:{
        getToken:(state,action)=>{
            state.token=action.payload
        },
        loginStart:(state)=>{
            state.isFetching=true

        },
        loginSuccess:(state,action)=>{
            state.isFetching=false
            state.currentUser=action.payload
            state.isError=false
        },
        loginFailure:(state,action)=>{
            state.isFetching=false
            state.isError=true
        },
        logout:(state)=>{
            state.token=null;
            state.currentUser=null;
        },
        clearError:(state)=>{
            state.isError=false;
        }
    }
})


export const {loginStart,loginFailure,loginSuccess,logout,getToken,clearError} = userSlice.actions
export default userSlice.reducer