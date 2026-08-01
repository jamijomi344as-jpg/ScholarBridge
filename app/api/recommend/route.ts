import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { country, gpa, sat, ielts, majors, targetCountries, budget } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API key is missing on backend (.env.local)." },
        { status: 500 }
      );
    }

    // Google SDK initsializatsiyasi (Har qanday formatdagi kalitni to'g'ri qabul qiladi)
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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

    const prompt = `
      Act as an expert international university admissions AI advisor.
      Analyze the following student profile:
      - Country of Origin: ${country}
      - GPA: ${gpa} out of 5.0
      - SAT Score: ${sat || "Not provided"}
      - IELTS / TOEFL: ${ielts}
      - Selected Majors: ${Array.isArray(majors) ? majors.join(", ") : majors}
      - Target Destination Countries: ${Array.isArray(targetCountries) ? targetCountries.join(", ") : targetCountries}
      - Budget / Financial Preference: ${budget}

      Return top 4-5 matching real universities based on this profile.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error("No output generated from AI model.");
    }

    const universities = JSON.parse(responseText);

    return NextResponse.json({ success: true, universities });
  } catch (error: any) {
    console.error("AI Recommend Route Catch Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
