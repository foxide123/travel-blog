//"use server";
export const runtime="edge";

import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const supabase = await supabaseCreateClientServer();

    const { data, error } = await supabase
      .from("AssetType")
      .select();
  
    if (error) {
      console.error("Error retrieving asset type records: ", error);
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }
  
    return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
  }catch(error) {
    console.error("API error (getAssetTypes):", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
