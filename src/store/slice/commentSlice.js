import { createSlice } from '@reduxjs/toolkit'
import { fetchComments } from '../../services/comments';

const initialState = {
  comments: [],
  isLoaded: false,
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
      state.isLoaded = true;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(item => item._id !== action.payload)
    },
    updateComment: (state,action) => {
      state.comments[action.payload.id].text = action.payload.text
    }
  },
  extraReducers: {
    [fetchComments.pending.type]: (state) => {
      state.isLoaded = false;
    },
    [fetchComments.fulfilled.type]: (state, action) => {
      state.isLoaded = true;
      state.comments = action.payload;
    },
    [fetchComments.rejected.type]: (state) => {
      state.isLoaded = true;
    },
  }
})

export const { setComments, addComment, removeComment, updateComment } = commentSlice.actions

export default commentSlice.reducer