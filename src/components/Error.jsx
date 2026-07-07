import React from 'react'

const Error = ({fetchProducts}) => {
  return (
    <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Failed to load products</h2>
            <p className="error-msg">{error}</p>
            <button className="retry-btn" onClick={fetchProducts}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-3.54" />
              </svg>
              Try Again
            </button>
          </div>
  )
}

export default Error
