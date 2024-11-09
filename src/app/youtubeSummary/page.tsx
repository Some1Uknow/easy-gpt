"use client";

import { useState } from "react";
import { VideoData } from "../../../commons/types";
import { Video, Clipboard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function YouTubeVideoSummary() {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  //const [videoDetails, setVideoDetails] = useState(null);
  const [videoDetails, setVideoDetails] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract video ID from URL
  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  // Handle transcript fetch
  const handleFetchTranscript = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube video URL.");
      return;
    }

    setIsLoading(true);
    setSummary("");
    setVideoDetails(null);

    try {
      // Fetch video details and transcript
      const data = { video_url: videoUrl };
      const response = await fetch(
        `https://api.apify.com/v2/acts/invideoiq~video-transcript-scraper/run-sync?token=${process.env.NEXT_PUBLIC_APIFY_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch video data");

      const videoData = await response.json();
      // @ts-ignore
      setVideoDetails(videoData);

      // Combine transcript text
      // @ts-ignore

      const transcriptText = videoData.transcript
        .map((item: { text: any }) => item.text)
        .join(" ");
      console.log("transcript -  ", transcriptText);
      // Send transcript text to backend for summarization
      const summaryResponse = await fetch("/api/youtubeSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: transcriptText }),
      });

      if (!summaryResponse.ok) throw new Error("Failed to fetch summary");

      const summaryData = await summaryResponse.json();
      // @ts-ignore
      setSummary(summaryData.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to fetch summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy summary to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      alert("Summary copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Video className="w-6 h-6" />
            YouTube Video Summary
          </h1>
          <p className="text-gray-100 mt-2">
            Summarize YouTube Videos with Ease
          </p>
        </div>

        {/* YouTube Video URL Input Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">
            Enter YouTube Video URL
          </label>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="https://www.youtube.com/watch?v=example"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full"
            />
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleFetchTranscript}
              disabled={isLoading}
            >
              <Upload className="w-4 h-4" />
              {isLoading ? "Fetching..." : "Fetch"}
            </Button>
          </div>
        </div>

        {/* Display Video Details */}
        {videoDetails && (
          <div className="mb-6">
            <img
              src={videoDetails.thumbnail}
              alt="Thumbnail"
              className="w-full rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{videoDetails.title}</h2>
            <p className="text-gray-400">Channel: {videoDetails.channel}</p>
            <p className="text-gray-400">
              Duration: {videoDetails.duration} seconds
            </p>
            <p className="text-gray-500 mt-4">{videoDetails.description}</p>
          </div>
        )}

        {/* Output Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">
            Summary
          </label>
          <Textarea
            readOnly
            value={summary}
            placeholder="The video summary will appear here..."
            className="w-full bg-gray-100"
            rows={6}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={handleCopy}
            disabled={!summary}
          >
            <Clipboard className="w-4 h-4" />
            Copy Summary
          </Button>
        </div>
      </div>
    </div>
  );
}
