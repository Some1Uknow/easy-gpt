import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import "@/styles/chat.css";

interface ChatLayoutProps {
  children: React.ReactNode;
  type:
    | "text-to-audio"
    | "image-to-text"
    | "audio-summary"
    | "pdf-summary"
    | "text-to-diagram"
    | "text-to-video"
    | "text-to-image"
    | "youtube-summary";
}

export default function ChatLayout({ children, type }: ChatLayoutProps) {
  const [conversations, setConversations] = useState<
    { id: string; title: string }[]
  >([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const startNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: `New ${type} Chat`,
    };
    setConversations([newConversation, ...conversations]);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } bg-[#111111] transition-all duration-300 overflow-hidden border-r border-[#222222]`}
      >
        <div className="p-4 space-y-4">
          <Button
            onClick={startNewChat}
            className="w-full bg-white hover:bg-gray-100 text-black transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>

          <div className="space-y-2">
            {conversations.map((conv) => (
              <Button
                key={conv.id}
                variant="ghost"
                className="w-full justify-start text-sm text-gray-300 hover:bg-[#1a1a1a] transition-all duration-200"
              >
                {conv.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black">
        <header className="h-12 border-b border-gray-800 flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
