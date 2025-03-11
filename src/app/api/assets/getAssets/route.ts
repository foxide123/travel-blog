import { getAssetSizes, getAssetTypes } from "@/utils/api/post_requests";
import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function getAssets(supabase: any, postId?: string | null) {
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

  return NextResponse.json({ data: data });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("post_id");

  const supabase = await supabaseCreateClientServer();

  return getAssets(supabase, postId);
}
