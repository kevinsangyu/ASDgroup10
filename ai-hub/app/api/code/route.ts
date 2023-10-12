
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";


//new api instance with API key from .env file
const openai = new OpenAI({ apiKey: process.env.RJ_OPENAI_API_KEY });

// context message to tell the model what to focus on
const instructionMessage: OpenAI.Chat.ChatCompletionMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}

// create formatted api call with error messages and specific AI model before returning response
export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", {status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired.", { status: 403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0301",
            messages: [instructionMessage, ...messages]
        });

        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
