import { z } from 'zod';

// Define the sign-up schema
const messageSchema = z.object({
    content: z.string().min(6, { message: "Content must be at least 5 characters long." })
    .max(300, { message: "Content can be less than 300 characters long." }),
});

export { messageSchema };