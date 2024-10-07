import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {

    await dbConnect()

    try {

        const { username, code } = await request.json();

        decodeURIComponent(username);
        const user = UserModel.findOne({ userName: decodeURIComponent });


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