'use client'
import ChatLayout from "@/components/chat/ChatLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function PDFSummary() {
  return (
    <ChatLayout type="pdf-summary">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            PDF Summary AI
          </h1>
          <p className="text-gray-400 mt-2">
            Get concise, intelligent summaries of your PDF documents
          </p>
        </div>
        
        <ChatInterface 
          context="You are a PDF analysis assistant. Help users understand and summarize PDF documents effectively."
          placeholder="Upload a PDF or ask 'Can you summarize this document?'"
          suggestions={[
            "Summarize the key points of this PDF",
            "Extract the main arguments from this document",
            "What are the key findings in this research paper?"
          ]}
        />
      </div>
    </ChatLayout>
  );
}