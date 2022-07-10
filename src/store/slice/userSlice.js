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

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer