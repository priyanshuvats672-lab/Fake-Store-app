import React from 'react'

export const ProductFilter = () => {
  const filtered = products
    .filter(p => activeCategory === ALL || p.category === activeCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
      return 0
    })
}

export default ProductFilter
