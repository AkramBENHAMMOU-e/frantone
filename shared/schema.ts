// ⛔️ Cet import a été supprimé car drizzle-orm/pg-core ne doit pas être utilisé côté frontend.
// Toute la logique liée au schéma et à la base de données doit être déplacée dans le backend.
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
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

export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true });

// Products Table
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

export const insertProductSchema = createInsertSchema(products)
  .omit({ id: true, createdAt: true });

// Orders Table
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

export const insertOrderSchema = createInsertSchema(orders)
  .omit({ id: true, createdAt: true, updatedAt: true });

// Order Items Table
export const orderItems = {
  id: "id",
  orderId: "order_id",
  productId: "product_id",
  quantity: "quantity",
  priceAtPurchase: "price_at_purchase", 
};

export const insertOrderItemSchema = createInsertSchema(orderItems)
  .omit({ id: true });

// Cart items (used only for in-memory storage)
export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

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

export type CartItem = z.infer<typeof cartItemSchema>;
export type CartContent = CartItem[];

export type Stats = z.infer<typeof statsSchema>;
