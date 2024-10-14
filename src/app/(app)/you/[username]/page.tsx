"use client";
import { useState } from "react";
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

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Sent message loading state
  const [suggesting, setSuggesting] = useState(false); // Suggesting messages state
  const pathname = usePathname();
  const username = pathname.split("/").pop();
  const { toast } = useToast();

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

        if (response.status == 200) {
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


  // Function to handle getting the suggested message
  const handleSuggestMessage = async () => {
    setSuggesting(true); // Set loading state to true
    try {
      const response = await axios.get("/api/suggest-messages"); // Call the API route

      if (response.status == 200) {

        const suggestedMessage = response.data?.message.replace(/"/g, '') || "";
        setMessage(suggestedMessage);
      }
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="min-h-[99vh] grid place-items-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 sm:px-6 lg:px-8 md:px-10 border-2 rounded-md">
        <Link href="/" title="Home" className="text-xl lg:text-2xl font-bold text-rose-700 mb-12">
          AnonFeedback
        </Link>
        <h2 className="text-sm text-gray-600 mb-12 mt-1">
          Share Feedback Anonymously
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
                    disabled={suggesting} // disable the button while loading
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{suggesting ? 'Suggesting...' : 'Suggest Message'}</span>
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
