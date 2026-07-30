import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "ScholarBridge hello route is ready." });
}
