import { NextApiRequest, NextApiResponse } from 'next';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // You can still accept messages from the request body if needed

  const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    const result = await streamText({
      model: openai('gpt-4-turbo'),
      messages: [{ role: 'user', content: prompt }],  // Use messages if required by the streamText function
    });

    // Ensure you're returning the correct structure of the response
    const responseData = await result.toDataStreamResponse(); // Await if it's asynchronous
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
     
    });
  }
};

