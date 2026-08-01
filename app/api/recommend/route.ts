import { NextResponse } from "next/server";

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

      Return top 4-5 matching real universities.
    `;

    // Gemini API v1beta call with Structured JSON Schema
    const response = await fetch(
      `[https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$](https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$){apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  location: { type: "STRING" },
                  matchScore: { type: "NUMBER" },
                  category: { type: "STRING" },
                  scholarshipName: { type: "STRING" },
                  coverage: { type: "STRING" },
                  program: { type: "STRING" },
                  deadline: { type: "STRING" },
                  officialWebsite: { type: "STRING" },
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
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error details:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: errorData?.error?.message || "AI API request failed." 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No response text received from Gemini.");
    }

    const universities = JSON.parse(rawText);

    return NextResponse.json({ success: true, universities });
  } catch (error: any) {
    console.error("AI Recommend Route Catch Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
