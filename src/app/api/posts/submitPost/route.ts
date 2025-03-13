"use server";

import { NextResponse } from "next/server";
import { supabaseCreateClientServer } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: no token provided" },
        { status: 401 }
      );
    }

    const supabase = await supabaseCreateClientServer(token);

    const body = await req.json();

    const { data, error } = await supabase
    .from("Posts")
    .insert([
      {
        header: body.header,
        content: body.content,
        creation_date: body.creation_date,
        url_pathname: body.url_pathname
      },
    ])
    .select("id");

    if (error) {
      console.error("Error inserting Post:", error);
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }
    console.log("Post inserted successfully:", JSON.parse(JSON.stringify(data)));


    return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error"},
      { status: 500 }
    );
  }
}
