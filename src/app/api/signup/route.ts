import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/resend";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';


// POST handler for user registration
export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        // Check if the user already exists
        let user = await UserModel.findOne({ userEmail: email });
        const smallLetterUsername = username.toLowerCase();
        const verifyCode = Math.floor(Math.random() * 10000) + 'anon';
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1);

        if (user) {
            if (user.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User is already registered and verified."
                    },
                    { status: 400 }
                );
            }
          
            // Update existing unverified user (both username and password)
            user.userName = smallLetterUsername;  // Update the username
            user.password = hashedPassword;
            user.verifyCode = verifyCode;
            user.verifyExpireDate = expiry;
            await user.save();
        } else {
            // Create a new user
            user = new UserModel({
                userName: smallLetterUsername,
                userEmail: email,
                password: hashedPassword,
                verifyCode,
                verifyExpireDate: expiry,
                isVerified: false,
                isAcceptingMessage: false,
                messages: [],
            });

            await user.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail (email, username, verifyCode);
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email.",
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user. Please try again later.",
            },
            { status: 500 }
        );
    }
}
