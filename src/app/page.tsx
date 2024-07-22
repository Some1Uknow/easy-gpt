import Navbar from "@/components/Navbar";
import Logo from "../../commons/Logo";
import CoverVideo from "@/components/CoverVideo";

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
          href: "/text-to-social-post",
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
      <div className="flex flex-row mx-20 items-center py-1 justify-between">
        <Logo />
        <Navbar navItems={navItems} />
      </div>{" "}
      <div className="flex flex-col items-center">
        <CoverVideo />
      </div>
    </>
  );
}
