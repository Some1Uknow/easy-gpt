import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "en-US" } = await req.json() as { text: string; voice?: string };

    if (!text) {
      return NextResponse.json(
        { error: "Text content is required" },
        { status: 400 }
      );
    }

    const response = await getRequestContext().env.AI.run(
      "@hf/mistral/mistral-7b-instruct-v0.2",
      {
        messages: [
          {
            role: "system",
            content: "You are a text-to-speech assistant. Convert the following text to audio.",
          },
          {
            role: "user",
            content: text,
          },
        ],
      }
    );

    // @ts-ignore
    const audioData = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioData).toString('base64');
    
    return NextResponse.json({
      success: true,
      audio: `data:audio/mp3;base64,${base64Audio}`,
    });
  } catch (error: any) {
    console.error("Error in text-to-audio conversion:", error);
    return NextResponse.json(
      { error: error.message || "Failed to convert text to audio" },
      { status: 500 }
    );
  }
}
