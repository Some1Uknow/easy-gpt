"use client";

import { useState } from "react";
import { VideoData } from "../../../commons/types";
import { Video, Clipboard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MarkdownStreamer from "@/components/MarkdownStreamer";

export default function YouTubeVideoSummary() {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");

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
    setLoadingPhase("Fetching transcript...");
    setSummary("");
    setVideoDetails(null);

    try {
      // Simulate fetching video details and transcript
      const videoData = {
        videoTitle: "Stop ignoring AI, It’s Harming Your Progress - YouTube",
        url: videoUrl,
        transcript: "do you genuinely believe that with Chant GPT and all these AI tools...",
      };

      setLoadingPhase("Transcript fetched...");
      setVideoDetails({
        title: videoData.videoTitle,
        thumbnail: "https://via.placeholder.com/150", // Replace with actual thumbnail if available
        channel: "Example Channel",
        duration: "600", // Replace with actual duration if available
        description: "This is a sample description.", // Replace with actual description if available
        channel_url: "https://www.youtube.com/channel/example", // Replace with actual channel URL if available
        like_count: 12345, // Replace with actual like count if available
        transcript: videoData.transcript.split('. ').map((text, index) => ({
          start: index * 10, // Example start time (adjust as needed)
          duration: 10, // Example duration (adjust as needed)
          text: text.trim(),
        })), // Include the transcript
      });

      setLoadingPhase("Feeding AI...");
      const response = await fetch("/api/youtubeSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: videoData.transcript }),
      });

      if (!response.ok) throw new Error("Failed to fetch summary");

      setLoadingPhase("Generating AI response...");
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let result = "";

      while (!done) {
        const { value, done: readerDone } = await reader?.read()!;
        done = readerDone;
        result += decoder.decode(value, { stream: true });
        setSummary((prev) => prev + decoder.decode(value, { stream: true }));
      }

      setLoadingPhase("Final output");
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to fetch summary. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingPhase("");
    }
  };

  // Copy summary to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      alert("Summary copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-7xl mx-auto p-6 rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Video className="w-6 h-6" />
            YouTube Video Summary
          </h1>
          <p className="text-gray-400 mt-2">
            Summarize YouTube videos with ease
          </p>
        </div>

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
              className="w-full bg-gray-900 text-white placeholder-gray-500 focus:ring focus:ring-blue-500"
            />
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleFetchTranscript}
              disabled={isLoading}
            >
              <Upload className="w-4 h-4" />
              {isLoading ? loadingPhase : "Fetch"}
            </Button>
          </div>
        </div>

        {videoDetails && (
          <div className="flex flex-col md:flex-row gap-6 mb-6 text-white">
            <img
              src={videoDetails.thumbnail}
              alt="Thumbnail"
              className="w-full md:w-64 rounded-md mb-4 md:mb-0"
            />
            <div>
              <h2 className="text-xl font-semibold">{videoDetails.title}</h2>
              <p className="text-gray-400">Channel: {videoDetails.channel}</p>
              <p className="text-gray-400">
                Duration: {Math.floor(Number(videoDetails.duration) / 60)}:{" "}
                {Number(videoDetails.duration) % 60} min
              </p>
              <p className="text-gray-400 mt-4">{videoDetails.description}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">
            Summary
          </label>
          <MarkdownStreamer text={summary} mode="markdown" />
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white"
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
