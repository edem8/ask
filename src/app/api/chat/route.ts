import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(
      `${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = text;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return NextResponse.json({
      reply: result.response.text() || "No response",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to Gemini" },
      { status: 500 }
    );
  }
}
