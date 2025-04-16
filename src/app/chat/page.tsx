"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Video,
  AudioLines,
  Image,
  Diameter,
  Youtube,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  endpoint: string;
};

const services: Service[] = [
  {
    id: "pdf-summary",
    title: "PDF Summary",
    description: "Summarize PDF documents using AI technology",
    icon: <FileText className="w-6 h-6" />,
    endpoint: "/pdf-summary",
  },
  {
    id: "youtube-summary",
    title: "YouTube Summary",
    description: "Get concise summaries of YouTube videos",
    icon: <Youtube className="w-6 h-6" />,
    endpoint: "/youtubeSummary",
  },
  {
    id: "text-to-video",
    title: "Text to Video",
    description: "Generate videos from text descriptions",
    icon: <Video className="w-6 h-6" />,
    endpoint: "/text-to-video",
  },
  {
    id: "text-to-audio",
    title: "Text to Audio",
    description: "Convert text into natural-sounding audio",
    icon: <AudioLines className="w-6 h-6" />,
    endpoint: "/text-to-audio",
  },
  {
    id: "text-to-diagram",
    title: "Text to Diagram",
    description: "Transform text descriptions into visual diagrams",
    icon: <Diameter className="w-6 h-6" />,
    endpoint: "/text-to-diagram",
  },
  {
    id: "text-to-image",
    title: "Text to Image",
    description: "Generate images from textual descriptions",
    icon: <Image className="w-6 h-6" />,
    endpoint: "/text-to-image",
  },
  {
    id: "image-to-text",
    title: "Image to Text",
    description: "Extract text from images with OCR technology",
    icon: <FileText className="w-6 h-6" />,
    endpoint: "/image-to-text",
  },
];

export default function ChatPage() {
  const [showServiceModal, setShowServiceModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Prefetch all service routes on component mount
  useEffect(() => {
    services.forEach((service) => {
      router.prefetch(service.endpoint);
    });
  }, [router]);

  const handleServiceSelect = (service: Service) => {
    setIsLoading(true);
    try {
      router.push(service.endpoint);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] bg-black/95 text-white m-6 rounded-2xl overflow-hidden border border-neutral-800">
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent className="bg-neutral-900/90 backdrop-blur-xl border-neutral-800 text-white max-w-7xl p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-center mb-1 text-white">
              Choose Your AI Service
            </DialogTitle>
            <p className="text-neutral-400 text-center text-sm">
              Select a service to get started with AI-powered solutions
            </p>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
            {services.map((service) => (
              <Button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                variant="outline"
                className="group relative flex flex-col items-center h-auto p-6 bg-neutral-800/30 hover:bg-neutral-700/30 border border-neutral-700/50 hover:border-purple-500/50 text-white rounded-xl transition-all duration-300 hover:scale-[1.02]"
                disabled={isLoading}
              >
                <div className="mb-4 text-purple-400/90 transform transition-transform group-hover:scale-110 group-hover:text-purple-300">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    service.icon
                  )}
                </div>
                <h3 className="text-sm font-medium mb-1">{service.title}</h3>
                <p className="text-xs text-neutral-400 text-center leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
