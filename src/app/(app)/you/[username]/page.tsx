"use client"

import { useState } from "react"
import { Send, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const suggestedMessages = [
  "I appreciate your hard work on the recent project.",
  "Your presentation skills have really improved.",
  "I think we could improve our team communication.",
  "Thank you for always being helpful and supportive.",
  "I'd like to discuss ways we can enhance our workflow.",
]

export default function MessageInput() {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", message)
      // Clear the input after sending
      setMessage("")
    }
  }

  const handleSuggestMessage = () => {
    const randomIndex = Math.floor(Math.random() * suggestedMessages.length)
    setMessage(suggestedMessages[randomIndex])
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
             <h1 className="text-xl lg:text-2xl font-bold">
            Share Feedback Anonymously on<span className="text-rose-600"> AnonFeedback</span>
          </h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Write Your Anonymous Message</h2>
      <div className="space-y-4">
        <Textarea
          placeholder="Type your anonymous message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-between items-center">
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
            disabled={!message.trim()}
            className="flex items-center space-x-2 font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}