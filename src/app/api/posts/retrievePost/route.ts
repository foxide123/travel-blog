//"use server";
export const runtime="edge";

import { NextResponse } from "next/server";
import { supabaseCreateClientServer } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await supabaseCreateClientServer();


    const { data, error } = await supabase.from("Posts").select();

    if (error) {
      console.error("Error retrieving posts:", error);
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error While Retrieving Post",
        details: error instanceof Error ? error.message : String(Error)
       },
      { status: 500 }
    );
  }
}
