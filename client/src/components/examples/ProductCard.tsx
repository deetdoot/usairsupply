import ProductCard from '../ProductCard';
import type { Product } from '@shared/schema';

export default function ProductCardExample() {
  //todo: remove mock functionality
  const mockProduct: Product = {
    id: "1",
    name: "High-Efficiency Central Air Conditioner",
    category: "Air Conditioning",
    brand: "Carrier",
    model: "24ACC636A003",
    price: "3299.99",
    btu: 36000,
    energyRating: "16 SEER",
    features: [
      "Variable-speed compressor",
      "Smart thermostat compatible",
      "Quiet operation",
      "10-year warranty"
    ],
    description: "Energy-efficient central air conditioning system with advanced variable-speed technology for optimal comfort and efficiency.",
    imageUrl: null,
    inStock: "in_stock"
  };

  return (
    <div className="p-4 max-w-sm">
      <ProductCard 
        product={mockProduct} 
        onQuoteRequest={(product) => console.log('Quote requested for:', product.name)}
      />
    </div>
  );
}