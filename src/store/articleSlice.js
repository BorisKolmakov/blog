import { createSlice } from '@reduxjs/toolkit'

import { fetchArticle, createArticle, updateArticle } from '../service/platformAPI'

const initialState = {
  loading: true,
  error: '',
  article: {
    author: {
      username: '',
      image: '',
    },
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
  },
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload
      state.loading = false
    })
    builder.addCase(fetchArticle.pending, (state, action) => {
      state.loading = true
      state.error = action.payload
    })
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
    builder.addCase(createArticle.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createArticle.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createArticle.rejected, (state, action) => {
      state.error = action.error
    })

    builder.addCase(updateArticle.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updateArticle.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.error = action.error
    })
  },
})

export default articleSlice.reducer
