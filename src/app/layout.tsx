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
  metadataBase: new URL("https://anonfeedback0.vercel.app"),
  openGraph: {
    title: "AnonFeedback",
    description: "AI-Powered Anonymous Feedback Platform",
    url: 'https://anonfeedback0.vercel.app/',
    siteName: "AI-Powered Anonymous Feedback Platform",
    type: 'website',
    images: [
      {
        url: 'https://i.pinimg.com/enabled_lo/564x/5d/ed/f7/5dedf72913c8162747720d41f4d956d1.jpg',
        secureUrl: 'https://i.pinimg.com/enabled_lo/564x/5d/ed/f7/5dedf72913c8162747720d41f4d956d1.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Anonymous Feedback Platform',
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: 'AnonFeedback',
    title: 'AnonFeedback',
    description: 'AI-Powered Anonymous Feedback Platform',
    creator: '@yesdavidgray',
    images: {
      url: `https://i.pinimg.com/enabled_lo/564x/5d/ed/f7/5dedf72913c8162747720d41f4d956d1.jpg`,
      alt: `Preview image for AnonFeedback`,
    },
  },

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
