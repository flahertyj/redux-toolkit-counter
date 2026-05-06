import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addOneHundred, decrementOneThousand, increment, decrement, reset, setStep } from '../store/slices/counterSlice'
import styles from './Panel.module.css'
import { TestContext } from '../App'

export default function CounterPanel() {
  const dispatch = useAppDispatch()
  const { value, step } = useAppSelector((s) => s.counter)
  const ctx = useContext(TestContext);

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.label}>value</p>
        <p className={styles.bigNum}>{value}</p>
        <p className={styles.sub}>step: {step}</p>
        <div className={styles.btnRow}>
          <button className={styles.success} onClick={() => { 
              dispatch(increment());
              ctx.setTest('abc123');
            }}
          >
            + increment
          </button>
          <button className={styles.danger} onClick={() => {
            dispatch(decrement());
            ctx.setTest('backwards321');
          }}>− decrement</button>
          <button className={styles.btn} onClick={() => dispatch(reset())}>reset</button>
          <button className={styles.btn} onClick={() => dispatch(addOneHundred())}>add 100</button>
          <button className={styles.btn} onClick={() => dispatch(decrementOneThousand())}>decrement 1,000</button>
        </div>
        <div className={styles.sliderRow}>
          <p className={styles.label}>set step</p>
          <input
            type="range" min={1} max={10} value={step}
            onChange={(e) => dispatch(setStep(Number(e.target.value)))}
          />
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>current state</p>
        <pre className={styles.stateBox}>{JSON.stringify({ value, step }, null, 2)}</pre>
      </div>
    </div>
  )
}
