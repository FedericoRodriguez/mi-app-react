import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import UserDetail from './pages/UserDetail'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='usuario/:id' element={<UserDetail />} />
      </Route>
    </Routes>
  )
}

export default App
