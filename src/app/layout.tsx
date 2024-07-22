import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyGPT",
  description:
    "AI PDF Summaries, YouTube Video Summaries, Social Media Posts Generator, Text to Audio, Text to Image and much more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-black text-white font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {" "}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
