import { useAppDispatch, useAppSelector } from '../hooks'
import { addToCart, removeFromCart, clearCart, Product } from '../store/slices/cartSlice'
import styles from './Panel.module.css'

const PRODUCTS: Product[] = [
  { id: 1, name: 'Redux Handbook', price: 29 },
  { id: 2, name: 'React Deep Dive', price: 39 },
  { id: 3, name: 'TS Mastery', price: 49 },
]

export default function CartPanel() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.label}>products</p>
        {PRODUCTS.map((p) => (
          <div key={p.id} className={styles.cartRow}>
            <span>{p.name}</span>
            <span className={styles.price}>${p.price}</span>
            <button className={styles.success} onClick={() => dispatch(addToCart(p))}>add</button>
          </div>
        ))}
        <p className={styles.label} style={{ marginTop: '1rem' }}>cart</p>
        {items.length === 0 && <p className={styles.empty}>cart is empty</p>}
        {items.map((i) => (
          <div key={i.id} className={styles.cartRow}>
            <span>{i.name} ×{i.qty}</span>
            <span className={styles.price}>${i.price * i.qty}</span>
            <span className={styles.del} onClick={() => dispatch(removeFromCart(i.id))}>×</span>
          </div>
        ))}
        {items.length > 0 && <p className={styles.total}>total: ${total}</p>}
        <div className={styles.btnRow} style={{ marginTop: '0.75rem' }}>
          <button className={styles.danger} onClick={() => dispatch(clearCart())}>clear cart</button>
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>current state</p>
        <pre className={styles.stateBox}>{JSON.stringify({ items }, null, 2)}</pre>
      </div>
    </div>
  )
}