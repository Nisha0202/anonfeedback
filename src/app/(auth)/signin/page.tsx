'use client'
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useDebounceValue } from 'usehooks-ts'
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
import { Loader2 } from "lucide-react"
import Link from 'next/link'; 

function SignInForm() {
  const [username, setUsername] = useState(''); // Stores the input value of the username
  const [usernameMessage, setUsernameMessage] = useState(''); // Stores validation or status messages for the username
  const [isUsernameChecking, setIsUsernameChecking] = useState(false); // To track if the username is being checked (for uniqueness)
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if the form is being submitted
  const [debouncedValue, setValue] = useDebounceValue(username, 500) // The value will only update after the user has stopped typing for 500 milliseconds
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

    //checking
    const checkUsernameUnique = async () => {

      if (debouncedValue) {
        setIsUsernameChecking(true);
        setUsernameMessage('');
      }
      try {
        const response = await axios.get(`/api/check-username?username=${debouncedValue}`);
        console.log(response.data);
        setUsernameMessage(response.data.message);


      } catch (error) {
        const axioserror = error as AxiosError<ApiResponse>;
        setUsernameMessage(axioserror.response?.data.message || 'Unexpected Error');
      } finally {
        setIsUsernameChecking(false);
      }
    }
     checkUsernameUnique();


  }, [debouncedValue]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('api/signg-up', data);


      toast({
        title: "Success",
        description: response?.data.message,
      })

      router.replace(`/verify/${username}`);


    } catch (error) {

      const axioserror = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description: axioserror.response?.data.message || 'Unexpected Error while Submitting',
      })



    } finally {
      setIsSubmitting(false);
    }





  }




  return (
    <div className="flex items-center justify-center">

      <div className="w-full max-w-md p-8">
        <div className="text-center">

          <h1>AnnonFeedback</h1>
          <p>Signup to start your anonymous adventure</p>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-x">

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setUsername(e.target.value)
                        }}


                      />
                    </FormControl>
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
                      <Input type="email" placeholder="username"
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
                      <Input type="password" placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ?(<><Loader2 className="mr-2 h-4 w-4"/> Please wait...</>):('Sign Up')}
              </Button>

            </form>



          </Form>

          <div>
            <h1>Already a signed up? <Link href='/signin' >Sign In</Link></h1>
          </div>



        </div>

      </div>



    </div>
  )
}

export default SignInForm