import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Environment variable'dan API keyni olish
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY muhit o'zgaruvchisi (environment variable) topilmadi!");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Serverda GEMINI_API_KEY sozlanmagan." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt yuborilmadi." },
        { status: 400 }
      );
    }

    // Stable/Latest model versiyasini ko'rsatish
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Gemini API'dan javob olish
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ result: responseText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        error: "Gemini API so'rovida xatolik yuz berdi.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
