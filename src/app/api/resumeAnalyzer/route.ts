import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function GET(req: Request) {
  const response = await getRequestContext().env.AI.run(
     // @ts-ignore
    "@cf/meta/llama-3.1-8b-instruct",
    {
      prompt: "What is the origin of the phrase Hello, World",
    }
  );

  return new Response(JSON.stringify(response));
}
