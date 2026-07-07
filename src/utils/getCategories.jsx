const toLabel = (str) =>
  str.replace(/\b\w/g, (ch) => ch.toUpperCase())

export function getCategories(products, ALL) {
  const uniqueCategories = [...new Set(
    products.map(p => p.category)
  )];
  const categoryLabels = new Map(
    uniqueCategories.map((cat) => [cat, toLabel(cat)])
  );

  return {
    categories: [ALL, ...categoryLabels.keys()],
    categoryLabels,
  }
}