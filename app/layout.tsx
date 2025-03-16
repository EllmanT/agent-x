import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temba",
  description: "Temba is an advanced AI agent with access to powerful tools, including Google Books queries, YouTube video transcripts, Wikipedia, and custom datasets. Powered by latest NextJS technology, IBMs WXFlows Engine and language models like Claude, Temba can answer any question, automate tasks, and provide intelligent solutions across various industries."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
 <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ConvexClientProvider>
   
  );
}
