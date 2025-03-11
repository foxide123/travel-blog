import { NextResponse } from "next/server";
import { supabaseCreateClientServer } from "@/utils/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await supabaseCreateClientServer();


    const { data, error } = await supabase.from("Posts").select();

    if (error) {
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
