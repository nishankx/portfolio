import React from 'react'
import PortfolioPage from './pages/portfolioPages/PortfolioPage'
import { Route, Routes } from 'react-router'
import BlogsPage from './pages/blogPages/BlogsPage'
import BlogDetailPage from './pages/blogPages/BlogDetailPage'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="/admin/write" element={<BlogsPage />} />
      </Routes>
    </div>
  )
}

export default App
