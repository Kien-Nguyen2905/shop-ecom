export const SORT_OPTIONS = [
  {
    name: 'Price: Low to High',
    value: 'priceAsc',
    sortField: 'price',
    sortOrder: 1,
  },
  {
    name: 'Price: High to Low',
    value: 'priceDesc',
    sortField: 'price',
    sortOrder: -1,
  },
  {
    name: 'Rate: Low to High',
    value: 'rateAsc',
    sortField: 'rate',
    sortOrder: 1,
  },
  {
    name: 'Rate: High to Low',
    value: 'rateDesc',
    sortField: 'rate',
    sortOrder: -1,
  },
  {
    name: 'Newest First',
    value: 'newest',
    sortField: 'created_at',
    sortOrder: -1,
  },
];
