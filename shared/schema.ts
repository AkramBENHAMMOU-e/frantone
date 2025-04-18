// ⛔️ Cet import a été supprimé car drizzle-orm/pg-core ne doit pas être utilisé côté frontend.
// Toute la logique liée au schéma et à la base de données doit être déplacée dans le backend.
import { z } from "zod";

// Users Table (simple mapping)
export const users = {
  id: "id",
  username: "username",
  password: "password",
  email: "email",
  fullName: "full_name",
  phoneNumber: "phone_number",
  address: "address",
  isAdmin: "is_admin",
  createdAt: "created_at",
};

// Schéma de validation utilisateur (frontend, zod natif)
export const insertUserSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
  email: z.string().email(),
  fullName: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

// Products Table (simple mapping)
export const products = {
  id: "id",
  name: "name",
  description: "description",
  price: "price", 
  imageUrl: "image_url",
  category: "category", 
  subcategory: "subcategory",
  stock: "stock", 
  featured: "featured",
  discount: "discount", 
  createdAt: "created_at",
};

// Schéma de validation produit (frontend, zod natif)
export const insertProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.number().min(0),
  imageUrl: z.string().url(),
  category: z.string(),
  subcategory: z.string(),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
  discount: z.number().int().min(0).max(100).optional(),
});

// Orders Table (simple mapping)
export const orders = {
  id: "id",
  userId: "user_id", 
  status: "status", 
  totalAmount: "total_amount", 
  customerName: "customer_name",
  customerEmail: "customer_email",
  customerPhone: "customer_phone",
  shippingAddress: "shipping_address",
  createdAt: "created_at",
  updatedAt: "updated_at",
};

// Schéma de validation commande (frontend, zod natif)
export const insertOrderSchema = z.object({
  userId: z.number().optional(),
  status: z.string().optional(),
  totalAmount: z.number().min(0),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  shippingAddress: z.string(),
});

// Order Items Table (simple mapping)
export const orderItems = {
  id: "id",
  orderId: "order_id",
  productId: "product_id",
  quantity: "quantity",
  priceAtPurchase: "price_at_purchase", 
};

// Schéma de validation item de commande (frontend, zod natif)
export const insertOrderItemSchema = z.object({
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number().min(1),
  priceAtPurchase: z.number().min(0),
});

// Cart
export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});
export type CartItem = z.infer<typeof cartItemSchema>;
export type CartContent = CartItem[];

// Stats (for admin dashboard)
export const statsSchema = z.object({
  salesByMonth: z.record(z.string(), z.number()),
  totalSales: z.number(),
  totalOrders: z.number(),
  totalCustomers: z.number(),
  popularProducts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      sales: z.number(),
    })
  ),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems;
export type Stats = z.infer<typeof statsSchema>;
