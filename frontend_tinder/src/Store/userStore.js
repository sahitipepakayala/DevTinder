import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import FeedReducer from './FeedSlice'
import ConnectionReducer from "./ConnectionSlice"
import RequestReducer from "./RequestSlice";
const userStore=configureStore({
    reducer:{
        user:userReducer,
        feed:FeedReducer,
        connection:ConnectionReducer,
        request:RequestReducer

    }
});

export default userStore;