import { z } from "zod";

export const productFilterSchema = z.object({
  categories: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one category.",
  // }),
  types: z.array(z.string()),
  //   .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one type.",
  // }),
});

export const quantitySchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
});
