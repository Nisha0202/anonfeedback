import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
export {default} from 'next-auth/middleware'


export async function middleware(request:NextRequest) {

    const token = await getToken({req: request});
    const url = request.nextUrl;


   
if(!token && (
    url.pathname.startsWith('/signup') ||
    url.pathname.startsWith('/signin') ||
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/verify')
)){
    return NextResponse.redirect(new URL('dashboard', request.url))
}

     return NextResponse.redirect(new URL('/', request.url))
}

// Matching paths
export const config ={
    matcher: ['/sigup',
        '/signin',
        '/dashboard',
        '/verify/:path*'
        ]
}