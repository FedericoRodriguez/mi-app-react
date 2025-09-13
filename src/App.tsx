import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import UserDetail from './pages/UserDetail'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'
import './index.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='usuario/:id' element={<UserDetail />} />
          <Route path='search' element={<SearchResults />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
