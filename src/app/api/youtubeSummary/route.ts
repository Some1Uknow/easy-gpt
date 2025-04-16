import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const response = await getRequestContext().env.AI.run(
      "@cf/meta/llama-2-7b-chat",
      {
        messages: [
          {
            role: "system",
            content: "You are a YouTube video analysis assistant. Summarize the key points from this video transcript.",
          },
          {
            role: "user",
            content: `Summarize this YouTube video: ${url}`,
          },
        ],
      }
    );

    // @ts-ignore
    const summary = response.response || "Summary not available.";
    
    return NextResponse.json({
      success: true,
      summary,
      url
    });
  } catch (error: any) {
    console.error("Error in YouTube video summarization:", error);
    return NextResponse.json(
      { error: error.message || "Failed to summarize YouTube video" },
      { status: 500 }
    );
  }
}
