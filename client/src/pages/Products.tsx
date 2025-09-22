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
import centralACImage from "@assets/generated_images/Central_AC_unit_product_2b1450d4.png";
import heatPumpImage from "@assets/generated_images/Heat_pump_unit_product_2bc7afc9.png";
import furnaceImage from "@assets/generated_images/Gas_furnace_unit_product_01b5caf5.png";
import bestcoldWallMountedImage from "@assets/generated_images/Bestcold_wall_mounted_AC_unit_a5621cd3.png";
import bestcoldCassetteImage from "@assets/generated_images/Bestcold_cassette_AC_unit_1d867241.png";
import bestcoldVRFImage from "@assets/generated_images/Bestcold_VRF_outdoor_unit_56a2a972.png";
import bestcoldAirHandlerImage from "@assets/generated_images/Bestcold_air_handler_unit_c8883b12.png";

export default function Products() {
  //todo: remove mock functionality
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Carrier 24ACC636A003 Performance Series Central Air Conditioner",
      category: "Air Conditioning",
      brand: "Carrier",
      model: "24ACC636A003",
      price: "3299.99",
      btu: 36000,
      energyRating: "16 SEER",
      features: ["Variable-speed compressor", "Smart thermostat compatible", "Quiet operation", "10-year warranty"],
      description: "High-efficiency central air conditioning system with advanced variable-speed technology.",
      imageUrl: centralACImage,
      inStock: "in_stock"
    },
    {
      id: "2", 
      name: "Trane XV20i TruComfort Variable Speed Heat Pump",
      category: "Heat Pumps",
      brand: "Trane",
      model: "XV20i",
      price: "4599.99",
      btu: 48000,
      energyRating: "20 SEER",
      features: ["Variable speed technology", "TruComfort technology", "All-weather operation", "12-year warranty"],
      description: "Premium variable speed heat pump with industry-leading efficiency and comfort control.",
      imageUrl: heatPumpImage,
      inStock: "in_stock"
    },
    {
      id: "3",
      name: "Lennox EL296V High-Efficiency Gas Furnace",
      category: "Heating", 
      brand: "Lennox",
      model: "EL296V",
      price: "2899.99",
      btu: 80000,
      energyRating: "96% AFUE",
      features: ["96% efficiency rating", "Variable-speed blower", "Two-stage heating", "20-year warranty"],
      description: "Ultra-high efficiency gas furnace with two-stage heating and variable-speed comfort.",
      imageUrl: furnaceImage,
      inStock: "low_stock"
    },
    {
      id: "4",
      name: "Goodman GSX14 Central Air Conditioner",
      category: "Air Conditioning",
      brand: "Goodman", 
      model: "GSX14",
      price: "2299.99",
      btu: 24000,
      energyRating: "14 SEER",
      features: ["Single-stage cooling", "R-410A refrigerant", "Durable construction", "10-year warranty"],
      description: "Reliable and affordable central air conditioning for budget-conscious homeowners.",
      imageUrl: centralACImage,
      inStock: "in_stock"
    },
    {
      id: "5",
      name: "Rheem Classic Plus Series Single Stage Heat Pump",
      category: "Heat Pumps",
      brand: "Rheem",
      model: "RP1424AJ1NA",
      price: "2799.99", 
      btu: 24000,
      energyRating: "14 SEER",
      features: ["Single-stage operation", "Scroll compressor", "Refrigerant R-410A", "10-year warranty"],
      description: "Dependable heat pump solution for year-round comfort and energy savings.",
      imageUrl: heatPumpImage,
      inStock: "in_stock"
    },
    {
      id: "6",
      name: "York YXV 20 SEER Variable Capacity Air Conditioner",
      category: "Air Conditioning",
      brand: "York",
      model: "YXV",
      price: "3899.99",
      btu: 36000, 
      energyRating: "20 SEER",
      features: ["Variable capacity", "Inverter technology", "Smart home ready", "12-year warranty"],
      description: "Premium variable capacity air conditioner with smart home integration capabilities.",
      imageUrl: centralACImage,
      inStock: "out_of_stock"
    },
    // Bestcold Multi-Split Systems
    {
      id: "7",
      name: "Bestcold Multi-Split Wall Mounted Unit 18K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "MS-WM-18K",
      price: "1899.99",
      btu: 18000,
      energyRating: "22 SEER2",
      features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
      description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
      imageUrl: bestcoldWallMountedImage,
      inStock: "in_stock"
    },
    {
      id: "8",
      name: "Bestcold Multi-Split Wall Mounted Unit 24K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "MS-WM-24K",
      price: "2299.99",
      btu: 24000,
      energyRating: "22 SEER2",
      features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
      description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
      imageUrl: bestcoldWallMountedImage,
      inStock: "in_stock"
    },
    {
      id: "9",
      name: "Bestcold Multi-Split Wall Mounted Unit 36K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "MS-WM-36K",
      price: "2799.99",
      btu: 36000,
      energyRating: "22 SEER2",
      features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
      description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
      imageUrl: bestcoldWallMountedImage,
      inStock: "in_stock"
    },
    {
      id: "10",
      name: "Bestcold Compact Cassette Unit 18K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "CC-18K",
      price: "2199.99",
      btu: 18000,
      energyRating: "22 SEER2",
      features: ["4-way airflow", "Compact design", "Ceiling mounted", "Multi-split compatible"],
      description: "Professional compact cassette unit for commercial applications with efficient 4-way air distribution.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    {
      id: "11",
      name: "Bestcold Compact Cassette Unit 24K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "CC-24K",
      price: "2599.99",
      btu: 24000,
      energyRating: "22 SEER2",
      features: ["4-way airflow", "Compact design", "Ceiling mounted", "Multi-split compatible"],
      description: "Professional compact cassette unit for commercial applications with efficient 4-way air distribution.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    {
      id: "12",
      name: "Bestcold Compact Cassette Unit 36K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "CC-36K",
      price: "3199.99",
      btu: 36000,
      energyRating: "22 SEER2",
      features: ["4-way airflow", "Compact design", "Ceiling mounted", "Multi-split compatible"],
      description: "Professional compact cassette unit for commercial applications with efficient 4-way air distribution.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    // Bestcold Air Handler & Compressor Units
    {
      id: "13",
      name: "Bestcold Air Handler 18 SEER 24K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "AH-18SEER-24K",
      price: "2899.99",
      btu: 24000,
      energyRating: "18 SEER",
      features: ["Direct drive motors", "3-speed operation", "Galvanized steel construction", "Thermal insulators"],
      description: "Professional air handler with A-shape coils and piston expansion device. Versatile 4-way convertible design.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "14",
      name: "Bestcold Air Handler 18 SEER 36K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "AH-18SEER-36K",
      price: "3499.99",
      btu: 36000,
      energyRating: "18 SEER",
      features: ["Direct drive motors", "3-speed operation", "Galvanized steel construction", "Thermal insulators"],
      description: "Professional air handler with A-shape coils and piston expansion device. Versatile 4-way convertible design.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "15",
      name: "Bestcold Air Handler 18 SEER 48K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "AH-18SEER-48K",
      price: "3999.99",
      btu: 48000,
      energyRating: "18 SEER",
      features: ["Direct drive motors", "3-speed operation", "Galvanized steel construction", "Thermal insulators"],
      description: "Professional air handler with A-shape coils and piston expansion device. Versatile 4-way convertible design.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "16",
      name: "Bestcold Air Handler 18 SEER 60K BTU",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "AH-18SEER-60K",
      price: "4699.99",
      btu: 60000,
      energyRating: "18 SEER",
      features: ["Direct drive motors", "3-speed operation", "Galvanized steel construction", "Thermal insulators"],
      description: "Professional air handler with A-shape coils and piston expansion device. Versatile 4-way convertible design.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    // Bestcold CHV Pro VRF Systems
    {
      id: "17",
      name: "Bestcold CHV Pro VRF System 8HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-8HP",
      price: "8999.99",
      btu: 96000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "208V-230V/3N/60Hz"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    {
      id: "18",
      name: "Bestcold CHV Pro VRF System 12HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-12HP",
      price: "12999.99",
      btu: 144000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "208V-230V/3N/60Hz"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    {
      id: "19",
      name: "Bestcold CHV Pro VRF System 16HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-16HP",
      price: "16999.99",
      btu: 192000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "380V-415V/3N/50Hz&60Hz"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    {
      id: "20",
      name: "Bestcold CHV Pro VRF System 20HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-20HP",
      price: "20999.99",
      btu: 240000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "380V-415V/3N/50Hz&60Hz"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    {
      id: "21",
      name: "Bestcold CHV Pro VRF System 24HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-24HP",
      price: "24999.99",
      btu: 288000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "Max 96HP combined"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    {
      id: "22",
      name: "Bestcold CHV Pro VRF System 30HP",
      category: "VRF Systems",
      brand: "Bestcold",
      model: "CHV-PRO-30HP",
      price: "29999.99",
      btu: 360000,
      energyRating: "Full DC Inverter",
      features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "Max 96HP combined"],
      description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
      imageUrl: bestcoldVRFImage,
      inStock: "in_stock"
    },
    // Bestcold Indoor Units - Round-Flow Cassette
    {
      id: "23",
      name: "Bestcold Round-Flow Cassette 5.6KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "RFC-5.6KW",
      price: "2799.99",
      btu: 19100,
      energyRating: "High Efficiency",
      features: ["360° airflow", "Round design", "Commercial grade", "VRF compatible"],
      description: "Professional round-flow cassette unit with 360° air distribution for optimal comfort in commercial spaces.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    {
      id: "24",
      name: "Bestcold Round-Flow Cassette 11.2KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "RFC-11.2KW",
      price: "4299.99",
      btu: 38200,
      energyRating: "High Efficiency",
      features: ["360° airflow", "Round design", "Commercial grade", "VRF compatible"],
      description: "Professional round-flow cassette unit with 360° air distribution for optimal comfort in commercial spaces.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    {
      id: "25",
      name: "Bestcold Round-Flow Cassette 16.0KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "RFC-16.0KW",
      price: "5999.99",
      btu: 54600,
      energyRating: "High Efficiency",
      features: ["360° airflow", "Round design", "Commercial grade", "VRF compatible"],
      description: "Professional round-flow cassette unit with 360° air distribution for optimal comfort in commercial spaces.",
      imageUrl: bestcoldCassetteImage,
      inStock: "in_stock"
    },
    // Bestcold High ESP Ducted Units
    {
      id: "26",
      name: "Bestcold High ESP Ducted Unit 7.1KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "HED-7.1KW",
      price: "3299.99",
      btu: 24200,
      energyRating: "High Efficiency",
      features: ["High static pressure", "Ducted design", "Commercial grade", "Advanced filtration"],
      description: "High static pressure ducted unit for complex ductwork systems requiring superior air movement.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "27",
      name: "Bestcold High ESP Ducted Unit 22.4KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "HED-22.4KW",
      price: "7999.99",
      btu: 76500,
      energyRating: "High Efficiency",
      features: ["High static pressure", "Ducted design", "Commercial grade", "Advanced filtration"],
      description: "High static pressure ducted unit for complex ductwork systems requiring superior air movement.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "28",
      name: "Bestcold High ESP Ducted Unit 56.0KW",
      category: "Air Conditioning",
      brand: "Bestcold",
      model: "HED-56.0KW",
      price: "18999.99",
      btu: 191000,
      energyRating: "High Efficiency",
      features: ["High static pressure", "Ducted design", "Commercial grade", "Advanced filtration"],
      description: "High static pressure ducted unit for complex ductwork systems requiring superior air movement.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    // Bestcold Fresh Air Processor
    {
      id: "29",
      name: "Bestcold Fresh Air Processor 14.0KW",
      category: "Air Quality",
      brand: "Bestcold",
      model: "FAP-14.0KW",
      price: "8999.99",
      btu: 47800,
      energyRating: "Energy Recovery",
      features: ["Energy recovery", "Fresh air processing", "Advanced filtration", "Commercial grade"],
      description: "Advanced fresh air processing unit with energy recovery for optimal indoor air quality in commercial buildings.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "30",
      name: "Bestcold Fresh Air Processor 28.0KW",
      category: "Air Quality",
      brand: "Bestcold",
      model: "FAP-28.0KW",
      price: "13999.99",
      btu: 95500,
      energyRating: "Energy Recovery",
      features: ["Energy recovery", "Fresh air processing", "Advanced filtration", "Commercial grade"],
      description: "Advanced fresh air processing unit with energy recovery for optimal indoor air quality in commercial buildings.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    },
    {
      id: "31",
      name: "Bestcold Fresh Air Processor 56.0KW",
      category: "Air Quality",
      brand: "Bestcold",
      model: "FAP-56.0KW",
      price: "24999.99",
      btu: 191000,
      energyRating: "Energy Recovery",
      features: ["Energy recovery", "Fresh air processing", "Advanced filtration", "Commercial grade"],
      description: "Advanced fresh air processing unit with energy recovery for optimal indoor air quality in commercial buildings.",
      imageUrl: bestcoldAirHandlerImage,
      inStock: "in_stock"
    }
  ];

  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
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
    let filtered = [...products];

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
              Showing {filteredProducts.length} of {products.length} products
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
            />
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
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