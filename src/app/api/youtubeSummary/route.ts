import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

// Define request payload type
interface TranscriptRequest {
  transcript: string;
}

export async function POST(req: Request) {
  // Parse the transcript text from the request body
  const { transcript }: TranscriptRequest = await req.json();
  console.log(transcript)
  // Check if transcript is provided
  if (!transcript) {
    return new Response("Transcript is required", { status: 400 });
  }

  // Call the AI model to generate a summary from the transcript text
  const response = await getRequestContext().env.AI.run(
    // @ts-ignore
    "@cf/meta/llama-3.1-8b-instruct",
    {
      prompt: `You are given a YouTube video transcript, explain it in simple language: ${transcript}`,
    }
  );

  // Return the AI response as JSON
  return new Response(JSON.stringify(response));
}
