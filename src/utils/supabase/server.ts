"use server";

import { createClient } from "@supabase/supabase-js";

export async function supabaseCreateClientServer(token?: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {headers: token ? {Authorization: `Bearer ${token}`} : {}}
    }
  );
}