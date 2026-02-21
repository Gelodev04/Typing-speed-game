"use client";

import Link from "next/link";
import { signOut } from "@/lib/auth/auth";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "./Spinner";

export function Navbar() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-4 absolute top-0 left-1/2 -translate-x-1/2">
      <div className="bg-[#302f2f] bg-opacity-60 backdrop-blur-xl w-full py-4 px-8 rounded-full flex items-center justify-between">
        <Link href="/type" className="text-2xl font-bold tracking-wider">
          Type FASTER!
        </Link>

        <div className="flex items-center gap-4">
          {loading ? (
            <Spinner className="w-5 h-5" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="px-6 py-2 text-white hover:text-[#1DB954] transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-full transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 text-white hover:text-[#1DB954] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-full transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
