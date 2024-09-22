import dbConnect from "@/lib/dbConnect";
import { sendVeficationEmail } from "@/lib/resend";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';


export async function POST(request : Request){
    await dbConnect();
    try {
        
        const {username, email, password} = await request.json()
       const existingUser = await UserModel.findOne({
            userEmail: email,
            isVerified: true,
         })

         if(existingUser){
            console.log("User is already registered");
            return Response.json(
                {
                    success: true,
                    message: "User is already registered"
                },
                {status: 400}
            )
         }else{

            const verifyCode = Math.floor(Math.random() * 10000) + 'anon'; 

            
          
            const hashedpassword = await bcrypt.hash(password, 10);
            const expiry = new Date();
            expiry.setHours(expiry.getHours()+ 1);
            const newUser =  new UserModel({
                userName: username,
                userEmail: email,
                password: hashedpassword,
                verifyCode: verifyCode,
                verifyExpireDate: expiry,
                isVerified: false,
                isAcceptingMessage: false,
                messages: [],
                
            })

            await newUser.save()
         }


    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {status: 500}
        )
        
    }
}
