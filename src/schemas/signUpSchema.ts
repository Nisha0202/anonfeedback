import { z } from 'zod';

// Define a schema for username validation
export const usernameValidation = z
.string()
.min(2, "Username must be at least 2 characters long.")
.max(30, "Username must be at most 30 characters long.")
// Require the first letter to be uppercase and allow letters, numbers, and underscores
// .regex(/^[A-Z][a-zA-Z0-9_]+$/, "Username must start with an uppercase letter and only contain letters, numbers, and underscores.");

// Define the sign-up schema
const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export { signUpSchema };