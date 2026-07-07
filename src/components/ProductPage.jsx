import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ProductCard, { SkeletonCard } from './ProductCard'
import ProductModal from './ProductModal'
import ProductGrid from './ProductGrid'
import Footer from './Footer'
import ProductStats from './ProductStats'
import { getCategories } from '../utils/getCategories'

/* ─── category helpers ─────────────────────────────────── */
const ALL = 'All'

/** Title-cases a raw API category string, e.g. "men's clothing" → "Men's Clothing" */

const ProductPage = () => {
  /* ── existing React logic (untouched) ── */
  // Data fetching
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchProducts() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  /* ── UI-only state ─────────────────────────────────────── */
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [wishlisted, setWishlisted] = useState(new Set())
  const [cartCount, setCartCount] = useState(0)

  const toggleWish = (id) =>
    setWishlisted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  /* ── derived data ──────────────────────────────────────── */
  // Build a Map<rawCategory, displayLabel> from the fetched products.
  // Step 1 – collect unique raw strings via a Set.
  // Step 2 – map each unique value to a human-readable label.
  const { categories, categoryLabels } = getCategories(products, ALL);

  const filtered = products
    .filter(p => activeCategory === ALL || p.category === activeCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
      return 0
    })

  /* ── render ─────────────────────────────────────────────── */
  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* ─ Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-badge">✦ Premium Collection 2025</div>
        <h1 className="hero-title">
          Discover Products<br />You'll Love
        </h1>
        <p className="hero-sub">
          Explore our curated catalog powered by the Fake Store API.
          Quality goods, real prices.
        </p>
      </section>

      {/* ─ Filters ──────────────────────────────────────────── */}
      <div className="filters-bar">
        {/* Search */}
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category chips */}
        <div className="filter-chips">
          {categories.map(cat => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === ALL ? 'All' : categoryLabels.get(cat) ?? cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* ─ Stats ────────────────────────────────────────────── */}
      {!loading && !error && (
        <ProductStats
        wishlisted = {wishlisted}
        categoryLabels = {categoryLabels}
        filtered = {filtered}/>
      )}

      {/* ─ Products Section ─────────────────────────────────── */}
      <main className="products-section">
        {!loading && !error && (
          <div className="section-header">
            <h2 className="section-title">
              {activeCategory === ALL ? 'All Products' : categoryLabels.get(activeCategory) ?? activeCategory}
            </h2>
            <span className="section-count">{filtered.length} items</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <Error
          fetchProducts = {fetchProducts}/>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <ProductGrid
            filtered={filtered}
            setCartCount={setCartCount}
            wishlisted={wishlisted}
            setSelectedProduct={setSelectedProduct}
            toggleWish={toggleWish} />
        )}
      </main>

      {/* ─ Footer ───────────────────────────────────────────── */}
      <Footer/>

      {/* ─ Product Modal ─────────────────────────────────────── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          wishlisted={wishlisted.has(selectedProduct.id)}
          onToggleWish={toggleWish}
        />
      )}
    </>
  )
}

export default ProductPage
