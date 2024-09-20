import { Layout, Clipboard, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextToDiagram() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto  shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="w-6 h-6" />
            Text to Diagram
          </h1>
          <p className="text-gray-100 mt-2">Visualize Your Ideas with Diagrams</p>
        </div>

        {/* Text Input Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Enter Your Text</label>
          <Textarea placeholder="Type or paste your text here..." className="w-full" rows={6} />
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Generated Diagram</label>
          <div className="w-full h-64 bg-gray-900 rounded-sm flex items-center justify-center">
            <Image className="w-10 h-10 text-gray-400" />
            <span className="text-gray-400 ml-2">Diagram Preview</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Clipboard className="w-4 h-4" />
            Copy Diagram
          </Button>
        </div>
      </div>
    </div>
  );
}
