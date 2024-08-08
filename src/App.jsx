import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Topics from './pages/Topics'
import { useState } from 'react'

function App() {
  const [ urlQuery, setUrlQuery] = useState({}) 

  return (
    <div className='App'>
      <Header setUrlQuery={setUrlQuery}/>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics setUrlQuery={setUrlQuery}/>} />
        <Route path="/articles" element={<Articles urlQuery={urlQuery} setUrlQuery={setUrlQuery}/>} />
        <Route path="/articles/:article_id" element={<Article />}/>
      </Routes>
    </div>
  )
}

export default App
