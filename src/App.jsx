import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import Articles from './pages/Articles'

function App() {

  return (
    <div className='App'>
      <Header />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  )
}

export default App
