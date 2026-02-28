# Digital Download Portal Template

Lightweight SaaS template for selling and delivering downloadable file packs (design kits, LUTs, presets, PDF bundles). Includes landing, auth, pricing, account/billing, and a gated downloads dashboard with research-backed minimalist patterns.

## Features

- Landing page with hero, pricing, and FAQs
- Secure download locker with signed URLs and expiration timers
- Usage/quota meter with clear download limits by tier
- Order history and receipts view
- Stripe subscriptions (download limits by tier) with soft upgrade prompts
- Supabase Auth (Google OAuth + magic links)
- Storage-backed file delivery with signed URLs
- Simple settings for account and billing
- Clean, trustworthy visual style

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Payments:** Stripe (tiered download access)
- **UI Libraries:** Radix UI, Dropzone, date-fns, Lucide

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Stripe account

### Installation
1) Install dependencies
```bash
cd frontend
pnpm install
```

2) Copy env vars
```bash
cp .env.example .env.local
```

3) Configure `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase Setup
- Create a Supabase project
- Run migrations:
```bash
supabase db push
```
- Create a storage bucket (e.g., `downloads`) and serve files via signed URLs
- Enable Google OAuth (Authentication → Providers); redirect `{SUPABASE_URL}/auth/v1/callback`

### Stripe Setup
- Create products matching `stripe/products.json` (download limits per tier)
- Webhook endpoint: `{APP_URL}/api/stripe/webhook`
- Listen to:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

### Development
```bash
cd frontend
pnpm dev
```
Visit `http://localhost:3000`

## Directory Structure
```
digital-download/
├── frontend/
│   ├── app/
│   │   ├── (auth)/          # Login, signup, callback
│   │   ├── (dashboard)/     # Downloads locker + settings
│   │   ├── api/stripe/      # Stripe webhook
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   └── dashboard/       # Header, Sidebar
│   ├── lib/                 # Supabase, Stripe, helpers
│   └── styles/              # Tailwind + brand tokens
├── supabase/                # Migrations + config
├── stripe/                  # Products + pricing
├── content/                 # Content slots
└── manifest.json
```

## Database Schema (supabase/migrations)
- `profiles` — user profiles
- `customers`, `subscriptions` — Stripe mapping
- `downloads` / `assets` — file metadata + access control
- `download_history` — user download events
- `storage bucket` — actual file assets (signed URLs)

## Customization
- Brand tokens: `frontend/styles/tokens.css`
- Content slots: `content/slots.json`
- Pricing: `stripe/products.json`
- Storage bucket name: update Supabase policies + env vars as needed

## Deployment
- Vercel recommended (add env vars)
- Works on any Node host (Railway, Render, Fly, etc.)

## License
MIT
