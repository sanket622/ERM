import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../components/auth/UserSlice'


export const store = configureStore({
  reducer: {
    user: UserReducer,
   
  },
})