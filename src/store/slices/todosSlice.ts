import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: number
  text: string
  done: boolean
}

interface TodosState {
  items: Todo[]
}

let nextId = 3

const initialState: TodosState = {
  items: [
    { id: 1, text: 'Learn Redux Toolkit', done: true },
    { id: 2, text: 'Build a slice', done: false },
  ],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({ id: nextId++, text: action.payload, done: false })
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.done = !todo.done
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer