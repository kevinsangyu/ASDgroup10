
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Unlike most of our content generation tools, we use Replicate instead of OpenAI. This is because OpenAI does not yet have a video generator.
const replicate = new Replicate({
    auth: process.env.KY_REPLICATE_API_KEY,
  });

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!replicate.auth) {
            return new NextResponse("Replicate API Key not configured", {status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400 });
        }

        // this is just a link to the specific AI model we will be using, which is written by anotherjesse and is called zeroscope.
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt: prompt
              }
            }
          );

        return NextResponse.json(response);
    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
