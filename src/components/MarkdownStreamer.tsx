'use client'
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownStreamerProps {
  text: string;
  mode?: "markdown" | "plain"; // mode to choose between Markdown or plain text rendering
  speed?: number; // optional speed for the text stream in milliseconds
}

const MarkdownStreamer: React.FC<MarkdownStreamerProps> = ({
  text,
  mode = "plain",
  speed = 10,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0); // Reset index if text changes

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < text.length ? prevIndex + 1 : prevIndex
      );
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const displayedText = text.slice(0, currentIndex);

  return (
    <div className="w-full bg-[#1a1a1a] p-4 rounded-lg min-h-[150px] text-gray-200">
      {mode === "markdown" ? (
        <ReactMarkdown>{displayedText}</ReactMarkdown>
      ) : (
        <p>{displayedText}</p>
      )}
    </div>
  );
};

export default MarkdownStreamer;
