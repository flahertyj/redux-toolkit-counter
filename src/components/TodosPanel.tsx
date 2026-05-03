import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addTodo, toggleTodo, removeTodo } from '../store/slices/todosSlice'
import styles from './Panel.module.css'

type Filter = 'all' | 'active' | 'done'

export default function TodosPanel() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.todos.items)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = items.filter((t) =>
    filter === 'done' ? t.done : filter === 'active' ? !t.done : true
  )

  const handleAdd = () => {
    if (text.trim()) { dispatch(addTodo(text.trim())); setText('') }
  }

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.label}>dispatch addTodo</p>
        <div className={styles.inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="new todo..."
            className={styles.input}
          />
          <button className={styles.btn} onClick={handleAdd}>add</button>
        </div>
        <ul className={styles.todoList}>
          {filtered.map((t) => (
            <li key={t.id} className={`${styles.todoItem} ${t.done ? styles.done : ''}`}>
              <div className={`${styles.check} ${t.done ? styles.checked : ''}`}
                onClick={() => dispatch(toggleTodo(t.id))}>
                {t.done ? '✓' : ''}
              </div>
              <span>{t.text}</span>
              <span className={styles.del} onClick={() => dispatch(removeTodo(t.id))}>×</span>
            </li>
          ))}
        </ul>
        <div className={styles.filterRow}>
          {(['all', 'active', 'done'] as Filter[]).map((f) => (
            <button key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>current state</p>
        <pre className={styles.stateBox}>{JSON.stringify({ items }, null, 2)}</pre>
      </div>
    </div>
  )
}