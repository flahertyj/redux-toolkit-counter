import { createContext, useState } from 'react'
import CounterPanel from './components/CounterPanel'
import TodosPanel from './components/TodosPanel'
import UsersPanel from './components/UsersPanel'
import CartPanel from './components/CartPanel'
import './App.css'

type Tab = 'counter' | 'todos' | 'users' | 'cart'

const TABS: { id: Tab; label: string }[] = [
  { id: 'counter', label: 'counter slice' },
  { id: 'todos',   label: 'todo slice' },
  { id: 'users',   label: 'users slice' },
  { id: 'cart',    label: 'cart slice' },
]

export const TestContext = createContext({ test: '', setTest: (input: string) => {}});

export default function App() {
  const [tab, setTab] = useState<Tab>('counter');
  const [test, setTest] = useState('test123');

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Redux Toolkit Sandbox</h1>
        <p className="subtitle">@reduxjs/toolkit · react-redux · TypeScript</p>
      </header>
      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="main">
        {tab === 'counter' && <TestContext.Provider value={{ test, setTest }}><CounterPanel /></TestContext.Provider>}
        {tab === 'todos'   && <TodosPanel />}
        {tab === 'users'   && <UsersPanel />}
        {tab === 'cart'    && <CartPanel />}
      </main>
    </div>
  )
}