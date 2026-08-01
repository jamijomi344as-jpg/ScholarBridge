import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { country, gpa, sat, ielts, majors, targetCountries, budget } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API key is missing on backend." },
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
      - Selected Majors: ${majors.join(", ")}
      - Target Destination Countries: ${targetCountries.join(", ")}
      - Budget / Financial Preference: ${budget}

      Return a JSON array containing top 4-5 matching real universities.
      Each object must strictly follow this JSON structure:
      [
        {
          "name": "University Name",
          "location": "City, Country",
          "matchScore": 89,
          "category": "Target",
          "scholarshipName": "Scholarship Title",
          "coverage": "Full Tuition / Partial / Stipend details",
          "program": "Matched Major Name",
          "deadline": "Month Day, Year",
          "officialWebsite": "https://official-university-domain.edu"
        }
      ]
      Respond strictly with raw valid JSON array only, without any markdown formatting, backticks, or extra commentary.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "AI API request failed." },
        { status: response.status }
      );
    }

    const data = await response.json();
    let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Markdown teglarni tozalash
    rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

    const universities = JSON.parse(rawText);

    return NextResponse.json({ success: true, universities });
  } catch (error: any) {
    console.error("AI Recommend Route Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
