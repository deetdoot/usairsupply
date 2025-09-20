import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

export interface FilterOptions {
  search: string;
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  btuRange: { min: number; max: number };
  energyRating: string[];
  inStock: boolean;
}

interface ProductFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function ProductFilter({ filters, onFiltersChange, onClearFilters }: ProductFilterProps) {
  const categories = ["Air Conditioning", "Heating", "Heat Pumps", "Ductwork", "Thermostats", "Air Quality"];
  const brands = ["Carrier", "Trane", "Lennox", "Goodman", "Rheem", "York", "American Standard"];
  const energyRatings = ["13 SEER", "14 SEER", "15 SEER", "16 SEER", "18 SEER", "20+ SEER"];

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    updateFilters({ brands: newBrands });
  };

  const toggleEnergyRating = (rating: string) => {
    const newRatings = filters.energyRating.includes(rating)
      ? filters.energyRating.filter(r => r !== rating)
      : [...filters.energyRating, rating];
    updateFilters({ energyRating: newRatings });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.energyRating.length > 0) count++;
    if (filters.inStock) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 50000) count++;
    if (filters.btuRange.min > 0 || filters.btuRange.max < 100000) count++;
    return count;
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" data-testid="badge-filter-count">
                {getActiveFilterCount()}
              </Badge>
            )}
          </div>
          {getActiveFilterCount() > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              data-testid="button-clear-filters"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            placeholder="Search by name or model..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            data-testid="input-search"
          />
        </div>

        {/* In Stock Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
            data-testid="checkbox-in-stock"
          />
          <Label htmlFor="inStock" className="text-sm font-medium">
            In Stock Only
          </Label>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  data-testid={`checkbox-category-${category.toLowerCase().replace(' ', '-')}`}
                />
                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Brands</Label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                  data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min || ''}
                onChange={(e) => updateFilters({ 
                  priceRange: { ...filters.priceRange, min: parseInt(e.target.value) || 0 }
                })}
                data-testid="input-price-min"
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max === 50000 ? '' : filters.priceRange.max}
                onChange={(e) => updateFilters({ 
                  priceRange: { ...filters.priceRange, max: parseInt(e.target.value) || 50000 }
                })}
                data-testid="input-price-max"
              />
            </div>
          </div>
        </div>

        {/* BTU Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">BTU Range</Label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min BTU"
                value={filters.btuRange.min || ''}
                onChange={(e) => updateFilters({ 
                  btuRange: { ...filters.btuRange, min: parseInt(e.target.value) || 0 }
                })}
                data-testid="input-btu-min"
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max BTU"
                value={filters.btuRange.max === 100000 ? '' : filters.btuRange.max}
                onChange={(e) => updateFilters({ 
                  btuRange: { ...filters.btuRange, max: parseInt(e.target.value) || 100000 }
                })}
                data-testid="input-btu-max"
              />
            </div>
          </div>
        </div>

        {/* Energy Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Energy Rating (SEER)</Label>
          <div className="space-y-2">
            {energyRatings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.energyRating.includes(rating)}
                  onCheckedChange={() => toggleEnergyRating(rating)}
                  data-testid={`checkbox-rating-${rating.replace(/[^a-zA-Z0-9]/g, '-')}`}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}