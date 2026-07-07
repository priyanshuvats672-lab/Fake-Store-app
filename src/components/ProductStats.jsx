import React from 'react'

const ProductStats = ({filtered , categoryLabels , wishlisted}) => {
    const avgPrice = filtered.length
    ? (filtered.reduce((s, p) => s + p.price, 0) / filtered.length).toFixed(0)
    : 0
    return (
        <div className="stats-row">
            <div className="stat-card">
                <span className="stat-value">{filtered.length}</span>
                <span className="stat-label">Total Products</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{categoryLabels.size}</span>
                <span className="stat-label">Categories</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">${avgPrice}</span>
                <span className="stat-label">Avg. Price</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{wishlisted.size}</span>
                <span className="stat-label">Wishlisted</span>
            </div>
        </div>
    )
}

export default ProductStats
