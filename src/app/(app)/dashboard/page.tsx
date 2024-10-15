'use client';
import React, { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, CopyIcon } from "lucide-react";
import MessageCard from "@/components/MessageCard"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Switch } from "@/components/ui/switch";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { Message } from "@/model/Message"
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setSwitchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileUrl, setProfileUrl] = useState('');

  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

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
  }, [setValue]);

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
  }, [session?.user]);

  useEffect(() => {
    if (!session || !session.user) return;

    const username = session?.user.userName;

    const url = `${window.location.origin}/you/${username}`;
    setProfileUrl(url);
    fetchMessages();
    // fetchAcceptMessage();
  }, [session?.user, fetchAcceptMessage]);

  const handleSwitchChange = async () => {
     fetchAcceptMessage();
    try {
      const response = await axios.post('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
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

  const messagesPerPage = 6;
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);



  const copyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied",
      variant: 'default',
    });
  }


  if (!session || !session.user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-xl lg:text-2xl font-bold">Please Sign In</h1>
      </div>
    );
  }

  return (
    <div className="container py-8 px-6 mx-auto">
      <div className="flex justify-between items-center">
        <Link href={'/'} className="text-xl lg:text-2xl font-bold" title="Home">AnonFeedback Dashboard</Link>
        {/*refresh */}
        <Button onClick={() => fetchMessages(true)} size={'sm'} title="Refresh" className="p-0 bg-transparent hover:bg-transparent">
          <RefreshCw className="h-4 w-4 text-black" />
        </Button>
      </div>

      <div className="mt-2 flex flex-col lg:flex-row  items-start lg:items-center justify-start lg:justify-between">
        <div className="mt-2 flex items-center gap-x-3">

          <span className="text-sm">Accepting Messages</span>
          <Switch
            className="h-5 w-10"
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
        </div>


        <div>
          {acceptMessages && <div className="text-sm flex items-center">
            {profileUrl}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyUrl} variant="outline" size="sm" className="ms-3 flex items-center">
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click here to copy your shareable link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>}
        </div>

      </div>

      {isLoading ? (
        <Loader2 className="animate-spin mt-12" />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {messages.length > 0 ? (
              currentMessages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDelete}
                />
              ))
            ) : (
              <div className="mt-8">No messages found.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Previous
              </Button>
              <span className="flex items-center">Page {currentPage} of {totalPages}</span>
              <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

