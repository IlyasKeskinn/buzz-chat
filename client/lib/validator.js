import { z } from "zod";
// Define form schema

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(50, { message: "Usernmae must be most 50 characters" }),
  bio: z
    .string()
    .max(500, { message: "Bio must be most 500 characters." })
    .optional(),
});
