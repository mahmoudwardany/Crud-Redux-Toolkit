import { configureStore } from '@reduxjs/toolkit'
import  postSlice  from '../feature/posts'

export const store = configureStore({
  reducer: {
    posts:postSlice
  },
})
