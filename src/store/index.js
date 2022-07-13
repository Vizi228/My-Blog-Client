import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/userSlice'
import  commentSlice  from './slice/commentSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    commentSlice
  },
})