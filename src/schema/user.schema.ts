import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  fullName: z.string().min(3, "Full name is required"),
  role: z.enum(["EMPLOYEE", "ADMIN"], { message: "Invalid role" }),
  profilePic: z.string().optional(), // Not required
});

export type UserSchema = z.infer<typeof userSchema>;
