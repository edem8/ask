import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(text);
    const reply = result.response.text();

    return NextResponse.json({ reply: reply || "No response" });
  } catch (err) {
    console.error("Error connecting to Gemini:", err);
    return NextResponse.json(
      { error: "Failed to connect to Gemini" },
      { status: 500 }
    );
  }
}
