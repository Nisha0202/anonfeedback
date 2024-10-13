"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // for getting the username from the URL
import { Send, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from 'next/navigation'
const suggestedMessages = [
  "I appreciate your hard work on the recent project.",
  "Your presentation skills have really improved.",
  "I think we could improve our team communication.",
  "Thank you for always being helpful and supportive.",
  "I'd like to discuss ways we can enhance our workflow.",
];

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Optional loading state
  const pathname = usePathname();
  const username = pathname.split("/").pop();
 const {toast} = useToast();

  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (message.trim()) {
      setLoading(true); // Set loading state to true
      try {
        // Send the message to the API
        const response = await axios.post<ApiResponse>("/api/send-messages", {
            username,
            content: message,
          });
     


        if (response.status == 200 ) {
          // Clear the input after sending the message successfully
          console.log("Message sent:", response.data.message);
          setMessage("");
          toast({
            title: "Success",
            description: response?.data?.message,
          });
        } 
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: username,
          description: axiosError.response?.data?.message || "Something went wrong.",
        });


      } finally {
        setLoading(false); // Set loading state back to false
      }
    }
  };

  // Function to suggest a random message
  const handleSuggestMessage = () => {
    const randomIndex = Math.floor(Math.random() * suggestedMessages.length);
    setMessage(suggestedMessages[randomIndex]);
  };

  return (
    <div className="flex justify-center items-center border-2 min-h-[99vh] bg-gray-50">
      <div className="px-4 md:px-8 lg:p-12 bg-gray-100">
        <Link href="/" title="Home"  className="text-xl lg:text-2xl font-bold mb-12">
          Share Feedback Anonymously on
          <span className="text-rose-600"> AnonFeedback</span>
        </Link>
        <h2 className="text-sm text-gray-600 mb-12 mt-1">
          Write Your Anonymous Message
        </h2>
        <div className="space-y-8">
          <Textarea
            placeholder="Type your anonymous message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 text-gray-800 bg-gray-200 border focus:outline-none focus:ring-0 "
          />
          <div className="flex justify-between items-center mt-">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSuggestMessage}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Suggest Message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to get a suggested message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              onClick={handleSendMessage}
              variant={"outline"}
              disabled={!message.trim() || loading} // Disable button if no message or loading
              className="flex items-center space-x-2 rounded-sm font-bold transition duration-200  text-rose-700"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
