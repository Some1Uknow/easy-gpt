import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    // Validate base64 image
    const base64Regex = /^data:image\/(jpeg|png|gif|webp);base64,/;
    if (!base64Regex.test(image)) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    const response = await getRequestContext().env.AI.run(
      "@cf/meta/llama-2-7b-chat",
      {
        messages: [
          {
            role: "system",
            content: "You are an OCR and image analysis assistant. Extract and analyze text from the provided image.",
          },
          {
            role: "user",
            content: `Extract text from this image: ${image}`,
          },
        ],
      }
    );

    // @ts-ignore
    const extractedText = response.response || "No text found in image.";
    
    return NextResponse.json({
      success: true,
      text: extractedText
    });
  } catch (error: any) {
    console.error("Error in image text extraction:", error);
    return NextResponse.json(
      { error: error.message || "Failed to extract text from image" },
      { status: 500 }
    );
  }
}
