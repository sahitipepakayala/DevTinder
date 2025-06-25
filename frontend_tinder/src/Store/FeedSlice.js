import { createSlice } from "@reduxjs/toolkit";

const FeedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state,action)=> {
            const feed1=state.filter((f)=>f._id!==action.payload);
            return feed1;
        }
    }
})

export const {addFeed,removeFeed}=FeedSlice.actions;
export default FeedSlice.reducer;