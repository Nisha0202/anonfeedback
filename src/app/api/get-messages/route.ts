import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request: Request) {

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

    // const userId = user?._id;
    const userId = new mongoose.Types.ObjectId(user._id);

try {

    const user = await UserModel.aggregate([
        { $match: {id: userId}},
        { $unwind: '$messages'},
        {$sort: {'messages.createdAt': -1}},
        {$group: {_id: 'id', messages: { $push: 'messages'}, }}
    ])

    if(!user || user.length == 0){
        return Response.json(
            {
                success: false,
                message: "User not found or no messages."
            },
            { status: 401 }
        )
    }
    return Response.json(
        {
            success: true,
            message: user[0].messages
        },
        { status: 200 }
    )





    
} catch (error) {
   
    


}




}


// export async function GET(request: Request) {
//   try {
//     // Database connection
//     await dbConnect();

//     // Get session and validate user
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Not Authenticated.",
//         }),
//         { status: 401 }
//       );
//     }

//     const userId = new mongoose.Types.ObjectId(session.user._id);

//     // Aggregation to find user messages
//     const user = await UserModel.aggregate([
//       { $match: { _id: userId } }, // Match the user by _id, not id
//       { $unwind: "$messages" }, // Unwind the messages array
//       { $sort: { "messages.createdAt": -1 } }, // Sort messages by date
//       {
//         $group: {
//           _id: "$_id",
//           messages: { $push: "$messages" }, // Group messages into an array
//         },
//       },
//     ]);

//     // If user not found or has no messages
//     if (!user || user.length === 0) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "User not found or no messages.",
//         }),
//         { status: 404 }
//       );
//     }

//     // Return the user's messages
//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: user[0].messages,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     // Error handling
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Something went wrong.",
//       }),
//       { status: 500 }
//     );
//   }
// }
