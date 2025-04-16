'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function TextToVideo() {
  return (
    <ChatLayout type="text-to-video">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Text to Video AI
          </h1>
          <p className="text-gray-400 mt-2">
            Transform your text into engaging video content
          </p>
        </div>
        
        <ChatInterface 
          context="You are a text-to-video generation assistant. Help users create video content from their text descriptions."
          placeholder="Try 'Create a video about nature' or 'Generate an animated explainer'"
          suggestions={[
            "Create a product demonstration video",
            "Generate an animated story",
            "Make a social media video clip"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
