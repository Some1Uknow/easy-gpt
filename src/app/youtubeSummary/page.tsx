'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function YoutubeSummary() {
  return (
    <ChatLayout type="youtube-summary">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
            YouTube Summary AI
          </h1>
          <p className="text-gray-400 mt-2">
            Get quick, accurate summaries of YouTube videos
          </p>
        </div>
        
        <ChatInterface 
          context="You are a YouTube video analysis assistant. Help users understand and summarize video content efficiently."
          placeholder="Paste a YouTube URL or ask 'What are the key points in this video?'"
          suggestions={[
            "Summarize this YouTube video",
            "What are the main topics covered?",
            "Extract the key takeaways from this video"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
