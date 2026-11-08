// src/pages/Product/ProdMainSection.jsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const ALL_PRODUCTS_URL = 'https://localhost:7181/products/GetAllProducts'
const SEARCH_PRODUCTS_URL = 'https://localhost:7181/products/GetProductsByName/'

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('hu')
    .trim()
}

function getProductBrand(product) {
  const brand = product.brand ?? product.brandName ?? product.brand_name
  return typeof brand === 'object' && brand !== null ? brand.name ?? '' : brand ?? ''
}

export default function ProdMainSection() {
  const [searchParams] = useSearchParams()
  const requestedBrand = searchParams.get('brand')

  const [searchText, setSearchText] = useState('') 
  const [query, setQuery] = useState('')           
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setQuery(searchText.trim()), 300)
    return () => clearTimeout(timeout)
  }, [searchText])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const url = query
      ? `${SEARCH_PRODUCTS_URL}${encodeURIComponent(query)}`
      : ALL_PRODUCTS_URL

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Product request failed: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('The product response is not a list.')
        }
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.error('Could not load products:', err)
        setError('Products could not be loaded. Please try again later.')
        setLoading(false)
      })

    // ha új keresés indul, a régit megszakítja (a régi activeRequest.abort())
    return () => controller.abort()
  }, [query])

  const normalizedQuery = normalize(query)

  const filteredProducts = products.filter((product) => {
    const brand = getProductBrand(product)
    const matchesBrand =
      !requestedBrand || normalize(brand) === normalize(requestedBrand)
    const searchableText = [
      product.name,
      brand,
      product.description,
      product.price,
    ].join(' ')

    return matchesBrand && normalize(searchableText).includes(normalizedQuery)
  })

  return (
    <main className="products-page">
      {requestedBrand && <p id="active-brand">Brand: {requestedBrand}</p>}

      <label className="shop-search-label" htmlFor="product-search">
        PRODUCT SEARCH
      </label>
      <input
        id="product-search"
        className="shop-search"
        type="search"
        placeholder="Search products..."
        autoComplete="off"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <p className="products-message">Betöltés...</p>
      ) : error ? (
        <p className="products-message">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="products-message">No matching products found.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img
                src={product.image}
                className="product-card__image"
                alt={product.name || 'Product'}
              />
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