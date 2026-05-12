import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExampleState {
  text: string
}

const initialState: ExampleState = { text: '' }

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => { state.text = action.payload },
  },
})

export const { setText } = exampleSlice.actions
export default exampleSlice.reducer