import { createSlice } from "@reduxjs/toolkit";


const RequestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const newArray=state.filter((s1)=>s1._id!==action.payload);
            return newArray;
        }
    }
})

export const {addRequest,removeRequest}=RequestSlice.actions;
export default RequestSlice.reducer;