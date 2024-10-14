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
import { Trash} from 'lucide-react'
import { Button } from './ui/button'
import { Message } from '@/model/Message'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

import { ApiResponse } from '@/types/ApiResponse'

type MessageCardProps = {

    message: Message,
    onMessageDelete: (messageId: string) => void
}
export default function MessageCard({ message, onMessageDelete }: MessageCardProps) {
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


    return (
        <Card className=''>
            <CardHeader>

                <CardDescription>Message</CardDescription>
            </CardHeader>
            <CardContent className='h-20'>
                <p>{message.content}</p>
            </CardContent>
            <CardFooter className='text-sm '>
                <p className='flex-1 text-gray-600'>{new Date(message.createAt).toLocaleString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: 'numeric', minute: 'numeric', hour12: true
                })}</p>

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
