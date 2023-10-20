import { createSlice } from '@reduxjs/toolkit'

import { fetchUser, fetchRegistration, fetchLogin, updateUser } from '../service/platformAPI'

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  user: {
    email: '',
    token: '',
    username: '',
    image: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setsIsLoggedOut(state) {
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
    })
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      console.log(action.payload, 'registration Error')
      state.error = action.payload
    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.error
      state.isLoggedIn = true
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
      state.loading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
    })

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload.user, 'updateUser')
      state.user = action.payload.user
      state.error = null
      state.loading = false
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})

export const { setsIsLoggedOut } = userSlice.actions
export default userSlice.reducer
