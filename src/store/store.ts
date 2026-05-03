import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import todosReducer from './slices/todosSlice'
import usersReducer from './slices/usersSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    users: usersReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch