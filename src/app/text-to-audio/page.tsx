import { Speaker, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextToAudio() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto  shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Speaker className="w-6 h-6" />
            Text to Audio
          </h1>
          <p className="text-gray-100 mt-2">Convert Written Content into Voice Narration</p>
        </div>

        {/* Text Input Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Enter Your Text</label>
          <Textarea placeholder="Type or paste your text here..." className="w-full" rows={6} />
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Generated Audio</label>
          <Textarea readOnly placeholder="The generated audio will be playable here..." className="w-full bg-gray-100" rows={2} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Speaker className="w-4 h-4" />
            Play Audio
          </Button>
        </div>
      </div>
    </div>
  );
}
