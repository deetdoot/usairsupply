import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Snowflake, Zap } from "lucide-react";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onQuoteRequest?: (product: Product) => void;
}

export default function ProductCard({ product, onQuoteRequest }: ProductCardProps) {
  const [, setLocation] = useLocation();
  
  const handleQuoteClick = () => {
    console.log('Quote requested for product:', product.name);
    onQuoteRequest?.(product);
    
    // Add product to localStorage for persistent multi-product selection
    const productData = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      model: product.model,
      price: product.price,
      category: product.category,
      btu: product.btu,
      energyRating: product.energyRating
    };

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    
    // Check if product is already in the list
    const exists = existingProducts.some((p: any) => p.id === productData.id);
    
    if (!exists) {
      // Add new product to the list
      const updatedProducts = [...existingProducts, productData];
      localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
      console.log('Added product to quote. Total products:', updatedProducts.length);
    } else {
      console.log('Product already in quote');
    }
    
    // Navigate to quote page
    setLocation('/quote');
  };

  const getStockColor = (stock: string) => {
    switch (stock) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockText = (stock: string) => {
    switch (stock) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return stock;
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-300 h-full flex flex-col">
      {/* Product Image */}
      {product.imageUrl && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-2 left-2">
            <Badge className={getStockColor(product.inStock)} data-testid={`badge-stock-${product.id}`}>
              {getStockText(product.inStock)}
            </Badge>
          </div>
          {product.energyRating && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium" data-testid={`text-rating-${product.id}`}>
                  {product.energyRating}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        {!product.imageUrl && (
          <div className="flex justify-between items-start mb-2">
            <Badge className={getStockColor(product.inStock)} data-testid={`badge-stock-${product.id}`}>
              {getStockText(product.inStock)}
            </Badge>
            {product.energyRating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium" data-testid={`text-rating-${product.id}`}>
                  {product.energyRating}
                </span>
              </div>
            )}
          </div>
        )}
        
        <CardTitle className="text-lg leading-tight" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </CardTitle>
        <CardDescription data-testid={`text-product-brand-${product.id}`}>
          {product.brand} • Model: {product.model}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-3 mb-4">
          {product.description && (
            <p className="text-sm text-muted-foreground" data-testid={`text-description-${product.id}`}>
              {product.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {product.btu && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Snowflake className="h-4 w-4 mr-1" />
                <span data-testid={`text-btu-${product.id}`}>{product.btu.toLocaleString()} BTU</span>
              </div>
            )}
            {product.energyRating && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Zap className="h-4 w-4 mr-1" />
                <span data-testid={`text-energy-${product.id}`}>{product.energyRating}</span>
              </div>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Key Features:</p>
              <ul className="text-sm text-muted-foreground">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} data-testid={`text-feature-${product.id}-${index}`}>
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {product.price && (
            <div className="text-right">
              <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
                ${parseFloat(product.price).toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleQuoteClick}
              data-testid={`button-quote-${product.id}`}
            >
              Get Quote
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => console.log('View details for:', product.name)}
              data-testid={`button-details-${product.id}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}