import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {

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

    const userId = user?._id;

    const { acceptMessages } = await request.json();
    try {

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if (!updateUser) {

            return Response.json(
                {
                    success: false,
                    message: "Accept messages not authorized.",
                    updateUser
                },
                { status: 401 }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptence status updated."
            },
            { status: 200 }
        )


    } catch (error) {
        console.log(error || "failed to update user status to accept messages");

        return Response.json(
            {
                success: false,
                message: "Accept messages not authorized."
            },
            { status: 500 }
        )

    }
}


export async function GET() {

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

    const userId = user?._id;


    const foundUser = await UserModel.findByIdAndUpdate(userId)


    try {


        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found or no message.",

                },
                { status: 404 }
            )
        }


        return Response.json(
            {
                success: true,
                message: "Message acceptance authorized.",
                isAcceptingMessage: foundUser.isAcceptingMessage,


            },
            { status: 200 }
        )
    } catch (error) {
        console.log(error || "Error in getting message acceptance status");

        return Response.json(
            {
                success: false,
                message: "Error in getting message acceptance status."
            },
            { status: 500 }
        )
    }



}