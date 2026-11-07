import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import MainSection from './MainSection'
import Products from './pages/Product/Products'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/shop" element={<Products />} />
      </Routes>

      <footer>
        <h2>SAMEENERGY</h2>
        <p>YOUR DREAMS. OUR ENERGY.</p>
        <small>EST. 2024</small>
      </footer>
    </BrowserRouter>
  )
}

export default App
