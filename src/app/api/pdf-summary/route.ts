import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: Request) {
  try {
    // @ts-ignore
    const { text } = await req.json(); // Receive extracted text from the frontend

    if (!text) {
      return NextResponse.json({ error: "No text provided for summarization." }, { status: 400 });
    }

    const response = await getRequestContext().env.AI.run(
      // @ts-ignore
      "@cf/meta/llama-3.1-8b-instruct",
      {
        prompt: `Summarize the following text: ${text}`,
      }
    );

    // Extract the summary from the response (assuming it's within 'choices' or similar structure)
  
    console.log(response);
    // @ts-ignore
    const summary = response.response ? response.response : "Summary not available.";
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in summarizing text:", error);
    return NextResponse.json({ error: "Failed to generate summary." }, { status: 500 });
  }
}