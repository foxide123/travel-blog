import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const supabase = await supabaseCreateClientServer();

  const { data, error } = await supabase
    .from("AssetType")
    .select();

  console.log("In getAssetTypes route, data:", data);

  if (error) {
    console.error("Error retrieving asset type records: ", error);
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: data });
}
