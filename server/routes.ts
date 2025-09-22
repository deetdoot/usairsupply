import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Product creation disabled for security (no authentication implemented)
  app.post("/api/products", async (req, res) => {
    res.status(403).json({ error: "Product creation disabled - authentication required" });
  });

  // Product updates disabled for security (no authentication implemented)
  app.put("/api/products/:id", async (req, res) => {
    res.status(403).json({ error: "Product updates disabled - authentication required" });
  });

  // Product deletion disabled for security (no authentication implemented) 
  app.delete("/api/products/:id", async (req, res) => {
    res.status(403).json({ error: "Product deletion disabled - authentication required" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
