import { z } from "zod";
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error("Invalid data, please check console logs");
  }
}
