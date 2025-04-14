import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt: string }; // Receive extracted text from the frontend
  console.log("Received prompt:", prompt);
  const messages = [
    {
      role: "system",
      content:
        "ONLY output the Mermaid.JS code for the requested user input, NOTHING ELSE, NO EXPLANATION, NO ADDITIONAL TEXT.",
    },
    {
      role: "user",
      content: `${prompt}`,
    },
  ];
  const response = await getRequestContext().env.AI.run(
    "@hf/mistral/mistral-7b-instruct-v0.2",
    { messages }
  );

  console.log("Response from AI:", response.response);

  // Extract and clean Mermaid.js code
  let mermaidCodeMatch = response.response.match(/```mermaid\n([\s\S]*?)\n```/);
  let mermaidCode = mermaidCodeMatch ? mermaidCodeMatch[1] : "";

  // Validate Mermaid.js code
  if (!mermaidCode || !mermaidCode.trim().startsWith("graph")) {
    return NextResponse.json({
      error: "Invalid Mermaid.js code generated. Please try again with a different prompt.",
    }, { status: 400 });
  }

  return NextResponse.json({ result: mermaidCode });
}
