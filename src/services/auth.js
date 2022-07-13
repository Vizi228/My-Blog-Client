import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../api/Authorization";

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      if(localStorage.getItem('mern-token')){
        const { data } = await Auth.checkAuth()
        return data
      } else {
        return false
      }
    } catch (e) {
          return thunkAPI.rejectWithValue('Error')
    }
  }
);