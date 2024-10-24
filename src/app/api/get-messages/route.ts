import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not Authenticated.",
      }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(session.user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } }, // Matching with `_id`, not `id`
      { $unwind: "$messages" }, // Unwind the `messages` array
      {
        $sort: {
          "messages.isPinned": -1, // Sort by isPinned (true first)
          "messages.createAt": -1 // Then sort by createAt (newest first)
        }
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" } // Group messages back into an array
        }
      }
    ]);

    if (!user || user.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found or no messages.",
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        messages: user[0].messages, // Returning the grouped messages
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong.",
      }),
      { status: 500 }
    );
  }
}

