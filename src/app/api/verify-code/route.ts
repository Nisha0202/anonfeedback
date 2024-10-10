import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {

    await dbConnect()

    try {

        const { username, code } = await request.json();

        const userName = decodeURIComponent(username);
        const user = await UserModel.findOne({ userName: userName });


        if (!user) {
            console.error("User can't be found.");
            return Response.json(
                {
                    success: false,
                    message: "User can't be found."
                },
                { status: 500 }
            )

        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyExpireDate) > new Date();
        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully."
                },
                { status: 200 }
            )
        } else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification Code has been expired, please sign up again."
                },
                { status: 400 }
            )

        } else{
            return Response.json(
                {
                    success: false,
                    message: "Verification Code is wrong."
                },
                { status: 400 }
            )
        }
 



    } catch (error) {
        console.error("Error verifying user");
        return Response.json(
            {
                success: false,
                message: "Error verifying user."
            },
            { status: 500 }
        )
    }



}