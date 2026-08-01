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

      Return top 4-5 matching real universities based on this profile.
    `;

    // URL toza va oddiy bo'ladi (?key= olib tashlandi)
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // ✅ AQ... va AIzaSy... kalitlarini xavfsiz qabul qiladigan rasmiy header:
        "x-goog-api-key": apiKey.trim(),
      },
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", JSON.stringify(errorData, null, 2));

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
      throw new Error("No output generated from AI model.");
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
