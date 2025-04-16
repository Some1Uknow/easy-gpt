import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: NextRequest) {
  try {
    const { pdf, text } = (await req.json()) as { pdf?: string; text?: string };

    if (!pdf && !text) {
      return NextResponse.json(
        { error: "Either PDF content or extracted text is required" },
        { status: 400 }
      );
    }

    // Use the text if provided, otherwise extract from PDF
    const contentToAnalyze = text || pdf;

    const response = await getRequestContext().env.AI.run(
      "@hf/mistral/mistral-7b-instruct-v0.2",
      {
        messages: [
          {
            role: "system",
            content: "You are a document analysis assistant. Create a concise but comprehensive summary of the provided content.",
          },
          {
            role: "user",
            content: `Generate a summary of this document: ${contentToAnalyze}`,
          },
        ],
      }
    );

    // @ts-ignore
    const summary = response.response || "Summary could not be generated.";
    
    return NextResponse.json({
      success: true,
      summary,
      length: summary.length
    });
  } catch (error: any) {
    console.error("Error in PDF summarization:", error);
    return NextResponse.json(
      { error: error.message || "Failed to summarize document" },
      { status: 500 }
    );
  }
}