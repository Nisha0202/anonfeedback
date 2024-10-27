'use client';
import React, { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, CopyIcon, ArrowLeftCircleIcon, ArrowRightSquare, ArrowLeftSquare } from "lucide-react";
import MessageCard from "@/components/MessageCard"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Switch } from "@/components/ui/switch";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { Message } from "@/model/Message"
import { handleAxiosError } from '@/components/response/axiosErrorHandler'
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

// Optimistically update the local state
  const handleDelete = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  // // Pin message
  const handlePinToggle = async (messageId: string, pin: boolean) => {

    if (!pin) {
      const sortedMessages = [...messages].sort((a, b) => {
          // If unpinned sort by createdAt
          return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
     
      });
      setMessages(sortedMessages);
    }
   
    // Optimistically update the local state
    setMessages((prevMessages) => {
      // Update the message's pinned status
      const updatedMessages = prevMessages.map((message) =>
        message._id === messageId
          ? ({ ...message, isPinned: pin } as Message) // Update the isPinned status
          : message
      );
  
      // Sort messages to have pinned messages first
      return updatedMessages.sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0; // If both are pinned or unpinned, keep order
        return a.isPinned ? -1 : 1; // Pinned messages first
      });
    });
  
    try {
      const response = await axios.patch(`/api/pin-message/${messageId}`, { isPinned: pin });
      toast({ title: response.data.message });
    } catch (error) {
      handleAxiosError(error as AxiosError<ApiResponse>, toast);
    }
  };

   const fetchAcceptMessage = useCallback(async () => {
    setSwitchLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessage);
    } catch (error) {
      handleAxiosError(error as AxiosError<ApiResponse>, toast);
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
      handleAxiosError(error as AxiosError<ApiResponse>, toast);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user, toast]);

  useEffect(() => {
    if (!session || !session.user) return;

    const username = session?.user.userName;
    const url = `${window.location.origin}/you/${username}`;
    setProfileUrl(url);
    fetchMessages();
    fetchAcceptMessage();
  }, [session?.user, fetchMessages]);

  
  const handleSwitchChange = async () => {
    setSwitchLoading(true);
    try {
      await axios.post('/api/accept-messages', { acceptMessages: !acceptMessages });
      setValue('acceptMessages', !acceptMessages); // Optimistic UI update
      toast({ title: "Settings updated successfully.", variant: 'default' });
    } catch (error) {
      handleAxiosError(error as AxiosError<ApiResponse>, toast);
    } finally {
      setSwitchLoading(false);
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

  const MemoizedMessageCard = React.memo(MessageCard);

  if (!session || !session.user) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center text-gray-400 hover:text-gray-300 rounded-full">
            <ArrowLeftCircleIcon className="w-5 h-5" />
          </Link>

          <h1 className="text-xl lg:text-2xl font-bold">Please Sign In</h1>
        </div>

      </div>
    );
  }



  return (
    <div className="container py-8 px-3 mx-auto">
      {/* header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center text-gray-400 hover:text-gray-300 rounded-full">
            <ArrowLeftCircleIcon className="size-5" />
          </Link>
          <Link href={'/'} className="text-xl lg:text-2xl font-bold" title="Home">AnonFeedback Dashboard</Link>
        </div>

        {/*refresh */}
        <Button onClick={() => fetchMessages(true)} size={'sm'} title="Refresh" className="p-0 bg-transparent hover:bg-transparent">
          <RefreshCw className="h-4 w-4 text-black" />
        </Button>
      </div>


      <div className="mt-2 flex flex-col lg:flex-row gap-2  items-start lg:items-center justify-start lg:justify-between">
      {/* accept messages */}
        <div className="flex items-center gap-x-3 +">

          <span className="text-sm">Accepting Messages</span>
          <Switch
            className="h-5 w-10"
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
        </div>


        <div className="">
          {acceptMessages && <div className="text-sm flex items-center">
            {profileUrl}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyUrl} variant="outline" size='sm' className="ms-3 flex items-center">
                    <CopyIcon className="size-3" />
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
          <div className="flex flex-wrap md:justify-start justify-center items-center lg:gap-6 gap-4  mt-12">
            {messages.length > 0 ? (
              currentMessages.map((message) => (
                <MemoizedMessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDelete}
                  onPinToggle={handlePinToggle}
                />
              ))
            ) : (
              <div className="mt-8">No messages found.</div>
            )}
          </div>
          <div className="mt-auto pt-12 ">
            {totalPages > 1 && (
              <div className="mt-auto flex justify-center space-x-2 text-sm ">
                <Button className="text-gray-400 hover:text-gray-500" variant={"outline"} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  <ArrowLeftSquare />
                </Button>
                <span className="flex items-center text-gray-600">Page {currentPage} of {totalPages}</span>
                <Button className="text-gray-400 hover:text-gray-500" variant={"outline"} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                  <ArrowRightSquare />
                </Button>
              </div>
            )}

          </div>

        </>
      )}
    </div>
  );
}

