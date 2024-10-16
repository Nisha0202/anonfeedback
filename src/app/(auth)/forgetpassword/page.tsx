'use client'
import React, { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { ArrowLeftCircleIcon, Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);



    try {

      const result = await axios.get('/api/forget-password', {
        params: {
          identifier: data.identifier,
          password: data.password,
        }
      });
      if (result.data.success) {
        const username = result.data.message;
        const response = await axios.post<ApiResponse>('/api/forget-password', data);

        // Check if the response status is 2xx
        if (response.status == 201) {
          toast({
            title: "Success",
            description: response.data.message,
          });

          // Navigate only after successful sign-up
          setTimeout(() => { router.replace(`/verify/${username}`); }, 2000);

        } else {
          toast({
            title: "Failed",
            description: response.data.message || "Unexpected error occurred during sign-up.",
          });
        }
      } else {
        toast({
          title: "Failed",
          description: result.data.message || "Unexpected error occurred during sign-up.",
        });


    } }catch (error) {
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
    <div className=" min-h-[99vh] grid place-items-center ">

      <div className="w-full max-w-md px-6 py-8 sm:px-6 lg:px-8 md:px-10  border-2  rounded-md">
        <div className=" mb-8">
          <div className="flex gap-2 items-center">
            <Button onClick={() => history.back()} title="Back" className="p-0 bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-300 rounded-full">
              <ArrowLeftCircleIcon className="w-5 h-5" />
            </Button>
            <Link href={'/'} className="text-xl lg:text-2xl font-bold">AnonFeedback</Link>
          </div>


          <div className="text-sm text-start text-gray-600 mt-1">Enter your email and we will help you reset password!</div>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">

              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input placeholder="email or username" className="rounded-sm"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setIdentifier(e.target.value); // Update identifier state
                        }}
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
                    <FormLabel>Set New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password" className="rounded-sm"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value); // Update identifier state
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />

              <Button
                type="submit"
                disabled={isSubmitting || !identifier || !password}
                className="w-full font-medium text-gray-50 rounded-sm bg-rose-700  hover:bg-rose-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>


            </form>



          </Form>

          <div className="mt-4 w-full text-center text-sm text-gray-600" >
            <h1>Never registered? <Link href='/signup' className="text-rose-700 font-medium hover:text-rose-600 hover:font-semibold">Sign Up</Link></h1>
          </div>



        </div>

      </div>



    </div>
  )
}

export default SignInForm















