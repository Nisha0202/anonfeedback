//D:\next\AnonFeedback\my-app\src\app\api\feedback-message\route.ts

import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

// Server-side API handler
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();  // Parsing the request body
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { success: false, message: "No message provided." },
      { status: 400 }
    );
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": `Your friend just sent you this message: ${content}. Craft a thoughtful, concise response (up to 120 characters) expressing gratitude, concern, or an appropriate reaction. Reply in one sentence without any " symbol`
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 30,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    // const responseMessage = chatCompletion.choices[0]?.message?.content || "";
    let responseMessage = chatCompletion.choices[0]?.message?.content || "";

    // Ensure the response ends with a period if not already present
    if (responseMessage && !responseMessage.trim().endsWith(".")) {
      responseMessage = responseMessage.trim() + ".";
    }

    // console.log("hi", responseMessage);
    return Response.json(
      {
        success: true,
        message: responseMessage,
      },
      { status: 200 }
    )


  } catch (error: any) {
    console.error("Error fetching Groq completion:", error); // Log the error
    return Response.json(
      {
        success: false,
        message: "Error fetching Groq completion.",
      },
      { status: 500 }
    )

  }

}