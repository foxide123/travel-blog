import { supabaseCreateClientServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await supabaseCreateClientServer();

    const { data, error } = await supabase.from("AssetSize").select();

    console.log("In getAssetSizes route, data:", data);

    if (error) {
      console.error("Error retrieving asset size records: ", error);
      return NextResponse.json(
        { error: error.message || error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: JSON.parse(JSON.stringify(data)) });
  } catch (error) {
    console.error("API error (getAssetSizes):", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
