"use client";
import Navbar from "@/components/Navbar";
import Logo from "../../commons/Logo";
import { ArrowRight, FileText, Video, Mic, AudioLines, Image, Send, Diameter } from "lucide-react";
import ReasonsToChoose from "@/components/Reasons";
import TargetAudience from "@/components/TargetAudience";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const navItems = [
    {
      title: "Tools",
      sublinks: [
        {
          title: "PDF Summary",
          href: "/pdf-summary",
          description: "Summarize PDF documents using AI technology.",
          icon: <FileText className="w-4 h-4 text-purple-400" />
        },
        {
          title: "YouTube Video Summary",
          href: "/youtubeSummary",
          description: "Get concise summaries of YouTube videos.",
          icon: <Video className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Podcast Summary",
          href: "/podcast-summary",
          description: "Extract key points from your favorite podcasts.",
          icon: <Mic className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Resume Analyzer",
          href: "/resumeAnalyzer",
          description: "Analyze and enhance your resume for job applications.",
          icon: <Send className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Text to Audio",
          href: "/text-to-audio",
          description: "Convert text into natural-sounding audio.",
          icon: <AudioLines className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Text to Diagram",
          href: "/text-to-diagram",
          description: "Transform text descriptions into visual diagrams.",
          icon: <Diameter className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Text to Image",
          href: "/text-to-image",
          description: "Generate images from textual descriptions.",
          icon: <Image className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Image to Text",
          href: "/image-to-text",
          description: "Extract text from images with OCR technology.",
          icon: <FileText className="w-4 h-4 text-purple-400" />
        },
        {
          title: "Job Cover Letter",
          href: "/job-cover-letter",
          description: "Generate a professional cover letter based on your resume.",
          icon: <Send className="w-4 h-4 text-purple-400" />
        },
      ],
    },
    {
      title: "Pricing",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-black">
        {/* Navbar Section */}
        <div className="flex flex-row mx-20 items-center p-5 justify-between">
          <Logo />
          <Navbar navItems={navItems} />
        </div>

        {/* Main Gradient Section */}
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-11/12 h-full bg-gradient-to-r from-black to-[#2f2d32] p-16 rounded-lg flex flex-col items-center justify-center shadow-lg">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your All-in-One AI Platform
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Turn your words into captivating images, posts, and stories— 
              <span className="text-purple-400"> effortlessly.</span>
            </p>

            {/* Call-to-Action Button */}
            <button
              onClick={() => router.push("/signup")}
              className="bg-white text-black px-6 py-3 text-lg rounded-full font-medium flex items-center space-x-2 mx-auto"
            >
              <span>Start free today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
      <ReasonsToChoose />
      <TargetAudience />
      <Footer />
    </>
  );
}
