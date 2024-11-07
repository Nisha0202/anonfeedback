'use client';

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] pb-8 bg-gray-100">
      <h1 className="text-xl font-bold mb-6">Not found – 404!</h1>
      
      {/* Funny GIF */}
      <img 
        src="https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif?cid=790b761174y0sq5zxcsymyqk3lnqed1qdkj5cbmvl59984c9&ep=v1_gifs_search&rid=giphy.gif&ct=g" 
        alt="404 Error Gif" 
        className="mb-6 size-32"
      />

      {/* Link to go back home */}
      <div>
        <Link href="/" className="font-medium text-gray-50 rounded-sm bg-rose-700  hover:bg-rose-600 px-4 py-2">Go back to Home
        </Link>
      </div>
    </div>
  )
}
