# Supabase Setup Guide

This guide will help you set up Supabase for your typing speed game application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Choose a name for your project (e.g., "typing-speed-game")
   - **Database Password**: Create a strong password (save this securely)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Select Free tier to start
5. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: Copy this value
   - **anon/public key**: Copy this value (this is safe to expose in client-side code)
   - **service_role key**: Keep this secret (only use server-side)

## Step 3: Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 4: Verify Installation

The Supabase client is already configured in:

- `src/lib/supabase/client.ts` - For client-side usage (Client Components)
- `src/lib/supabase/server.ts` - For server-side usage (Server Components, API routes)
- `src/middleware.ts` - Middleware for session management (already configured)
- `src/lib/supabase/types.ts` - TypeScript types for your database

### Quick Import Examples

**Client Component:**

```typescript
"use client";
import { supabase } from "@/lib/supabase";

// Use supabase client
const { data, error } = await supabase.from("table_name").select("*");
```

**Server Component or API Route:**

```typescript
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data, error } = await supabase.from("table_name").select("*");
```

## Step 5: Test the Connection (Optional)

You can test your connection by creating a simple API route or component:

```typescript
// Example: src/app/api/test/route.ts
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabase.from("your_table").select("*");
    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## Next Steps

Now that Supabase is set up, you can:

1. **Create Database Tables**: Use the Supabase dashboard SQL Editor or Table Editor
2. **Set up Authentication**: Configure auth providers in Settings → Authentication
3. **Create API Routes**: Use the Supabase client in your Next.js API routes
4. **Add Real-time Features**: Use Supabase's real-time subscriptions

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Security Notes

- ✅ The `anon` key is safe to use in client-side code
- ❌ Never expose the `service_role` key in client-side code
- ✅ Always use Row Level Security (RLS) policies in Supabase
- ✅ Validate and sanitize user input before database operations
