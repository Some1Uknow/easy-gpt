'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function TextToDiagram() {
  return (
    <ChatLayout type="text-to-diagram">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Text to Diagram AI
          </h1>
          <p className="text-gray-400 mt-2">
            Transform your text descriptions into clear, visual diagrams
          </p>
        </div>
        
        <ChatInterface 
          context="You are a diagram generation assistant. Help users create clear visual diagrams from their text descriptions using Mermaid.js syntax."
          placeholder="Describe the diagram you want to create..."
          suggestions={[
            "Create a flowchart showing user authentication process",
            "Generate a sequence diagram for API communication",
            "Make an organization chart for a company structure"
          ]}
        />
      </div>
    </ChatLayout>
  );
}
