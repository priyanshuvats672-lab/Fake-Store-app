import { getAveragePrice } from '../utils/getAveragePrice'

const ProductStats = ({filtered , categoryLabels , wishlisted}) => {
    const avgPrice = getAveragePrice(filtered)
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
