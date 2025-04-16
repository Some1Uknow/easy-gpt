import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY!);

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { prompt, duration = "10" } = await req.json() as { prompt: string; duration?: string };

    if (!prompt) {
      return NextResponse.json(
        { error: "Text prompt is required" },
        { status: 400 }
      );
    }

    const response = await client.textToVideo({
      inputs: prompt,
      model: "damo-vilab/text-to-video-ms-1.7b",
      parameters: {
        num_frames: parseInt(duration) * 30, // 30fps
        width: 1024,
        height: 576,
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const base64Video = Buffer.from(arrayBuffer).toString("base64");
    
    return NextResponse.json({
      success: true,
      video: `data:video/mp4;base64,${base64Video}`,
      prompt,
      duration
    });
  } catch (error: any) {
    console.error("Error in text-to-video generation:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate video" },
      { status: 500 }
    );
  }
}
