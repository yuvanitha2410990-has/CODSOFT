import { createSlice } from '@reduxjs/toolkit'

const saved = JSON.parse(localStorage.getItem('cart')) || { items: [] }

const slice = createSlice({
  name: 'cart',
  initialState: saved,
  reducers: {
    addItem(state, action) {
      const p = action.payload
      const found = state.items.find(i => i.productId === p.productId)
      if (found) found.quantity += p.quantity
      else state.items.push(p)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateQty(state, action) {
      const { productId, quantity } = action.payload
      const it = state.items.find(i => i.productId === productId)
      if (it) it.quantity = quantity
      localStorage.setItem('cart', JSON.stringify(state))
    },
    clearCart(state) {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }
})

export const { addItem, removeItem, updateQty, clearCart } = slice.actions
export default slice.reducer
