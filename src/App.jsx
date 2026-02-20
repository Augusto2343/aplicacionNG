import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SeccionTrabajos from './components/SeccionTrabajos'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SeccionTrabajos/>
    </>
  )
}

export default App
