import { createSlice } from '@reduxjs/toolkit'

import { fetchArticles } from '../service/platformAPI'

const initialState = {
  articles: [],
  total: 0,
  loading: true,
  error: null,
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.total = action.payload.articlesCount
      state.loading = false
    })
    builder.addCase(fetchArticles.rejected, (state, action) => {
      console.log(action, 'action')
      state.loading = false
      state.error = action.error
    })
  },
})

export const { setPage } = listSlice.actions

export default listSlice.reducer
