// //D:\next\AnonFeedback\my-app\src\app\api\suggest-messages\route.ts

// import Groq from "groq-sdk";
// import { NextApiRequest, NextApiResponse } from "next";

// // Server-side API handler
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       "messages": [
//         {
//           "role": "user",
//           "content": "Suggest one friendly question to ask."
//         }
//       ],
//       "model": "llama3-8b-8192",
//       "temperature": 1,
//       "max_tokens": 1024,
//       "top_p": 1,
//       "stream": true,
//       "stop": null
//     });


//     res.status(200).json(chatCompletion);
//   } catch (error: any) {
//     console.error("Error fetching Groq completion:", error); // Log the error
//     res.status(500).json({ message: "Error fetching Groq completion", error: error.message || "Unknown error" });
//   }

// }












// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ });

// export async function main() {


//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.choices[0]?.message?.content || "");
// }

// export async function getGroqChatCompletion() {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: "Suggest a friendly question to ask.",
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// }












































// import { NextResponse } from 'next/server';
// import { OpenAI } from 'openai'; // Import OpenAI SDK

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY , // Use your API key from environment variables
// });

// export async function POST(req: Request) {
//     try {
  
//   const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
 
//         // Create the chat completion
//         const response = await openai.chat.completions.create({
//           model: "gpt-4o",
//             messages: [
//                 {
//                     role: "system",
//                     content: `You are a helpful female assistant that asks friendly  questions in the style of a southern belle from the southeast United States.`,
//                 },
//                 {
//                     role: "user",
//                     content: prompt, // Default user input
//                 },
//             ],
//         });

//         // Extract the response content
//         const question = response.choices[0].message.content;

//         return NextResponse.json({ question }); // Send the response as JSON
//     } catch (error) {
//         console.error('Error generating question:');
//         return NextResponse.json({ error: 'Failed to generate question.' }, { status: 500 });
//     }
// }





 // const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
 

 // import OpenAI from "openai";
// const openai = new OpenAI();

// const openai = createOpenAI({
//   apiKey: process.env.OPENAI_API_KEY ?? '',
  
// });

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   const prompt = "Create a single open-ended and engaging question formatted as a single string. The question should be in a friendly tone and suitable for an anonymous social messaging platform, like Qooh.me.";
// console.log('apikey');
//   try {
//     const result = await streamText({
//       model: openai('gpt-4-turbo'),
//       messages: [{ role: 'user', content: prompt }],
//     });


//     // Assuming result is a single string formatted as a question
//     const message = result; // Trim whitespace

//     // Return the message in the expected structure
//     res.status(200).json({ message });
//   } catch (error) {
//     console.error("Error in message suggestion:", error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while processing your request.',
//     });
//   }
// };