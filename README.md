# LEAP Transformation Navigator — Clean Vercel Version

This is a standard Next.js application for deployment on Vercel. It contains no Vinext, Wrangler, Cloudflare Worker, Sites plugin, pnpm workspace, or custom shell build configuration.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Enter the Supabase URL, service-role key, and admin access token.
3. Run `npm ci`.
4. Run `npm run dev`.

## Vercel settings

- Framework preset: Next.js
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: leave blank
- Node.js: 20.x or later

Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_ACCESS_TOKEN` as Vercel environment variables. The service-role key must never use a `NEXT_PUBLIC_` prefix.

Run `supabase/schema.sql` in the Supabase SQL Editor before accepting submissions.
