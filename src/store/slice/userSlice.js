import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isAuth: false,
  isLoaded: false,
}

export const userSlice = createSlice({
  name: 'counter',
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
})

export const { setUser, removeUser, setIsLoaded } = userSlice.actions

export default userSlice.reducer