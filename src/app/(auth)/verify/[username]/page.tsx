'use client'
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { verifySchema } from "@/schemas/verifySchema"
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
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function VerifyAccount() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsVerifying(true);
    try {

      const response = await axios.post('/api/verify-code', {
        username: param.username,
        code: data.code
      })

      if (response.status == 200) {
        toast({
          title: "Verified",
          description: response.data.message,
        });

        //   Navigate only after successful sign-up
        setTimeout(() => { router.replace('/signin'); }, 2000);


      } else {
        toast({
          title: "Verification failed",
          description: response.data.message || "Unexpected error occurred during sign-up.",
          variant: 'destructive'
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
          description: axioserror.request.data.message || "No response received. Please check your network connection.",
        });
      } else {
        // Something else happened in setting up the request
        toast({
          title: "Error",
          description: axioserror.message || 'An unknown error occurred',
        });
      }
    } finally {
      setIsVerifying(false)
    }



  }

  return (
    <div className="min-h-[99vh] grid place-items-center ">

      <div className="w-full max-w-md px-4 py-8 md:px-8 md:border-2  rounded-md">
        <div className="text-center mb-8 space-y-1">

          <h1 className="text-xl lg:text-2xl font-bold">AnonFeedback</h1>
          <p className="text-sm text-gray-600">Please check your registered email for the verification code</p>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-sm">

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verfy Code</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxx" className="rounded-sm"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setCode(e.target.value)

                        }}


                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button
                type="submit"
                disabled={isVerifying || !code}
                className="flex items-center justify-center w-full font-medium rounded-sm bg-rose-700  hover:bg-rose-600"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
            </form>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default VerifyAccount