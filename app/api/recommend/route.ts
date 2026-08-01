import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY muhit o'zgaruvchisi topilmadi!");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Serverda GEMINI_API_KEY sozlanmagan (.env.local yoki Render Environment)." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { country, gpa, sat, ielts, majors, targetCountries, budget } = body;

    // Frontend ma'lumotlaridan prompt yasash
    const generatedPrompt = `
      Act as an expert international university admissions AI advisor.
      Analyze the following student profile:
      - Country of Origin: ${country || "Not specified"}
      - GPA: ${gpa || "Not specified"} out of 5.0
      - SAT Score: ${sat || "Not provided"}
      - IELTS / TOEFL: ${ielts || "Not specified"}
      - Selected Majors: ${Array.isArray(majors) ? majors.join(", ") : majors || "Any"}
      - Target Destination Countries: ${Array.isArray(targetCountries) ? targetCountries.join(", ") : targetCountries || "Any"}
      - Budget / Financial Preference: ${budget || "Not specified"}

      Return top 4-5 matching real universities based on this profile.
    `;

    // Model initsializatsiyasi va structured JSON schema
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              location: { type: SchemaType.STRING },
              matchScore: { type: SchemaType.NUMBER },
              category: { type: SchemaType.STRING },
              scholarshipName: { type: SchemaType.STRING },
              coverage: { type: SchemaType.STRING },
              program: { type: SchemaType.STRING },
              deadline: { type: SchemaType.STRING },
              officialWebsite: { type: SchemaType.STRING },
            },
            required: [
              "name",
              "location",
              "matchScore",
              "category",
              "scholarshipName",
              "coverage",
              "program",
              "deadline",
              "officialWebsite",
            ],
          },
        },
      },
    });

    const result = await model.generateContent(generatedPrompt);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error("AI javob matnini yaratib bo'lmadi.");
    }

    const universities = JSON.parse(responseText);

    // Frontend kutilayotgan format: { success: true, universities: [...] }
    return NextResponse.json({ success: true, universities });

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "AI mos keluvchi universitetlarni aniqlay olmadi.",
      },
      { status: 500 }
    );
  }
}
