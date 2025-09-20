import { useState } from 'react';
import ProductFilter, { type FilterOptions } from '../ProductFilter';

export default function ProductFilterExample() {
  //todo: remove mock functionality
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 50000 },
    btuRange: { min: 0, max: 100000 },
    energyRating: [],
    inStock: false
  });

  const handleClearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 50000 },
      btuRange: { min: 0, max: 100000 },
      energyRating: [],
      inStock: false
    });
  };

  return (
    <div className="p-4 max-w-sm">
      <ProductFilter 
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}