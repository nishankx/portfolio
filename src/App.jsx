import React from 'react'
import PortfolioPage from './pages/portfolioPages/PortfolioPage'
import { Route, Routes } from 'react-router'
import BlogsPage from './pages/blogPages/BlogsPage'

const App = () => {
  return (
    <div > 
      <Routes>
        <Route path ="/" element={<PortfolioPage />} />
        <Route path ="/blogs" element={<BlogsPage/>} />
      </Routes>
    </div>
  )
}

export default App
