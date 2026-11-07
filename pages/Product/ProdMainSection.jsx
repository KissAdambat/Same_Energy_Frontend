import { useState, useEffect } from 'react'

export default function ProdMainSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://localhost:7181/products/GetAllProducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hiba a termékek betöltésekor')
        }
        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Betöltés...</p>
  if (error) return <p>{error}</p>

  return (
    <div id="shop" className="row">
      {products.map((product) => (
        <div className="card" style={{ width: '18rem' }} key={product.id}>
          <img src={product.image} className="card-img-top" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.stock}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text">{product.price}</p>
            <a href="#" className="btn btn-primary">Menj az oldalára</a>
          </div>
        </div>
      ))}
    </div>
  )
}