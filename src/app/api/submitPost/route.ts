import { NextResponse } from "next/server";
import { submitPostToDB } from "@/actions/post/submit-post-to-db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API received:", body);

    const response = await submitPostToDB(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
