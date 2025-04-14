"use client";
import { useState } from "react";
import { Video, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextToVideo() {
  const [prompt, setPrompt] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateVideo = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/text-to-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setVideoSrc(data.dataURI);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Video className="w-6 h-6" />
            Text to Video
          </h1>
          <p className="text-gray-100 mt-2">Generate videos from descriptive text</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Enter Prompt</label>
          <Textarea
            placeholder="e.g., a robot walking through a futuristic city"
            className="w-full bg-gray-900 text-white"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generateVideo} disabled={loading} className="mt-4">
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">Generated Video</label>
          <div className="w-full h-64 bg-gray-900 rounded flex items-center justify-center">
            {videoSrc ? (
              <video controls className="w-full max-h-64 rounded" src={videoSrc} />
            ) : (
              <span className="text-gray-400">Video Preview</span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigator.clipboard.writeText(videoSrc)}
            disabled={!videoSrc}
          >
            <Clipboard className="w-4 h-4" />
            Copy Video Link
          </Button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
