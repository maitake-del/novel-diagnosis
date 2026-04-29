import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("novels")
    .select(
      "id, title, author, description, tags, emotion, world, thrill, reflection, healing, tempo, is_active"
    )
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ novels: data });
}