import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  const res = await api.post('/auth/register', payload)
  return res.data
})

export const login = createAsyncThunk('auth/login', async (payload) => {
  const res = await api.post('/auth/login', payload)
  // some backends return { token, user } — adapt if needed
  if (res.data?.token) localStorage.setItem('token', res.data.token)
  return res.data
})

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token')
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user ?? action.payload
      })
      .addCase(login.pending, (state) => { state.status = 'loading' })
      .addCase(login.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })

      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user ?? null
      })
      .addCase(register.pending, (state) => { state.status = 'loading' })
      .addCase(register.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
  },
})

export const { logout } = slice.actions
export default slice.reducer
