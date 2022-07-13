import { createSlice } from '@reduxjs/toolkit'
import { checkAuth } from '../../services/auth';

const initialState = {
  user: {},
  isAuth: false,
  isLoaded: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoaded: (state) => {
      state.isLoaded = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoaded = true;
    },
    removeUser: (state) => {
      state.user = {};
      state.isAuth = false;
    }
  },
  extraReducers: {
    [checkAuth.pending.type]: (state) => {
      state.isLoaded = false;
    },
    [checkAuth.fulfilled.type]: (state, action) => {
      state.isLoaded = true;
      if(action.payload) {
        state.user = action.payload;
        state.isAuth = true;
      }
    },
    [checkAuth.rejected.type]: (state) => {
      state.isLoaded = true;
    },
  }
})

export const { setUser, removeUser, setIsLoaded } = userSlice.actions

export default userSlice.reducer