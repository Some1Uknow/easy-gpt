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
  console.log(transcript);
  // Check if transcript is provided
  if (!transcript) {
    return new Response("Transcript is required", { status: 400 });
  }

  const messages = [
    {
      role: "system",
      content:
        "You are given a YouTube video's entire transcript, explain about the video in simple language and don't mention it like you are explaining the transcript instead explain it like you are explaining the actual video: ",
    },
    {
      role: "user",
      content: `${transcript}`,
    },
  ];

  const stream = await getRequestContext().env.AI.run(
    "@cf/meta/llama-4-scout-17b-16e-instruct",
    {
      messages,
      stream: true,
    }
  );

  // Return the AI response as a stream
  // @ts-ignore
  return new Response(stream, {
    headers: { "content-type": "text/event-stream" },
  });
}
