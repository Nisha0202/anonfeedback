import { z } from 'zod';

// Define the sign-up schema
const verifySchema = z.object({
    code: z.string().min(6, { message: "Code must be at least 6 characters long." }),
});

export { verifySchema };

