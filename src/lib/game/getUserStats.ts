"use client";
import { supabase } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/auth/auth";

export interface UserStats {
  highestWpm: number;
  highestAccuracy: number;
  totalGames: number;
  recentScores: Array<{
    id: string;
    wpm: number;
    accuracy: number;
    created_at: string;
  }>;
}

export async function getUserStats(): Promise<UserStats> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User must be logged in");
  }

  // Fetch all user scores
  const { data: scores, error } = await supabase
    .from("game_scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (!scores || scores.length === 0) {
    return {
      highestWpm: 0,
      highestAccuracy: 0,
      totalGames: 0,
      recentScores: [],
    };
  }

  // Calculate stats
  const highestWpm = Math.max(...scores.map((s) => s.wpm));
  const highestAccuracy = Math.max(...scores.map((s) => s.accuracy));
  const totalGames = scores.length;
  const recentScores = scores.slice(0, 10); // Last 10 games

  return {
    highestWpm,
    highestAccuracy,
    totalGames,
    recentScores,
  };
}
