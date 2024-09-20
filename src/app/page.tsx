import Navbar from "@/components/Navbar";
import Logo from "../../commons/Logo";
import { ArrowRight } from "lucide-react";
import ReasonsToChoose from "@/components/Reasons";
import TargetAudience from "@/components/TargetAudience";
import Footer from "@/components/Footer";

export default function Page() {
  const navItems = [
    {
      title: "AI Products",
      sublinks: [
        {
          title: "PDF Summary",
          href: "/pdf-summary",
          description: "Summarize PDF documents using AI technology.",
        },
        {
          title: "YouTube Video Summary",
          href: "/youtube-summary",
          description: "Get concise summaries of YouTube videos.",
        },
        {
          title: "Audio Summary",
          href: "/audio-summary",
          description: "Summarize audio content quickly and efficiently.",
        },
        {
          title: "Podcast Summary",
          href: "/podcast-summary",
          description: "Extract key points from your favorite podcasts.",
        },
      ],
    },
    {
      title: "AI Generator",
      sublinks: [
        {
          title: "Text to Image",
          href: "/text-to-image",
          description: "Generate images from textual descriptions.",
        },
        {
          title: "Text to Audio",
          href: "/text-to-audio",
          description: "Convert text into natural-sounding audio.",
        },
        {
          title: "Text to Social Media Post",
          href: "/text-to-social-media-post",
          description: "Create engaging social media content from text input.",
        },
        {
          title: "Text to Diagram",
          href: "/text-to-diagram",
          description: "Transform text descriptions into visual diagrams.",
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
              Your All in One AI Platform
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Turn your words into captivating images, posts, and stories—
              <span className="text-purple-400"> effortlessly.</span>
            </p>

            {/* Call-to-Action Button */}
            <button className="bg-white text-black px-6 py-3 text-lg rounded-full font-medium flex items-center space-x-2 mx-auto">
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
