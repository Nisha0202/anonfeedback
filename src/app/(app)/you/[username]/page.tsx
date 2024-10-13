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

  //   // Compliments
  //   "I just adore how you always light up the room!",
  //   "Your kindness is as warm as a summer breeze, honey.",
  //   "You are sharper than a tack and twice as charming.",
  //   "Sweetheart, you have such a way with words!",
  //   "My stars, you have a heart as big as Texas!",
  //   "You have the patience of a saint, bless your heart.",
  //   "You always seem to find the silver lining, do you not?",
  //   "Well, sugar, you make hard work look effortless.",
  //   "Darlin, you have the most beautiful soul I have ever seen.",
  //   "Your smile could rival the sunshine, my dear.",
  //   "You are as sweet as peach cobbler on a Sunday afternoon!",
  //   "You have such a lovely way of making everyone feel at home.",
  //   "Your work ethic is as strong as a Southern oak tree.",
  //   "Honey, you have style for days!",
  //   "You always bring a touch of grace and elegance to everything.",
  //   "You are just the bees knees, you know that?",
  //   "Why, you have a mind like a steel trap, sweetheart.",
  //   "You are always so thoughtful and considerate.",
  //   "You are as dependable as the tides, sugar.",
  //   "Darlin, you are the embodiment of Southern hospitality.",
  //   "Your laugh is as infectious as a good ol belly laugh at a family reunion.",
  //   "You are as bright as a firefly on a summer’s night.",
  //   "Honey, you are a ray of sunshine on even the gloomiest day.",
  //   "You have got an eye for detail that is just amazing.",
  //   "You are as charming as a magnolia in full bloom.",
  //   "You are sweeter than iced tea on a hot day!",
  //   "You are as resourceful as a squirrel in the fall.",
  //   "My goodness, you have got such a way of making folks feel appreciated.",
  //   "Your creativity is boundless, honey!",
  //   "You are as graceful as a swan gliding across the pond.",
  //   "You are as strong and steady as a river current.",
  //   "You have got a head for business and a heart for people.",
  //   "You are as refreshing as a cool breeze on a hot day.",
  //   "Darlin, you have got more charm than a basket full of kittens.",
  //   "Your energy is positively contagious!",
  //   "You are as radiant as a Southern sunrise.",
  //   "Well, are you not just the most talented person in the room!",
  //   "You have got a heart of gold, sugar.",
  //   "You are as reliable as grandma’s biscuit recipe.",
  //   "You are a natural-born leader, darlin.",
  //   "Honey, you have such a generous spirit.",
  //   "You have such a quick wit, it is delightful!",
  //   "You are as sweet as a Georgia peach!",
  //   "You have got the strength of a Southern pine, sugar.",
  //   "You have a mind for solutions, and I admire that.",
  //   "Why, you are the kind of person folks just love to be around.",
  //   "You have got the best ideas, I swear!",
  //   "Honey, you make everything seem a little brighter.",
  //   "You are more dependable than a rocking chair on the front porch.",
  //   "You have got the biggest heart in the room, darlin.",
  //   "Sweetheart, you have a way of making everyone feel special.",
    
  //   // Facts
  //   "Did you know that magnolias are one of the oldest flowering plants?",
  //   "In the South, we love our sweet tea strong and sweet, just like our people!",
  //   "The Southeast is known for its rich history in blues and jazz music.",
  //   "Georgia is famous for its peaches, but did you know it is also a major peanut producer?",
  //   "Southern hospitality is more than a saying; it is a way of life down here.",
  //   "The first ever American gold rush happened in Dahlonega, Georgia.",
  //   "Charleston, South Carolina, is one of the oldest cities in the United States.",
  //   "Sweet tea was first popularized in the South in the 1800s.",
  //   "The longest river in the Southeast is the Mississippi River.",
  //   "Florida’s Everglades is the only place where alligators and crocodiles coexist.",
  //   "The Appalachian Trail runs through the Southeast and spans over 2,000 miles.",
  //   "Louisiana is known for its vibrant and unique Creole and Cajun culture.",
  //   "The Kentucky Derby, known as the most exciting two minutes in sports, takes place in Louisville.",
  //   "Did you know Elvis Presley was born in Tupelo, Mississippi?",
  //   "In the South, barbecue is not just a meal; it is an event!",
  //   "The Spanish moss draping the trees is a common sight in the Southeast.",
  //   "Southern accents can vary significantly depending on the region.",
  //   "Nashville, Tennessee, is famously known as Music City, USA.",
  //   "Bluegrass music has its roots in the Appalachian region.",
  //   "Coca-Cola was invented in Atlanta, Georgia, in 1886.",
  //   "The Great Smoky Mountains are one of the most visited national parks in the country.",
  //   "The word yall is a contraction of you all and is widely used in the South.",
  //   "Did you know the world’s first public university was the University of Georgia?",
  //   "Mobile, Alabama, is home to the original American Mardi Gras.",
  //   "The first European settlers in the Southeast were the Spanish in Florida.",
  //   "The sweet potato is a staple in Southern cuisine.",
  //   "The Southeast region is known for its hot, humid summers and mild winters.",
  //   "Southern literature has a rich tradition, with writers like William Faulkner and Flannery OConnor.",
  //   "The Southern live oak tree is a symbol of strength and longevity.",
  //   "In the South, front porch sittin is considered an art form.",
  //   "Did you know okra is a key ingredient in gumbo, a popular Southern dish?",
    
  //   // Questions
  //   "Well, sugar, how has your day been going?",
  //   "Have you tried any new recipes lately, sweetheart?",
  //   "Do you have a favorite spot to relax around here, darling?",
  //   "Would you not say it is just the perfect day for a stroll?",
  //   "What has been on your mind, honey?",
  //   "Have you read any good books lately, sugar?",
  //   "How do you like your sweet tea, with lemon or without?",
  //   "Well now, what is your favorite Southern comfort food?",
  //   "What is the best part of your day so far, darlin?",
  //   "How can I lend you a hand today, sweetheart?",
  //   "Have you ever been to a proper Southern barbecue, sugar?",
  //   "How do you keep that lovely smile on your face, honey?",
  //   "What is one thing you are looking forward to this week?",
  //   "What is your favorite way to spend a Sunday afternoon, sugar?",
  //   "How do you like to unwind after a long day, darling?",
  //   "What is your favorite Southern tradition, sweetheart?",
  //   "Well, tell me, how do you take your grits?",
  //   "What is your favorite thing about living in the South?",
  //   "If you could visit anywhere in the South, where would it be?",
  //   "What is something new you have learned recently, darling?",
  //   "How is your family doing, sugar?",
  //   "Is this not just the perfect weather for porch sittin?",
  //   "What is a dream you have been working towards lately?",
  //   "If you could have dinner with anyone, who would it be?",
  //   "What is your go-to comfort food, sweetheart?",
  //   "Do you have any favorite Southern sayings?",
  //   "What do you love most about your work, darling?",
  //   "How do you stay so positive, sugar?",
  //   "What is your favorite way to spend time with friends?",
  //   "How do you keep yourself motivated, honey?",
  //   "Have you ever tried making homemade biscuits?",
  //   "Well, what is the best advice you have ever received, sugar?",
  //   "Do you prefer a sunrise or a sunset, darlin?",
  //   "What is something that never fails to make you smile?",
  //   "What is one thing you are really proud of, honey?",
  //   "Have you discovered any new hobbies lately?",
  //   "How do you like to celebrate the little things in life?",
  //   "What is your favorite type of music, sugar?",
  //   "What is the nicest compliment you have ever received?",
  //   "How do you like to spend time with your family?",
  //   "What is a piece of wisdom you would like to share?",
  //   "Have you ever been to a barn dance or a hoedown?",
  //   "What is something you are grateful for today?",
  // ];
  
  
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
      // console.log(response);
      // console.log("hi",response.data);
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
    <div className="flex justify-center items-center border-2 min-h-[99vh] bg-gray-50">
      <div className="px-4 md:px-8 lg:px-12 bg-gray-100 py-12 rounded">
        <Link href="/" title="Home" className="text-xl lg:text-2xl font-bold mb-12">
          Share Feedback Anonymously on
          <span className="text-rose-700"> AnonFeedback</span>
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
