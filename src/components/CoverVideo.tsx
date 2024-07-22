import React from "react";

export default function CoverVideo() {
  return (
    <div className="relative w-[1120px] h-[630px]">
      <video 
        preload="none" 
        autoPlay 
        loop 
        muted 
        className="w-full h-full object-cover"
      >
        <source src="/cover.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 p-4">
        <h1 className="text-4xl font-extrabold mb-4 max-w-full">
          INCREASE YOUR PRODUCTIVITY BY 10X WITH OUR AI TOOLS
        </h1>
        <p className="text-xl font-semibold max-w-4xl">
          PDF Summarizer, YouTube Video Summarizer, Audio/Podcast Summarizer, Social Media Post Generator and much more!
        </p>
      </div>
    </div>
  );
}