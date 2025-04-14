import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as { prompt: string };
  console.log("Received prompt:", prompt);
  try {
    const response = await getRequestContext().env.AI.run(
      "@cf/black-forest-labs/flux-1-schnell",
      {
        prompt: prompt,
      }
    );
    // response.image is base64 encoded which can be used directly as an <img src=""> data URI
    const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;
 //   console.log("Generated image data URI:", dataURI);
    return Response.json({ dataURI });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
