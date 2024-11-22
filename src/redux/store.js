import { configureStore } from '@reduxjs/toolkit'
import blogereducer from "../features/Blog/blogeSlice";
import userReducer from "../features/User/UserSlice";
import authReducer from "../features/Auth/AuthSlice";
export const store = configureStore({
  reducer: {
    bloge: blogereducer,
    user: userReducer,
    auth: authReducer
  },
})

export default store