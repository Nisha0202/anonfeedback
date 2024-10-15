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

export const metadata: Metadata = {
  title: "AnonFeedback",
  description: "AI-Powered Anonymous Feedback Platform",
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
