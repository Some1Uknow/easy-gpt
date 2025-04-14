import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}
export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return new Response(JSON.stringify({ error: "Image is required" }), {
        status: 400,
      });
    }

    // Convert the image to a Buffer
    const imageBuffer = await image.arrayBuffer();

    // Call Cloudflare's AI model for generating a caption
    const input = {
      image: [...new Uint8Array(imageBuffer)],
      prompt: "Generate a caption for this image",
      max_tokens: 512,
    };
    const response = await getRequestContext().env.AI.run(
      "@cf/unum/uform-gen2-qwen-500m",
      input
    );
    console.log(response);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(JSON.stringify({ error: "Failed to process image" }), {
      status: 500,
    });
  }
}
