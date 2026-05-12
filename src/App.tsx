import './App.css'

import ExampleComponent from './components/ExampleComponent';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Keeper Interview</h1>
        <p className="subtitle">@reduxjs/toolkit · react-redux · TypeScript</p>
      </header>

      <main className="main">
        <ExampleComponent />
      </main>
    </div>
  )
}