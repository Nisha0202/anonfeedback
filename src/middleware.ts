import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
export {default} from 'next-auth/middleware'


export async function middleware(request:NextRequest) {

    const token = getToken({req: request});
    const url = request.nextUrl;


    return NextResponse.redirect(new URL('home', request.url))


    
}

// Matching paths
export const config ={
    matcher: ['/sigup',
        '/signin',
        '/verify/:path*'
        ]
}