"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserStats, type UserStats } from "@/lib/game/getUserStats";
import { Spinner } from "@/components/Spinner";
import { BlurredContainer } from "@/components/BlurredContainer";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
        return;
      }

      getUserStats()
        .then(setStats)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <BlurredContainer>
        <h1 className="text-5xl tracking-wider mb-8">Your Profile</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1DB954] bg-opacity-20 border border-[#1DB954] rounded-md p-4">
            <p className="text-gray-400 text-sm mb-1">Highest WPM</p>
            <p className="text-3xl font-bold">{stats.highestWpm}</p>
          </div>
          <div className="bg-[#1DB954] bg-opacity-20 border border-[#1DB954] rounded-md p-4">
            <p className="text-gray-400 text-sm mb-1">Highest Accuracy</p>
            <p className="text-3xl font-bold">{stats.highestAccuracy}%</p>
          </div>
          <div className="bg-[#1DB954] bg-opacity-20 border border-[#1DB954] rounded-md p-4">
            <p className="text-gray-400 text-sm mb-1">Total Games</p>
            <p className="text-3xl font-bold">{stats.totalGames}</p>
          </div>
        </div>

        {/* Recent Games */}
        <div>
          <h2 className="text-2xl tracking-wider mb-4">Recent Games</h2>
          {stats.recentScores.length === 0 ? (
            <p className="text-gray-400">No games played yet. Start typing!</p>
          ) : (
            <div className="space-y-2">
              {stats.recentScores.map((score) => (
                <div
                  key={score.id}
                  className="bg-[#302f2f] bg-opacity-40 border border-[#999898] rounded-md p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{score.wpm} WPM</p>
                    <p className="text-sm text-gray-400">
                      {new Date(score.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg">{score.accuracy}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurredContainer>
    </div>
  );
}
