import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export interface Env {
  AI: Ai;
}

export async function GET(req: Request, env: Env) {
  const res = await fetch(
    "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
  );
  const blob = await res.arrayBuffer();

  const input = {
    audio: [...new Uint8Array(blob)],
  };

  const response = await getRequestContext().env.AI.run(
    "@cf/openai/whisper",
    input
  );

  const audioText = JSON.stringify(response.text);

  const messages = [
    { role: "system", content: "Explain the text in easy language given by the user, the input text can be in any language so auto detect it and give the answer in same language. Just give the SUMMARY no explanation or any other texts" },
    {
      role: "user",
      content: audioText,
    },
  ];
  const finalResponse = await getRequestContext().env.AI.run(
    // @ts-ignore
    "@cf/meta/llama-3.1-8b-instruct",
    { messages }
  );

  return Response.json(finalResponse);
}
