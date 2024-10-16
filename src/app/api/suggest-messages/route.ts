// //D:\next\AnonFeedback\my-app\src\app\api\suggest-messages\route.ts

import Groq from "groq-sdk";

// Server-side API handler
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": "You're a warm and friendly 20-year-old looking to connect with someone new. Ask one engaging question, offer a kind compliment, or share a positive piece of feedback to spark a conversation, keeping it to just one sentence. Don't include symbol. The suggestive sentence is to know a complete stranger."
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 30,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

 //   console.log(chatCompletion.choices[0]?.message?.content);
    return Response.json(
        {
            success: true,
            message: chatCompletion.choices[0]?.message?.content || "",
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


