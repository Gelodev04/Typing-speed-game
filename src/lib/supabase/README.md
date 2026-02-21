# Supabase Configuration

This directory contains the Supabase client configuration for your Next.js application.

## Files

- **`client.ts`** - Client-side Supabase client for use in Client Components
- **`server.ts`** - Server-side Supabase client for use in Server Components and API routes
- **`types.ts`** - TypeScript database types (auto-generated or manually defined)
- **`index.ts`** - Barrel export for convenient imports

## Usage

### Client Components

```typescript
"use client";
import { supabase } from "@/lib/supabase";

export function MyComponent() {
  const fetchData = async () => {
    const { data, error } = await supabase.from("your_table").select("*");

    if (error) console.error(error);
    return data;
  };

  // ...
}
```

### Server Components / API Routes

```typescript
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("your_table").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
```

### Generating TypeScript Types

To generate types from your Supabase database:

1. Install Supabase CLI: `npm install -g supabase`
2. Link your project: `supabase link --project-ref your-project-id`
3. Generate types: `supabase gen types typescript --linked > src/lib/supabase/types.ts`

Or use the online generator:

1. Go to your Supabase project dashboard
2. Settings → API → Generate TypeScript types
3. Copy and paste into `types.ts`

## Environment Variables

Make sure you have these in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Security

- ✅ The `anon` key is safe for client-side use
- ❌ Never expose `service_role` key in client code
- ✅ Always enable Row Level Security (RLS) in Supabase
- ✅ Validate user input before database operations
