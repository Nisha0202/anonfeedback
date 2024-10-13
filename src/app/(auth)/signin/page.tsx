
'use client'
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
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
import { Divide, Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"

function SignInForm() {
const [isSubmitting, setIsSubmitting] = useState(false); // To track if the form is being submitted

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
        const result = await signIn('credentials', {
          redirect: false,
          email: data.identifier,
          password: data.password
        });
    
        if (result?.error) {
          let errorMessage = "Sign In Failed";
          if (result.error.includes("credentials")) {
            errorMessage = "Invalid credentials. Please check your email or password.";
          } else if (result.error.includes("email")) {
            errorMessage = "Email not found. Please sign up first.";
          }
    
          toast({
            title: errorMessage,
            description: 'Invalid credentials.',
            variant: 'destructive'
          });
    
        } else if (result?.url) {
          toast({
            title: "Success",
            description: "Sign in successful.",
          });
    
          setTimeout(() => { router.replace('/') }, 1400);
        }
    
      } catch (error) {
        toast({
          title: "Unexpected Error",
          description:  "An unknown error occurred.",
          variant: 'destructive'
        });

      } finally {
        setIsSubmitting(false);
      }
    };
    


  return (
    <div className=" min-h-[99vh] grid place-items-center ">

      <div className="w-full max-w-md px-6 py-8 sm:px-6 lg:px-8 md:px-10  md:border-2  rounded-md">
        <div className="text-center mb-8 space-y-1">

          <Link href={'/'} className="text-xl lg:text-2xl font-bold">AnnonFeedback</Link>
          <p className="text-sm text-gray-600">Signup to start your anonymous adventure</p>
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
                      <Input  placeholder="email or username" className="rounded-sm"
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
  <br />

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
                  'Sign In'
                )}
              </Button>


            </form>



          </Form>

          <div className="mt-4 w-full text-center text-sm text-gray-600" >
            <h1>New here? <Link href='/signup' className="text-rose-600 font-medium hover:text-rose-500">Sign Up</Link></h1>
          </div>



        </div>

      </div>



    </div>
  )
}

export default SignInForm















