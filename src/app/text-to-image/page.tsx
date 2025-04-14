"use client";
import { useState } from "react";
import { Image, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/text-to-image", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data: { error?: string; dataURI?: string } = await res.json();
      console.log("Response data:", data);
      if (data.error) throw new Error(data.error);
      setImageData(data.dataURI ?? null);
    } catch (err: any) {
      setError(err.message || "Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (imageData) {
      try {
        await navigator.clipboard.writeText(imageData);
        alert("Image copied to clipboard as data URI!");
      } catch {
        alert("Failed to copy image.");
      }
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-6">
        {/* Heading and Subheading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Image className="w-6 h-6" />
            Text to Image
          </h1>
          <p className="text-gray-100 mt-2">
            Generate Images from Descriptive Text
          </p>
        </div>

        {/* Text Input Section */}
        <div className="mb-6">
          <label className="block text-gray-100 font-medium mb-2">
            Enter Your Text
          </label>
          <Textarea
            placeholder="Type or paste your descriptive text here..."
            className="w-full bg-gray-900 text-white"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <Button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </Button>

        {/* Output Section */}
        <div className="mt-6">
          <label className="block text-gray-100 font-medium mb-2">
            Generated Image
          </label>
          <div className="mx-auto w-1/2 h-1/2 bg-gray-100 flex items-center justify-center overflow-hidden">
            {imageData ? (
              <img
                src={imageData}
                alt="Generated"
                className="object-cover w-full h-full mx-auto"
              />
            ) : (
              <>
                <Image className="w-10 h-10 text-gray-400 mx-auto" />
                <span className="text-gray-400 ml-2">Image Preview</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {imageData && (
          <div className="flex gap-4 mt-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={copyToClipboard}
            >
              <Clipboard className="w-4 h-4" />
              Copy Image
            </Button>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
