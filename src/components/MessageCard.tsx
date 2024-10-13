import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
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
import { X } from 'lucide-react'
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
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><span><X className='w-4 h-4' /></span></Button>
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
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    )
}