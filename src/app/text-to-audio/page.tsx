'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function TextToAudio() {
  return (
    <ChatLayout type="text-to-audio">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Text to Speech AI
          </h1>
          <p className="text-gray-400 mt-2">
            Transform your text into natural-sounding speech in seconds
          </p>
        </div>
        
        <ChatInterface 
          context="You are a text-to-audio assistant. Help users convert text to audio and provide guidance on audio-related tasks."
          placeholder="Try 'Convert this text to a British accent' or 'Generate a podcast intro'"
          suggestions={[
            "Create a professional voiceover for my video",
            "Convert this text with a calm, soothing voice",
            "Generate an audiobook narration"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
