import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY!);

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { prompt, style = "realistic" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Text prompt is required" },
        { status: 400 }
      );
    }

    const response = await client.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-2",
      parameters: {
        negative_prompt: "blurry, bad quality, distorted",
        num_inference_steps: 30,
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    
    return NextResponse.json({
      success: true,
      image: `data:image/jpeg;base64,${base64Image}`,
      prompt
    });
  } catch (error: any) {
    console.error("Error in text-to-image generation:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
