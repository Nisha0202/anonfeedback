import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/resend";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
import { createResponse } from "@/components/response/responseHelpers";


// GET handler for username
export async function GET(request: Request) {
    await dbConnect();

    try {
        // Extract query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const identifier = searchParams.get('identifier');

        // Check if the user already exists
        let user = await UserModel.findOne({
            $or: [
                { userEmail: identifier },
                { userName: identifier }
            ]
        });

        if (user) {
            if (!user.isVerified) {
                return createResponse(false, "User not verified. Verify or register again.", 400);
            } else if (user.isVerified) {
                const username = user.userName;
                return createResponse(true, username, 200 );
            }
        } else {
            return createResponse(false, "User not found.", 404);
        }
    } catch (error) {
        console.error("Error finding user", error);
        return createResponse(false, "Error finding user. Please try again later.", 500);
    }
}







// POST handler for user registration
export async function POST(request: Request) {
    await dbConnect();

    try {
        const { identifier, password } = await request.json();
        // Check if the user already exists
        let user = await UserModel.findOne({
            $or: [
                { userEmail: identifier },
                { userName: identifier }
            ]
        })

        const verifyCode = Math.floor(Math.random() * 10000) + 'anon';
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        if (user) {
            if (!user.isVerified) {

                return createResponse(false, "User not verified. Verify or register again.", 400);
          
            } else if (user.isVerified) {

                const email = user.userEmail;
                const username = user.userName;
               
                // Send verification email
                const emailResponse = await sendVerificationEmail(email, username, verifyCode);
                if (!emailResponse.success) {
                    return createResponse(false, emailResponse.message, 500);
                  
                }
                user.verifyCode = verifyCode;
                user.isForgetPassword = true;
                user.isVerified = false;
                user.newPassword = hashedPassword;
                await user.save();
                return createResponse(true, "Verification code sent. Please verify your email.", 201);

            }


        } else {
            return createResponse(false, "User not found.", 404);
        }


    } catch (error) {
        console.error("Error registering user", error);
        return createResponse(false, "Error registering user. Please try again later.", 500);
        
    }
}
