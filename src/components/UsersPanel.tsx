import { useAppDispatch, useAppSelector } from '../hooks'
import { addUser, removeUser, toggleRole } from '../store/slices/usersSlice'
import styles from './Panel.module.css'

const NAMES = ['Carol', 'Dan', 'Eve', 'Frank', 'Grace', 'Hiro', 'Ivy', 'Jack']
const COLORS = [
  { bg: '#1a3a5c', fg: '#7eb8f7' },
  { bg: '#1a3a2a', fg: '#5ecfa0' },
  { bg: '#3a1a1a', fg: '#f7a07e' },
  { bg: '#2a1a3a', fg: '#c07ef7' },
]
let nameIdx = 0

export default function UsersPanel() {
  const dispatch = useAppDispatch()
  const list = useAppSelector((s) => s.users.list)

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.label}>users in store</p>
        <div className={styles.userGrid}>
          {list.map((u, i) => {
            const c = COLORS[i % COLORS.length]
            return (
              <div key={u.id} className={styles.userCard}>
                <div className={styles.avatar} style={{ background: c.bg, color: c.fg }}>
                  {u.name[0]}
                </div>
                <p className={styles.userName}>{u.name}</p>
                <p className={styles.userRole}>{u.role}</p>
                <span className={`${styles.badge} ${u.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}`}>
                  {u.role}
                </span>
              </div>
            )
          })}
        </div>
        <div className={styles.btnRow} style={{ marginTop: '1rem' }}>
          <button className={styles.btn} onClick={() =>
            dispatch(addUser({ id: Date.now(), name: NAMES[nameIdx++ % NAMES.length], role: Math.random() > 0.5 ? 'admin' : 'user' }))
          }>add random user</button>
          <button className={styles.danger} onClick={() => {
            if (list.length) dispatch(removeUser(list[list.length - 1].id))
          }}>remove last</button>
          <button className={styles.btn} onClick={() => dispatch(toggleRole(0))}>toggle first role</button>
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>current state</p>
        <pre className={styles.stateBox}>{JSON.stringify({ list }, null, 2)}</pre>
      </div>
    </div>
  )
}