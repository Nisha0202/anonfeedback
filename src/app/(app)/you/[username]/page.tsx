"use client";
import { useState } from "react";
import { Send, Lightbulb, ArrowLeftCircleIcon } from "lucide-react";
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
import { handleAxiosError } from "@/components/response/axiosErrorHandler";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Sent message loading state
  const [suggesting, setSuggesting] = useState(false); // Suggesting messages state
  const [feedback, setFeedback] = useState("");
  const pathname = usePathname();
  const username = pathname.split("/").pop();
  const { toast } = useToast();

  // // Function to handle sending the message
  // const handleSendMessage = async () => {

  //   if (message.trim() && message.length > 0 && message.length <= 150) {
  //     setLoading(true); // Set loading state to true
  //     await axios.post("/api/count");

  //     try {
  //       // Send the message to the API
  //       const response = await axios.post<ApiResponse>("/api/send-messages", {
  //         username,
  //         content: message,
  //       });

  //       if (response.status == 200) {
  //         // Clear the input after sending the message successfully
  //         // console.log("Message sent:", response.data.message);
  //         setMessage("");
  //         toast({
  //           title: "Success",
  //           description: response?.data?.message,
  //         });

  //         const res = await axios.post<ApiResponse>("/api/feedback-message", {
  //           content: message,
  //         });

  //         if (res.status == 200) {
  //           // Clear the input after sending the message successfully
  //           // console.log("Message sent:", response.data.message);
  //           setFeedback(response.data.message);
  //         }



  //       }
  //     } catch (error) {
  //       handleAxiosError(error as AxiosError<ApiResponse>, toast);


  //     } finally {
  //       setLoading(false); // Set loading state back to false
  //     }
  //   }
  // };


  const handleSendMessage = async () => {
    if (message.trim() && message.length > 0 && message.length <= 150) {
      setLoading(true); // Set loading state to true
  
      try {
        // Step 1: Send the initial message
        await axios.post("/api/count");
  
        const response = await axios.post<ApiResponse>("/api/send-messages", {
          username,
          content: message,
        });
  
        if (response.status === 200) {
          // Clear the input after sending the message successfully
          setMessage("");
          toast({
            title: "Success",
            description: response.data.message,
          });
  
          // Step 2: Send feedback message
          const res = await axios.post<ApiResponse>("/api/feedback-message", {
            content: message,
          });
  
          if (res.status === 200) {
            // Set the feedback message after successfully sending the feedback
            setFeedback(res.data.message); // Ensure this uses `res.data`
          } else {
            toast({
              title: "Error",
              description: "Failed to send feedback message.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        handleAxiosError(error as AxiosError<ApiResponse>, toast);
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
      handleAxiosError(error as AxiosError<ApiResponse>, toast);
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="min-h-[99vh] grid place-items-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 sm:px-6 lg:px-8 md:px-10 border-2 rounded-md">
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center text-gray-400 hover:text-gray-300 rounded-full">
            <ArrowLeftCircleIcon className="w-5 h-5" />
          </Link>
          <Link href="/" title="Home" className="text-xl lg:text-2xl font-bold text-rose-700">
            AnonFeedback
          </Link>
        </div>

        <h2 className="text-sm text-gray-600 mb-12 mt-1">
          Share Feedback Anonymously
        </h2>
        <div className="">
          <Textarea
            placeholder="Type your anonymous message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 text-gray-800 bg-gray-200 border focus:outline-none focus:ring-0 "

          />
          <p className={`text-sm mt-2 ${message.length > 150 ? 'text-red-600' : 'text-gray-600'}`}>
            {message.length}/150 characters
          </p>
          <div className="flex justify-between items-center mt-10">
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
                    <span>{suggesting ? 'Suggesting...' : 'AI Suggest Message'}</span>
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
              disabled={!message.trim() || loading || message.length > 150} // Disable button if no message or loading
              className="flex items-center space-x-2 rounded-sm font-bold transition duration-200  text-rose-700 "
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

        </div> <div className="pt-4 text-sm text-rose-700 text-wrap font-medium">{feedback}.</div>
      </div>
    </div>
  );
}
