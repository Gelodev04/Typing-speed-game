"use client";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/auth/auth";
import Link from "next/link";
import { BlurredContainer } from "../BlurredContainer";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.error) {
        console.error("Sign in error:", result.error);
        setError(result.error.message);
        setLoading(false);
      } else {
        console.log("Sign in successful, redirecting...");
        // Small delay to ensure session is set
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Get redirect from URL search params or default to /type
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get("redirect") || "/type";
        window.location.href = redirectTo;
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setLoading(false);
    }
  };

  return (
    <BlurredContainer>
      <h1 className="text-5xl tracking-wider mb-2">Welcome Back</h1>
      <p className="tracking-widest text-lg mb-8 text-gray-300">
        Sign in to continue
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#999898] rounded-md text-white placeholder-gray-400 outline-none focus:border-[#1DB954] transition-colors duration-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#999898] rounded-md text-white placeholder-gray-400 outline-none focus:border-[#1DB954] transition-colors duration-200"
          />
        </div>

        {error && (
          <div className="px-4 py-2 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-gray-400">
        <p>
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#1DB954] hover:text-[#1ed760] transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </BlurredContainer>
  );
}
