import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";



export async function POST(request: Request){

    await dbConnect();
    const {username, content} = await request.json();
   
    try {
        const user = await UserModel.findOne({userName: username});
        if(!user){

            return Response.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            )
        }

        //is user accepting the messages
        if(!user.isAcceptingMessage){
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting any message.",
                },
                { status: 403 }
            )
        }
        

        const newMessage = {content, createdAt: new Date()};
        user.messages.push(newMessage);
        await user.save();
        return Response.json(
            {
                success: true,
                message: "Sent successfully.",
            },
            { status: 200 }
        )

    } catch (error) {
        
        console.log("Unexpected error", error);

        return Response.json(
            {
                success: false,
                message: "Unexpected error! lease try again."
            },
            { status: 500 }
        )


    }


}
