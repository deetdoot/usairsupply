import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product CRUD methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.initializeProducts();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product CRUD implementations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      id,
      name: insertProduct.name,
      category: insertProduct.category,
      brand: insertProduct.brand,
      model: insertProduct.model,
      price: insertProduct.price || null,
      btu: insertProduct.btu || null,
      energyRating: insertProduct.energyRating || null,
      features: insertProduct.features || null,
      description: insertProduct.description || null,
      imageUrl: insertProduct.imageUrl || null,
      inStock: insertProduct.inStock || "in_stock"
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct: Product = { ...existingProduct, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  private initializeProducts() {
    // Initialize with existing brands first
    const existingProducts: InsertProduct[] = [
      {
        name: "Carrier 24ACC636A003 Performance Series Central Air Conditioner",
        category: "Air Conditioning",
        brand: "Carrier", 
        model: "24ACC636A003",
        price: "3299.99",
        btu: 36000,
        energyRating: "16 SEER",
        features: ["Variable-speed compressor", "Smart thermostat compatible", "Quiet operation", "10-year warranty"],
        description: "High-efficiency central air conditioning system with advanced variable-speed technology.",
        imageUrl: "/assets/generated_images/Central_AC_unit_product_2b1450d4.png",
        inStock: "in_stock"
      },
      {
        name: "Trane XV20i TruComfort Variable Speed Heat Pump",
        category: "Heat Pumps",
        brand: "Trane",
        model: "XV20i", 
        price: "4599.99",
        btu: 48000,
        energyRating: "20 SEER",
        features: ["Variable speed technology", "TruComfort technology", "All-weather operation", "12-year warranty"],
        description: "Premium variable speed heat pump with industry-leading efficiency and comfort control.",
        imageUrl: "/assets/generated_images/Heat_pump_unit_product_2bc7afc9.png",
        inStock: "in_stock"
      },
      {
        name: "Lennox EL296V High-Efficiency Gas Furnace",
        category: "Heating",
        brand: "Lennox",
        model: "EL296V",
        price: "2899.99", 
        btu: 80000,
        energyRating: "96% AFUE",
        features: ["96% efficiency rating", "Variable-speed blower", "Two-stage heating", "20-year warranty"],
        description: "Ultra-high efficiency gas furnace with two-stage heating and variable-speed comfort.",
        imageUrl: "/assets/generated_images/Gas_furnace_unit_product_01b5caf5.png",
        inStock: "low_stock"
      },
      {
        name: "Goodman GSX14 Central Air Conditioner",
        category: "Air Conditioning", 
        brand: "Goodman",
        model: "GSX14",
        price: "2299.99",
        btu: 24000,
        energyRating: "14 SEER",
        features: ["Single-stage cooling", "R-410A refrigerant", "Durable construction", "10-year warranty"],
        description: "Reliable and affordable central air conditioning for budget-conscious homeowners.",
        imageUrl: "/assets/generated_images/Central_AC_unit_product_2b1450d4.png",
        inStock: "in_stock"
      },
      {
        name: "Rheem Classic Plus Series Single Stage Heat Pump",
        category: "Heat Pumps",
        brand: "Rheem",
        model: "RP1424AJ1NA",
        price: "2799.99",
        btu: 24000,
        energyRating: "14 SEER", 
        features: ["Single-stage operation", "Scroll compressor", "Refrigerant R-410A", "10-year warranty"],
        description: "Dependable heat pump solution for year-round comfort and energy savings.",
        imageUrl: "/assets/generated_images/Heat_pump_unit_product_2bc7afc9.png",
        inStock: "in_stock"
      },
      {
        name: "York YXV 20 SEER Variable Capacity Air Conditioner",
        category: "Air Conditioning",
        brand: "York",
        model: "YXV",
        price: "3899.99",
        btu: 36000,
        energyRating: "20 SEER",
        features: ["Variable capacity", "Inverter technology", "Smart home ready", "12-year warranty"],
        description: "Premium variable capacity air conditioner with smart home integration capabilities.",
        imageUrl: "/assets/generated_images/Central_AC_unit_product_2b1450d4.png",
        inStock: "out_of_stock"
      },
      // Bestcold Products from PDF (accurately transcribed)
      {
        name: "Bestcold Multi-Split Wall Mounted Unit 18K BTU",
        category: "Air Conditioning",
        brand: "Bestcold",
        model: "MS-WM-18K", 
        price: "1899.99",
        btu: 18000,
        energyRating: "22 SEER2",
        features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
        description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
        imageUrl: "/assets/generated_images/Bestcold_wall_mounted_AC_unit_a5621cd3.png",
        inStock: "in_stock"
      },
      {
        name: "Bestcold Multi-Split Wall Mounted Unit 24K BTU",
        category: "Air Conditioning",
        brand: "Bestcold",
        model: "MS-WM-24K",
        price: "2299.99", 
        btu: 24000,
        energyRating: "22 SEER2",
        features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
        description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
        imageUrl: "/assets/generated_images/Bestcold_wall_mounted_AC_unit_a5621cd3.png",
        inStock: "in_stock"
      },
      {
        name: "Bestcold Multi-Split Wall Mounted Unit 36K BTU",
        category: "Air Conditioning",
        brand: "Bestcold",
        model: "MS-WM-36K",
        price: "2799.99",
        btu: 36000,
        energyRating: "22 SEER2",
        features: ["Matching mode", "Flexible installation", "Up to 75m pipe length", "Max 10m height difference"],
        description: "High-efficiency wall mounted unit with advanced multi-split technology. Wide operation range from 14°F to 114.8°F.",
        imageUrl: "/assets/generated_images/Bestcold_wall_mounted_AC_unit_a5621cd3.png",
        inStock: "in_stock"
      },
      {
        name: "Bestcold Compact Cassette Unit 18K BTU",
        category: "Air Conditioning",
        brand: "Bestcold",
        model: "CC-18K",
        price: "2199.99",
        btu: 18000,
        energyRating: "22 SEER2",
        features: ["4-way airflow", "Compact design", "Ceiling mounted", "Multi-split compatible"],
        description: "Professional compact cassette unit for commercial applications with efficient 4-way air distribution.",
        imageUrl: "/assets/generated_images/Bestcold_cassette_AC_unit_1d867241.png",
        inStock: "in_stock"
      },
      {
        name: "Bestcold CHV Pro VRF System 8HP",
        category: "VRF Systems",
        brand: "Bestcold",
        model: "CHV-PRO-8HP",
        price: "8999.99",
        btu: 96000,
        energyRating: "Full DC Inverter",
        features: ["Up to 100 indoor units", "Refrigerant cooling design", "7-level power saving", "208V-230V/3N/60Hz"],
        description: "New Full DC Inverter VRF system with advanced power management and refrigerant cooling for outdoor temperatures up to 55°C.",
        imageUrl: "/assets/generated_images/Bestcold_VRF_outdoor_unit_56a2a972.png",
        inStock: "in_stock"
      }
    ];

    existingProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = { 
        id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        model: product.model,
        price: product.price || null,
        btu: product.btu || null,
        energyRating: product.energyRating || null,
        features: product.features || null,
        description: product.description || null,
        imageUrl: product.imageUrl || null,
        inStock: product.inStock || "in_stock"
      };
      this.products.set(id, fullProduct);
    });
  }
}

export const storage = new MemStorage();
