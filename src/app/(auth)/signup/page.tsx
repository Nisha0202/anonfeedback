'use client'
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/schemas/signUpSchema"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Divide, Loader2 } from "lucide-react"
import Link from 'next/link';

function SignInForm() {
  const [username, setUsername] = useState(''); // Stores the input value of the username
  const [usernameMessage, setUsernameMessage] = useState(''); // Stores validation or status messages for the username
  const [isUsernameChecking, setIsUsernameChecking] = useState(false); // To track if the username is being checked (for uniqueness)
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if the form is being submitted


  const debounced = useDebounceCallback(setUsername, 2000)// The value will only update after the user has stopped typing for 500 milliseconds
  const { toast } = useToast();
  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });


  useEffect(() => {
    const checkUsernameUnique = async () => {
      // console.log("hii", username);
    
      // Prevent API call if username is empty

      if (username.trim().length == 0) {
        return;
      }

      if (username.trim().length < 3) {  
        setIsUsernameChecking(true);
        setUsernameMessage('Username must be at least 3 characters long and unique.');
        setIsUsernameChecking(false);
        return;
      }





      try {
        setIsUsernameChecking(true);
        const response = await axios.get(`/api/check-username?username=${username}`);

        console.log(response.data);
          setUsernameMessage('');
          setUsernameMessage(response.data.message);
        

        setIsUsernameChecking(false);
      } catch (error) {
        const axioserror = error as AxiosError<ApiResponse>;

        if (axioserror.response) {
          // Server responded with a status code other than 2xx
          toast({
            title: "Failed",
            description: axioserror.response.data.message,
          });
        } else if (axioserror.request) {
          // Request was made but no response received
          toast({
            title: "Network Error",
            description: "No response received. Please check your network connection.",
          });
        } else {
          // Something else happened in setting up the request
          toast({
            title: "Error",
            description: axioserror.message || 'An unknown error occurred',
          });
        }
      }

    };

    checkUsernameUnique();
  }, [username]);


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>('/api/signup', data);

      // Check if the response status is 2xx
      if (response.status == 201) {
        toast({
          title: "Success",
          description: response.data.message,
        });

        // Navigate only after successful sign-up
        // setTimeout(() => {router.replace(`/verify/${data.username}`);},3000);


      } else {
        toast({
          title: "Sign up failed",
          description: response.data.message || "Unexpected error occurred during sign-up.",
        });
      }

    } catch (error) {
      const axioserror = error as AxiosError<ApiResponse>;
      console.log(axioserror);

      if (axioserror.response) {
        // Server responded with a status code other than 2xx
        toast({
          title: "Failed",
          description: axioserror.response.data.message,
        });
      } else if (axioserror.request) {
        // Request was made but no response received
        toast({
          title: "Network Error",
          description: "No response received. Please check your network connection.",
        });
      } else {
        // Something else happened in setting up the request
        toast({
          title: "Error",
          description: axioserror.message || 'An unknown error occurred',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="border-2 min-h-[99vh] grid place-items-center ">

      <div className="w-full max-w-md px-4 py-8 md:px-8 md:border-2  rounded-md">
        <div className="text-center mb-8 space-y-1">

          <h1 className="text-xl lg:text-2xl font-bold">AnnonFeedback</h1>
          <p className="text-sm text-gray-600">Signup to start your anonymous adventure</p>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Nisha" className="rounded-sm"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          debounced(e.target.value)
                          setUsername(e.target.value)
                        }}


                      />
                    </FormControl>

                    {isUsernameChecking && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin " />
                        <span>Checking if username available...</span>
                      </div>
                    )}
                    {usernameMessage && (
                      <div className={usernameMessage.includes("available") ? "text-green-500" : "text-red-500"}>
                        {usernameMessage}
                      </div>
                    )}


                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" className="rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password" className="rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full font-medium rounded-sm bg-rose-600 hover:bg-rose-500"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>


            </form>



          </Form>

          <div className="mt-4 w-full text-center text-sm text-gray-600" >
            <h1>Already a signed up? <Link href='/signin' className="text-rose-600 font-medium hover:text-rose-500">Sign In</Link></h1>
          </div>



        </div>

      </div>



    </div>
  )
}

export default SignInForm
