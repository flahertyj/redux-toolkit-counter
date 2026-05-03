import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
  role: 'admin' | 'user'
}

interface UsersState {
  list: User[]
}

const initialState: UsersState = {
  list: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
  ],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((u) => u.id !== action.payload)
    },
    toggleRole: (state, action: PayloadAction<number>) => {
      const user = state.list[action.payload]
      if (user) user.role = user.role === 'admin' ? 'user' : 'admin'
    },
  },
})

export const { addUser, removeUser, toggleRole } = usersSlice.actions
export default usersSlice.reducer