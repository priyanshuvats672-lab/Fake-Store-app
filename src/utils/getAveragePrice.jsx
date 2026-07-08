export function getAveragePrice(filtered){
    const avgPrice = filtered.length
    ? (filtered.reduce((s, p) => s + p.price, 0) / filtered.length).toFixed(0)
    : 0
    return avgPrice;
}
  

