import { z } from 'zod';

// Define the sign-up schema
const acceptMessageSchema = z.object({
    acceptMessages: z.boolean(),
    
});

export { acceptMessageSchema };