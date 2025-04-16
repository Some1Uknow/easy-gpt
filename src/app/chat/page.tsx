"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Video,
  AudioLines,
  Image,
  Send,
  Diameter,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
    endpoint: "/api/pdf-summary"
  },
  {
    id: "youtube-summary",
    title: "YouTube Summary",
    description: "Get concise summaries of YouTube videos",
    icon: <Youtube className="w-6 h-6" />,
    endpoint: "/api/youtubeSummary"
  },
  {
    id: "text-to-video",
    title: "Text to Video",
    description: "Generate videos from text descriptions",
    icon: <Video className="w-6 h-6" />,
    endpoint: "/api/text-to-video"
  },
  {
    id: "text-to-audio",
    title: "Text to Audio",
    description: "Convert text into natural-sounding audio",
    icon: <AudioLines className="w-6 h-6" />,
    endpoint: "/api/text-to-audio"
  },
  {
    id: "text-to-diagram",
    title: "Text to Diagram",
    description: "Transform text descriptions into visual diagrams",
    icon: <Diameter className="w-6 h-6" />,
    endpoint: "/api/text-to-diagram"
  },
  {
    id: "text-to-image",
    title: "Text to Image",
    description: "Generate images from textual descriptions",
    icon: <Image className="w-6 h-6" />,
    endpoint: "/api/text-to-image"
  },
  {
    id: "image-to-text",
    title: "Image to Text",
    description: "Extract text from images with OCR technology",
    icon: <FileText className="w-6 h-6" />,
    endpoint: "/api/image-to-text"
  }
];

export default function ChatPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // Enforce service selection
  useEffect(() => {
    if (!selectedService && !showServiceModal) {
      setShowServiceModal(true);
    }
  }, [selectedService]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowServiceModal(false);
    // Add initial system message based on selected service
    setMessages([{
      role: 'assistant',
      content: `I'm ready to help you with ${service.title}. What would you like to do?`
    }]);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || !selectedService) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Handle different service types differently
      const response = await fetch(selectedService.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || data.summary || data.result || data.dataURI || 'Process completed successfully'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.'
      }]);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Service Selection Modal */}
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Choose an AI Service
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {services.map((service) => (
              <Button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                variant="outline"
                className="flex flex-col items-center h-auto p-6 bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-white"
              >
                <div className="mb-4 text-purple-400">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-400 text-center">
                  {service.description}
                </p>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4">
        {/* Selected Service Header */}
        {selectedService && (
          <div className="flex items-center space-x-2 p-4 bg-neutral-900 rounded-t-lg border-b border-neutral-800">
            <div className="text-purple-400">{selectedService.icon}</div>
            <h2 className="text-xl font-semibold">{selectedService.title}</h2>
            <Button
              onClick={() => setShowServiceModal(true)}
              variant="ghost"
              className="ml-auto text-purple-400 hover:text-purple-300"
            >
              Change Service
            </Button>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-neutral-800 text-white'
                }`}
              >
                {message.content.startsWith('data:') ? (
                  message.content.includes('image') ? (
                    <img src={message.content} alt="Generated content" className="max-w-full" />
                  ) : message.content.includes('video') ? (
                    <video controls src={message.content} className="max-w-full" />
                  ) : (
                    <audio controls src={message.content} />
                  )
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-900 rounded-b-lg border-t border-neutral-800">
          <div className="flex space-x-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your message..."
              className="flex-1 bg-neutral-800 text-white border-neutral-700 focus:border-purple-500"
            />
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}