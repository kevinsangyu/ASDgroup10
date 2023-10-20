
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
    apiKey: process.env.KY_OPENAI_API_KEY,
});

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount=1, resolution="256x256" } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", {status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403});
        }

        if (!amount) {
            return new NextResponse("Amount is required", {status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Size is required", {status: 400 });
        }

        const response = await openai.images.generate({
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        if (!isPro) {
            await increaseApiLimit();
        }

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error" + error.message, { status: 500 });
    }
}
