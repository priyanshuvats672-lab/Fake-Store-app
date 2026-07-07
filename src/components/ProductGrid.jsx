import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({setCartCount , filtered , wishlisted , setSelectedProduct , toggleWish}) => {
    return (

        <div className="products-grid">
            {filtered.length === 0 ? (
                <div className="error-state" style={{ gridColumn: '1/-1' }}>
                    <div className="error-icon">🔍</div>
                    <h2 className="error-title">No products found</h2>
                    <p className="error-msg">Try a different search term or category.</p>
                </div>
            ) : (
                filtered.map(product => (
                    <ProductCard
                        setCartCount={setCartCount}
                        key={product.id}
                        product={product}
                        onOpen={setSelectedProduct}
                        wishlisted={wishlisted.has(product.id)}
                        onToggleWish={toggleWish}
                    />
                ))
            )}
        </div>

    )
}

export default ProductGrid
