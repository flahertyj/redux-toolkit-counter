import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  name: string,
  color: 'red' | 'orange' | 'blue' | 'purple'
}

const initialState: UserInfo[] = []

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    AddUser: (state, action: PayloadAction<UserInfo>) => {
      console.log("AddUser", state, action.payload)
      state.push(action.payload);
    },
    RemoveUser: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(u => u.name === action.payload );

      if (index >= 0) {
        return state.filter(u => u.name !== action.payload);
      }

      return state;
    },
  },
})

export const { AddUser, RemoveUser } = exampleSlice.actions
export default exampleSlice.reducer