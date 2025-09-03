import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params = '') => {
  const res = await api.get(`/products${params}`)
  return res.data
})

const slice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => { s.status = 'loading' })
    b.addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
    b.addCase(fetchProducts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
  },
})

export default slice.reducer
