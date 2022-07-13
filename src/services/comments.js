import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comments } from "../api/Comments";

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, thunkAPI) => {
    try {
      if (postId) {
        const { data } = await Comments.getPostsComment(postId);
        return data
      } else {
        const { data } = await Comments.getAllComments();
        return data
      }
    } catch (e) {
          return thunkAPI.rejectWithValue('Error during getting comments')
      }
  }
);