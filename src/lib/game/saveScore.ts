"use client";
import { supabase } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/auth/auth";

export async function saveGameScore(wpm: number, accuracy: number) {
  const user = await getCurrentUser();

  // Silently skip saving if user is not logged in
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("game_scores")
    .insert({
      user_id: user.id,
      wpm,
      accuracy,
    } as {
      user_id: string;
      wpm: number;
      accuracy: number;
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to save score:", error);
    return null;
  }

  return data;
}
