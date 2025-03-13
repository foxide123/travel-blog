//"use server";
export const runtime="edge";

import { NextResponse } from "next/server";
import { supabaseCreateClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
  try {

    const supabase = supabaseCreateClient();
    
    const {email, password} = await req.json();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error){
      console.log("Error signing client:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("User logged in");
    return NextResponse.json({session: data.session});
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
