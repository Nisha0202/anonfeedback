import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,

} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MessageSquare, Pin, PinOff, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { Message } from '@/model/Message'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

import { ApiResponse } from '@/types/ApiResponse'

type MessageCardProps = {

    message: Message,
    onMessageDelete: (messageId: string) => void
    onPinToggle: (messageId: string, pin: boolean) => void
}
export default function MessageCard({ message, onMessageDelete, onPinToggle }: MessageCardProps) {
    const { toast } = useToast();

    const handleDelete = async () => {
        const res = await axios.delete<ApiResponse>(`/api/message-delete/${message._id}`)

        if (res.status == 200) {
            toast({
                title: "Deleted",
                description: res.data.message,
            });

            onMessageDelete(message._id.toString());

        }
        else {
            toast({
                title: "Failed",
                description: res.data.message,
            });
        }
    }
    const handlePinToggle = () => {
        onPinToggle(message._id, !message.isPinned); // Call the function with the ID and the new state
    };



    return (
        <Card>
            <CardHeader>
                <CardDescription><MessageSquare className='w-4 h-4 inline-block mr-1' />Feedback</CardDescription>
            </CardHeader>
            <CardContent className='h-20'>
                <p>{message.content}</p>
            </CardContent>
            <CardFooter className='text-sm mt-4'>
                <p className='flex-1 text-gray-600'>{new Date(message.createAt).toLocaleString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: 'numeric', minute: 'numeric', hour12: true
                })}</p>
                <Button onClick={handlePinToggle} variant={'outline'} className='mr-2'>
                    {message.isPinned ? (
                        <PinOff className='w-4 h-4 text-gray-700' />
                    ) : (
                        <Pin className='w-4 h-4 text-rose-700' />
                    )}
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={'outline'}><span><Trash className='w-4 h-4 text-red-600' /></span></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove the data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>

    )
}
