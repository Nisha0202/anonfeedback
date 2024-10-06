'use client'
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className="px-4 py-2 border-2 bg-black" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="px-4 py-2 border-2 bg-black"  onClick={() => signIn()}>Sign in</button>
    </>
  )
}