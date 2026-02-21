// Client-side Supabase client (for use in Client Components)
export { supabase } from "./client";

// Note: Server client should be imported directly from "./server" 
// to avoid bundling server-only code in client components
// import { createClient } from "@/lib/supabase/server";

// Database types
export type { Database } from "./types";

