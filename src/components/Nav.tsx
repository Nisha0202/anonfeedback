'use client';
import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const username = session?.user.userName;
  const NavItems = () => (
    <>
      <Link href="/" title="Home" className="hover:text-gray-950 text-sm">
        Home
      </Link>
      <Link href="/dashboard" className="hover:text-gray-950 text-sm">
        Dashboard
      </Link>
      {session?.user && 
        <Link href={`/you/${username}`} className="hover:text-gray-950 text-sm">
          Message
        </Link>
    

      }

    </>
  );

  const toggleLogin = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" title="Home" className="flex-shrink-0 flex items-center">

              <span className="ml-2 text-lg font-bold ">AnonFeedback</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <NavItems />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center text-sm">
            <div onClick={toggleLogin}>
              {session ? (
                <div className="flex gap-4 items-center justify-between">
                  <div className=''>
                    Hi <span className='text-rose-700 cursor-pointer' onClick={(e) => e.stopPropagation()}>@{session?.user.userName}</span> 🥰
                  </div>

                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="text-sm font-medium rounded-sm border-2"
                  >
                    Sign Out
                  </Button>
                </div>

              ) : (
                <>

                  <Button onClick={() => signIn()} className="bg-rose-700  hover:bg-rose-600 rounded-sm  border border-transparent 
                  text-sm font-medium text-white ">
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>


          <div className="flex items-center sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                </Button>
              </SheetTrigger>





              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className=" px-5">
                  <div className='mt-6'>
                    {session &&
                      <div className="flex flex-col gap-4 items-start text-sm">
                        <div className=''>Hi <span className='text-rose-700'>@{session?.user.userName}</span> 🥰</div>

                      </div>
                    }
                  </div>


                  <div className="mt-4">
                    <nav className="grid gap-y-4">
                      <NavItems />
                    </nav>
                  </div>
                </div>

                <div className="px-5">
                  {session ? (
                    <div className="flex flex-col items-start text-sm pt-4">

                      <Button onClick={() => signOut()} variant="outline" className="text-sm font-medium rounded-sm">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => signIn()} className="mt-4 bg-rose-700  hover:bg-rose-600 rounded-sm  border border-transparent 
                  text-sm font-medium text-white">

                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
