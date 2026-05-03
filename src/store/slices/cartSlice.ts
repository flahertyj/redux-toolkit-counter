import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  price: number
}

export interface CartItem extends Product {
  qty: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.qty++
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearCart: (state) => { state.items = [] },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer