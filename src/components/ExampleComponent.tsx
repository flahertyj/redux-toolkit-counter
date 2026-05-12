import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { setText } from '../store/slices/exampleSlice'

export default function ExampleComponent() {
  const dispatch = useAppDispatch()
  const { text } = useAppSelector((s) => s.example)
  const [localText, setLocalText] = useState(text)

  return (
    <>
      <input
        type="text"
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && dispatch(setText((e.target as HTMLInputElement).value))}
      />
      <div>Text from store is: {text}</div>
    </>
  )
}
