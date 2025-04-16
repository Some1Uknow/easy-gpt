'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ImageToText() {
  return (
    <ChatLayout type="image-to-text">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
            Image to Text AI
          </h1>
          <p className="text-gray-400 mt-2">
            Extract and analyze text from any image with AI
          </p>
        </div>
        
        <ChatInterface 
          context="You are an image analysis assistant. Help with extracting and analyzing text from images, including OCR and image understanding."
          placeholder="Upload an image or ask 'What text is in this image?'"
          suggestions={[
            "Extract text from this screenshot",
            "What does this document say?",
            "Analyze the text in this image"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
