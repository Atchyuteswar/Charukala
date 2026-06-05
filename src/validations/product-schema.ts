import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name required"),

  description: z
    .string()
    .min(10, "Description too short"),

  price: z.coerce
    .number()
    .min(1, "Invalid price"),

  stock: z.coerce
    .number()
    .min(0, "Invalid stock"),

  category: z
    .string()
    .min(1, "Select category"),

  featured: z.boolean(),

  images: z.array(
    z.string()
  )
});

export type ProductFormValues =
z.infer<typeof productSchema>;
