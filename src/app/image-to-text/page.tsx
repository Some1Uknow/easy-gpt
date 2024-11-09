import { Edit3, Clipboard, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextToSocialMediaPost() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Share2 className="w-6 h-6" />
            Text to Social Media Post
          </h1>
          <p className="text-gray-100 mt-2">Create Engaging Posts from Your Text</p>
        </div>

        {/* Text Input Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Enter Your Text</label>
          <Textarea placeholder="Type or paste your text here..." className="w-full" rows={6} />
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Generated Post</label>
          <Textarea readOnly placeholder="The generated social media post will appear here..." className="w-full bg-gray-100" rows={4} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Clipboard className="w-4 h-4" />
            Copy Post
          </Button>
        </div>
      </div>
    </div>
  );
}
