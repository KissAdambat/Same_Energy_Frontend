import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import MainSection from './MainSection'
import Products from './pages/Product/products.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/shop" element={<Products />} />
          </Routes>
        </div>

        <footer>
          <h2>SAMEENERGY</h2>
          <p>YOUR DREAMS. OUR ENERGY.</p>
          <small>EST. 2024</small>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
