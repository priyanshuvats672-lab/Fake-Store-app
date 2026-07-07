import React from 'react'
import { renderStars, fakeOldPrice } from './ProductCard'

const ProductModal = ({ product, onClose, wishlisted, onToggleWish }) => {
  if (!product) return null

  const { id, title, price, description, category, image, rating } = product
  const oldPrice   = fakeOldPrice(price)
  const discount   = Math.round(((oldPrice - price) / oldPrice) * 100)

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <span className="modal-category">{category}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Image */}
          <div className="modal-image-wrap">
            <img src={image} alt={title} />
          </div>

          {/* Info */}
          <div className="modal-info">
            <h2 className="modal-title">{title}</h2>

            {/* Rating */}
            <div className="modal-rating">
              <span className="modal-stars">{renderStars(rating?.rate ?? 0)}</span>
              <span className="modal-rating-text">
                {rating?.rate} out of 5 &middot; {rating?.count} reviews
              </span>
            </div>

            {/* Price */}
            <div className="modal-price-row">
              <span className="modal-price">${price}</span>
              <span className="modal-price-old">${oldPrice}</span>
              <span className="modal-discount">-{discount}%</span>
            </div>

            {/* Description */}
            <p className="modal-desc">{description}</p>

            {/* Actions */}
            <div className="modal-actions">
              <button className="modal-add-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
              <button
                className="modal-wishlist-btn"
                onClick={() => onToggleWish(id)}
              >
                {wishlisted ? '❤️ Remove from Wishlist' : '🤍 Save to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
