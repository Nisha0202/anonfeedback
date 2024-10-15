import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "AnonFeedback",
//   description: "AI-Powered Anonymous Feedback Platform",
// };


export const metadata: Metadata = {
  title: "AnonFeedback",
  description: "AI-Powered Anonymous Feedback Platform",
  metadataBase: new URL("https://anonfeedback0.vercel.app"),
  openGraph: {
    title: "AnonFeedback",
    description: "",
    url: 'https://anonfeedback0.vercel.app/',
    siteName: "AI-Powered Anonymous Feedback Platform",
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        secureUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        width: 1200,
        height: 630,
        alt: '',
      }
    ]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-700  grid min-h-[100vh] grid-rows-[auto_1fr_auto]`}
        >
          {children}
          <Toaster />
        </body>
      </AuthProvider>

    </html>
  );
}
