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

  return (
    <main className="products-page">
      {loading ? (
        <p className="products-message">Betöltés...</p>
      ) : error ? (
        <p className="products-message">{error}</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} className="product-card__image" alt={product.name} />
              <div className="product-card__body">
                <h2 className="product-card__title">{product.name}</h2>
                <p className="product-card__stock">{product.stock}</p>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">{product.price}</p>
                <a href="#" className="product-card__link">Menj az oldalára</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}