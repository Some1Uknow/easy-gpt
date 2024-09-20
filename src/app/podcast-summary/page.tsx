import { Upload, Mic, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PodcastSummary() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="w-6 h-6" />
            Podcast Summary
          </h1>
          <p className="text-gray-100 mt-2">Get Insights from Podcasts in Minutes</p>
        </div>

        {/* Podcast Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Upload Your Podcast File</label>
          <div className="flex items-center gap-4">
            <Input type="file" accept="audio/*" className="w-full" />
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Summary</label>
          <Textarea readOnly placeholder="The podcast summary will appear here..." className="w-full bg-gray-700" rows={6} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Clipboard className="w-4 h-4" />
            Copy Summary
          </Button>
        </div>
      </div>
    </div>
  );
}
