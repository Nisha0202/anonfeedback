import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
export {default} from 'next-auth/middleware'


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user has a token and is trying to access sign-in or sign-up, redirect to dashboard
  if (token && (
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/signin')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to sign-in, sign-up, and verification routes if no token exists
  if (!token && (
      url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify')
  )) {
    return NextResponse.next(); // Let the user access these pages
  }

  // Redirect to home if trying to access dashboard or other protected routes without token
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Default to allowing the request to continue
  return NextResponse.next();
}

// Matching paths
export const config = {
  matcher: [
    '/signup',
    '/signin',
    '/dashboard',
    '/verify/:path*',
  ],
};
