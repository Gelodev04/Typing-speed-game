// This file will be auto-generated when you run Supabase CLI
// For now, you can manually define your database types here
// Run: npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      game_scores: {
        Row: {
          id: string;
          user_id: string;
          wpm: number;
          accuracy: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wpm: number;
          accuracy: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wpm?: number;
          accuracy?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
