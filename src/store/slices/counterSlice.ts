import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  step: number
}

const initialState: CounterState = { value: 0, step: 1 }

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += state.step },
    decrement: (state) => { state.value -= state.step },
    reset: (state) => { state.value = 0 },
    addOneHundred: (state) => { state.value += 100 },
    decrementOneThousand: (state) => { state.value -= 1000 },
    setStep: (state, action: PayloadAction<number>) => { state.step = action.payload },
  },
})

export const { addOneHundred, decrementOneThousand, increment, decrement, reset, setStep } = counterSlice.actions
export default counterSlice.reducer