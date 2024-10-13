import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import {usernameValidation} from '@/schemas/signUpSchema'
import { getServerSession, User } from 'next-auth';
import { string, z } from 'zod';
import { authOptions } from '../../auth/[...nextauth]/options';


const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function DELETE(request: Request, {params}: {params : {messageid:string}} ){
 const messageId = params.messageid;
    await dbConnect();
   
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;


    if (!session || !session.user) {

        return Response.json(
            {
                success: false,
                message: "Not Authenticated."
            },
            { status: 401 }
        )
    }

    try {

       const result = await UserModel.updateOne(
        {_id: user._id},
        {$pull: {mesages:{_id : {messageId}}}} 
       )

        if(!result.modifiedCount){
          
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted."
                },
                { status: 401 } 
            
            )
        }
   

        return Response.json(
            {
                success: true,
                message: "Message deleted."
            },
            { status: 200 }      
        )

        
    } catch (error) {
        console.error("Error in message deletion.");
        return Response.json(
            {
                success: false,
                message: "Message could not be deleted."
            },
            { status: 500 }
        )
    }
}