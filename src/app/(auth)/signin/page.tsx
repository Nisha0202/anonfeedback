
'use client'
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button className="px-3 py-1w-24 h-8 border-2 bg-black text-white rounded text-sm" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="px-3 py-1 w-24 h-8 border-2 bg-black text-white rounded text-sm" onClick={() => signIn()}>Sign in</button>
    </>
  )
}