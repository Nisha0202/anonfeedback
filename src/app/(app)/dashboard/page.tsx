'use client'; // Ensure this is at the top

import React, { useCallback, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Button } from "@/components/ui/button";
import Link from "next/link";
 import { RefreshCw } from "lucide-react";
import { Divide, Loader2 } from "lucide-react"

import { Message } from "@/model/Message"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { format } from "date-fns"
import { Trash2, Search } from "lucide-react"

import MessageCard from "@/components/MessageCard"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

import { Switch } from "@/components/ui/switch"; // ShadCN Switch component

// Main Component
export default function Dashboard () {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setSwitchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { toast } = useToast(); // Ensure toast is accessible
  const { data: session } = useSession(); // Get session data

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

    // Deleting message
    const handleDelete = (messageId: string) => {
      setMessages(messages.filter((message) => message._id !== messageId));
    };

  // Fetch accepted messages
  const fetchAcceptMessage = useCallback(async () => {
    setSwitchLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description: axiosError.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setSwitchLoading(false);
    }
  }, [setValue, toast]);

  // Fetch all messages (with optional refresh toast)
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages || []); 
      if (refresh) {
        toast({
          title: "Success",
          description: "Messages refreshed.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description: axiosError.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setSwitchLoading, toast]);

  // Effect to fetch messages on component mount
  useEffect(() => {

    if(!session || !session.user) return
    fetchMessages();
    fetchAcceptMessage();
  }, [fetchMessages, session, setValue, fetchAcceptMessage]);

// handle switch change


const handleSwitchChange = async () => {
  try {
    const response = await axios.post('/api/accept-messages', {
      acceptMessages: !acceptMessages,  // Toggle the current state
    });

    setValue('acceptMessages', !acceptMessages);  
    toast({
      title: response?.data?.message,
      variant: 'default',
    });
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    toast({
      title: "Failed",
      description: axiosError.response?.data?.message || "Something went wrong.",
    });
  }
};


  // Pagination logic
  const messagesPerPage = 6;
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);


  if(!session || !session.user){
    return (
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl lg:text-2xl font-bold">Please Sign In</h1></div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold">AnonFeedback Dashboard</h1>
        
        {/* Refresh button */}
        <Button onClick={() => fetchMessages(true)} className="flex items-center space-x-2">
          <RefreshCw className="mr-2" /> Refresh
        </Button>
      </div>
  
    {/* Switch for accepting messages */}
    <div className="mt-4 flex items-center space-x-4">
        <span>Accepting Messages</span>
        <Switch 
          checked={acceptMessages} 
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading} 
        />
      </div>
  
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Render your messages here */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message._id}>
                  <MessageCard
                    key={message._id}
                    message={message}
                    onMessageDelete={handleDelete}
                  />
                </div>
              ))
            ) : (
              <div>No messages found.</div>
            )}
          </div>
  
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
  
  
}

