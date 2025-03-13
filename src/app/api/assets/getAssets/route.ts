"use server"

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

async function getAssets(supabase: SupabaseClient, postId?: string | null) {
  let query = supabase.from("Assets").select("*");

  if (postId !== null && postId !== undefined) {
    query = query.eq("post_id", postId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error retrieving asset records: ", error);
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("post_id");

    const supabase = await supabaseCreateClientServer();

    return getAssets(supabase, postId);
  } catch (error) {
    console.error("API error (getAssets):", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
