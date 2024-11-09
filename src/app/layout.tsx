import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "../../commons/Fonts";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-black text-white font-sans antialiased min-h-screen",
          poppins.className
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
