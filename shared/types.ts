import { z } from "zod";

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
export type CartItem = z.infer<typeof cartItemSchema>;
export type CartContent = CartItem[];

export type Stats = z.infer<typeof statsSchema>;
