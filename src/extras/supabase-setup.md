# Supabase Setup

Bu projeye Supabase eklemek için adımlar.

## 1. Paketleri kur

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2. Environment variable'ları ekle

`.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # sadece server-side, asla NEXT_PUBLIC ile başlama
```

> Bu değerleri [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API bölümünden alabilirsin.

## 3. Client (browser) için

`src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

## 4. Server (RSC / route handler / server action) için

`src/lib/supabase/server.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component'ten çağrılıyorsa middleware refresh halleder
          }
        },
      },
    },
  );
}
```

## 5. Middleware (auth session refresh)

`middleware.ts` (proje root):

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

## 6. Kullanım örneği

```tsx
// app/page.tsx (Server Component)
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## 7. Faydalı linkler

- Docs: https://supabase.com/docs
- Next.js guide: https://supabase.com/docs/guides/auth/server-side/nextjs
- Database: https://supabase.com/docs/guides/database/overview
