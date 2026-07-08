export const renderStars = (rating = 0) => {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(empty)
}

export const fakeOldPrice = (price) =>
  (price * (1 + 0.2 + Math.random() * 0.2)).toFixed(2)


export const cardLabel = (id) => {
  if (id % 5 === 0) return 'hot'
  if (id % 3 === 0) return 'new'
  return null
}

/** Skeleton card shown while loading */
export const SkeletonCard = () => (
  <div className="skeleton">
    <div className="skeleton-img" />
    <div className="skeleton-body">
      <div className="skeleton-line sm" />
      <div className="skeleton-line xl" />
      <div className="skeleton-line md" />
      <div className="skeleton-line lg" />
    </div>
  </div>
)

/** Single product card */
const ProductCard = ({ product, onOpen, wishlisted, onToggleWish , setCartCount }) => {
  const { id, title, price, category, image, rating } = product
  const oldPrice = fakeOldPrice(price)
  const label    = cardLabel(id)

  const handleClick = ()=>{
    setCartCount(a => a + 1)
  }

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${(id % 8) * 50}ms` }}
      onClick={() => onOpen(product)}
    >
      {/* Badge */}
      {label === 'new' && <span className="card-badge badge-new">New</span>}
      {label === 'hot' && <span className="card-badge badge-hot">🔥 Hot</span>}

      {/* Wishlist */}
      <button
        className={`card-wishlist ${wishlisted ? 'active' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggleWish(id) }}
        aria-label="Toggle wishlist"
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      {/* Image */}
      <div className="card-image-wrap">
        <img src={image} alt={title} loading="lazy" />
      </div>

      {/* Body */}
      <div className="card-body">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-rating">
          <span className="stars">{renderStars(rating?.rate ?? 0)}</span>
          <span className="rating-text">{rating?.rate} ({rating?.count})</span>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div>
          <span className="card-price">${price}</span>
          <span className="card-price-old">${oldPrice}</span>
        </div>
        <button
          className="add-cart-btn"
          onClick={(e) => { e.stopPropagation() ; handleClick() }}
          aria-label="Add to cart"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add
        </button>
      </div>
    </article>
  )
}

export default ProductCard
