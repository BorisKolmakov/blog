import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data.article
  } catch (err) {
    throw new Error(err)
  }
})

export const createArticle = createAsyncThunk('article/createArticle', async (data) => {
  try {
    const res = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: data.article,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data.article
  } catch (err) {
    throw new Error(err)
  }
})

export const updateArticle = createAsyncThunk('article/updateArticle', async (data) => {
  try {
    const res = await axios.put(
      `https://blog.kata.academy/api/articles/${data.slug}`,
      {
        article: data.article,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const deleteArticle = createAsyncThunk('article/deleteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const favoriteArticle = createAsyncThunk('article/favoriteArticle', async (slug) => {
  try {
    const res = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        body: '',
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const unfavoriteArticle = createAsyncThunk('article/unfavoriteArticle', async (slug) => {
  try {
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const fetchArticles = createAsyncThunk('list/fetchArticles', async (offset) => {
  try {
    const res = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw new Error(err)
  }
})

export const fetchRegistration = createAsyncThunk('user/fetchRegistration', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users', data)
    localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://blog.kata.academy/api/users/login', data)
    localStorage.setItem('token', res.data.user.token)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await axios.get('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.put(
      'https://blog.kata.academy/api/user',
      { user: data },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data.errors)
  }
})
