import { z } from 'zod';

// Define the sign-up schema
const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
});

export { signInSchema };