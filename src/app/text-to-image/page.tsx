'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function TextToImage() {
  return (
    <ChatLayout type="text-to-image">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
            Text to Image AI
          </h1>
          <p className="text-gray-400 mt-2">
            Convert your ideas into stunning visual art with AI
          </p>
        </div>
        
        <ChatInterface 
          context="You are an image generation assistant. Help users create beautiful images from text descriptions."
          placeholder="Try 'Generate a sunset over mountains' or 'Create abstract art'"
          suggestions={[
            "Create a fantasy landscape",
            "Generate a product mockup",
            "Design a logo concept"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
