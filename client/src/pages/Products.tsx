import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilter, { type FilterOptions } from "@/components/ProductFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, Filter } from "lucide-react";
import type { Product } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Products() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 50000 },
    btuRange: { min: 0, max: 100000 },
    energyRating: [],
    inStock: false
  });

  // Derive filter options from products data
  const availableCategories = React.useMemo(() => {
    const categories = new Set(products?.map(p => p.category) || []);
    return Array.from(categories).sort();
  }, [products]);

  const availableBrands = React.useMemo(() => {
    const brands = new Set(products?.map(p => p.brand) || []);
    return Array.from(brands).sort();
  }, [products]);

  const availableEnergyRatings = React.useMemo(() => {
    const ratings = new Set(products?.map(p => p.energyRating).filter(Boolean) || []);
    return Array.from(ratings).sort();
  }, [products]);

  // Update filtered products when products data changes
  React.useEffect(() => {
    if (products?.length > 0) {
      setFilteredProducts(products);
      applyFilters(filters, searchTerm, sortBy);
    }
  }, [products]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm, sortBy);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: "",
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 50000 },
      btuRange: { min: 0, max: 100000 },
      energyRating: [],
      inStock: false
    };
    setFilters(clearedFilters);
    setSearchTerm("");
    applyFilters(clearedFilters, "", sortBy);
  };

  const applyFilters = (currentFilters: FilterOptions, search: string, sort: string) => {
    let filtered = [...(products || [])];

    // Apply search
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.model.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filter search
    if (currentFilters.search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        product.model.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (currentFilters.categories.length > 0) {
      filtered = filtered.filter(product => currentFilters.categories.includes(product.category));
    }

    // Apply brand filter
    if (currentFilters.brands.length > 0) {
      filtered = filtered.filter(product => currentFilters.brands.includes(product.brand));
    }

    // Apply price range filter
    filtered = filtered.filter(product => {
      if (!product.price) return true;
      const price = parseFloat(product.price);
      return price >= currentFilters.priceRange.min && price <= currentFilters.priceRange.max;
    });

    // Apply BTU range filter
    filtered = filtered.filter(product => {
      if (!product.btu) return true;
      return product.btu >= currentFilters.btuRange.min && product.btu <= currentFilters.btuRange.max;
    });

    // Apply energy rating filter
    if (currentFilters.energyRating.length > 0) {
      filtered = filtered.filter(product => 
        product.energyRating && currentFilters.energyRating.includes(product.energyRating)
      );
    }

    // Apply in stock filter
    if (currentFilters.inStock) {
      filtered = filtered.filter(product => product.inStock === "in_stock");
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "price-low":
          return (parseFloat(a.price || "0")) - (parseFloat(b.price || "0"));
        case "price-high":
          return (parseFloat(b.price || "0")) - (parseFloat(a.price || "0"));
        case "btu":
          return (b.btu || 0) - (a.btu || 0);
        case "brand":
          return a.brand.localeCompare(b.brand);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters(filters, value, sortBy);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(filters, searchTerm, value);
  };

  const handleQuoteRequest = (product: Product) => {
    console.log('Quote requested for product:', product.name);
    // In real app, this would navigate to quote form with product pre-filled
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            HVAC Products & Equipment
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our comprehensive selection of high-quality HVAC equipment from top manufacturers.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, brand, or model..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                data-testid="input-product-search"
              />
            </div>
            
            {/* Sort and View Controls */}
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="btu">BTU Rating</SelectItem>
                  <SelectItem value="brand">Brand</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden"
                data-testid="button-mobile-filters"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground" data-testid="text-results-count">
              Showing {filteredProducts.length} of {products?.length || 0} products
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <ProductFilter
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
              availableEnergyRatings={availableEnergyRatings}
            />
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-8">
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more products.
                  </p>
                  <Button onClick={handleClearFilters} data-testid="button-clear-all-filters">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuoteRequest={handleQuoteRequest}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}