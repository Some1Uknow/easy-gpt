import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyGPT",
  description: "AI PDF Summaries, YouTube Video Summaries, Social Media Posts Generator, Text to Audio, Text to Image and much more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>{children}</body>
    </html>
  );
}
