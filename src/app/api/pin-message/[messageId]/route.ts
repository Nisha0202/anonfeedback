// app/api/pin-message/[messageId]/route.ts
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function PATCH(req: Request, { params }: { params: { messageId: string } }) {
  await dbConnect();
  console.log("hello")
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not Authenticated." }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(session.user._id);
  const { messageId } = params; // Extract messageId from params
  const { isPinned } = await req.json(); // Get the new pin status from the request body

  try {
    // Find the user and update the message
    const user = await UserModel.findOneAndUpdate(
      { _id: userId, "messages._id": messageId },
      { $set: { "messages.$.isPinned": isPinned } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Message not found." }),
        { status: 404 }
      );
    }

      // Customize the response based on whether the message is pinned or unpinned
      const action = isPinned ? "pinned" : "unpinned";
      const responseMessage = `Message successfully ${action}.`;
  
      return new Response(
        JSON.stringify({ success: true, message: responseMessage }),
        { status: 200 }
      );
      
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong." }),
      { status: 500 }
    );
  }
}


