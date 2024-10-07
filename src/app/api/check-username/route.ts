import dbConnect from '@/lib/dbConnect';
import {usernameValidation} from '@/schemas/signUpSchema'
import { z } from 'zod';


const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect();

    try {

        const {searchParams} = new URL(request.url)
        const queryParam = { username: searchParams.get('username')

        }

        // validate with zod
        usernameQuerySchema.safeParse(queryParam);

        
    } catch (error) {
        console.error("Error Check unique name");
        return Response.json(
            {
                success: false,
                message: "Error checking username."
            },
            { status: 500 }
        )
    }
}