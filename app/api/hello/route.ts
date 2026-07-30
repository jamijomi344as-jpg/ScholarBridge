import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "ScholarBridge API is ready." });
}
