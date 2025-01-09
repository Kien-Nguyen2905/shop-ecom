export const SORT_OPTIONS = [
  {
    label: 'Price: Low to High',
    value: 'priceAsc',
    sortField: 'price',
    sortOrder: 1,
  },
  {
    label: 'Price: High to Low',
    value: 'priceDesc',
    sortField: 'price',
    sortOrder: -1,
  },
  {
    label: 'Rate: Low to High',
    value: 'rateAsc',
    sortField: 'rate',
    sortOrder: 1,
  },
  {
    label: 'Rate: High to Low',
    value: 'rateDesc',
    sortField: 'rate',
    sortOrder: -1,
  },
  {
    label: 'Newest First',
    value: 'newest',
    sortField: 'created_at',
    sortOrder: -1,
  },
];
