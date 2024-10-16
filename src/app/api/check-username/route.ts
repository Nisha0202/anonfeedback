import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import {usernameValidation} from '@/schemas/signUpSchema'
import { z } from 'zod';


const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    await dbConnect();

    try {
      
        const {searchParams} = new URL(request.url)
        const queryParam = { username: searchParams.get('username') };
//   console.log("usernme=", queryParam);

        // validate with zod
        const result = usernameQuerySchema.safeParse(queryParam);

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length>0?usernameErrors.join(', '):"Invalid query parameters."
                },
                { status: 400 } 
            
            )
        }
        
        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({
            userName: { $regex: new RegExp(`^${username.trim()}$`, 'i') },
            isVerified: true
        });
        // console.log("Existing user:", existingVerifiedUser);


        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken."
                },
                { status: 400 }      
            )
        }


        return Response.json(
            {
                success: true,
                message: "Username is available."
            },
            { status: 200 }      
        )

        
    } catch (error) {
        console.error("Error Check unique name", error);
        return Response.json(
            {
                success: false,
                message: "Error checking username."
            },
            { status: 500 }
        )
    }
}