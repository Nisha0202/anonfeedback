import dbConnect from "@/lib/dbConnect";
import { sendVeficationEmail } from "@/lib/resend";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
    await dbConnect();
    try {

        const { username, email, password } = await request.json()

        const existingUser = await UserModel.findOne({
            userEmail: email,
            // isVerified: true,
        })
        const verifyCode = Math.floor(Math.random() * 10000) + 'anon';
        if (existingUser) {

            if (existingUser.isVerified) {
                console.log("User is already registered and verified.");
                return Response.json(
                    {
                        success: true,
                        message: "User is already registered and verified."
                    },
                    { status: 400 }
                )

            } else {



                const hashedpassword = await bcrypt.hash(password, 10);
                const expiry = new Date();
                expiry.setHours(expiry.getHours() + 1);
                existingUser.password = hashedpassword;
                existingUser.verifyCode = verifyCode;
                existingUser.verifyExpireDate = expiry;
                existingUser.verifyCode = verifyCode;

                await existingUser.save()

            }



        } else {

            // dosn'texist so create

            const verifyCode = Math.floor(Math.random() * 10000) + 'anon';

            const hashedpassword = await bcrypt.hash(password, 10);
            const expiry = new Date();
            expiry.setHours(expiry.getHours() + 1);
            const newUser = new UserModel({
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

        // send verification mail
        const emailResponse = await sendVeficationEmail(
            email,
            username,
            verifyCode

        )
        if (!emailResponse.success) {
            return Response.json({

                success: false,
                message: emailResponse.message,
            }, { status: 500 })
        } else {

            return Response.json({

                success: true,
                message: "User Registered Successfully, Please Verify Your Email",
            }, { status: 201 })
        }





    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            { status: 500 }
        )

    }
}
