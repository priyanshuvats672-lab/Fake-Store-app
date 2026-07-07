import React from 'react'

const Navbar = ({ cartCount = 0 }) => {
  return (
    <nav className="navbar">
      {/* Brand */}
      <a href="/" className="navbar-brand">
        <div className="brand-icon">🛍️</div>
        <span className="nav-text">Fake<span>Store</span></span>
      </a>

      {/* Actions */}
      <div className="navbar-actions">
        <button className="nav-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Sign in
        </button>

        <button className="cart-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
