import { useState } from 'react'

import styles from './ExampleComponent.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setText } from '../store/slices/exampleSlice'

export default function ExampleComponent() {
  const dispatch = useAppDispatch()
  const { text } = useAppSelector((s) => s.example)
  const [localText, setLocalText] = useState(text)

  return (
    <div className={styles.example}>
      <input
        type="text"
        className={styles.inputBox}
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && dispatch(setText((e.target as HTMLInputElement).value))}
      />
      <div className={styles.textBox}>Text from store is: {text}</div>
    </div>
  )
}
