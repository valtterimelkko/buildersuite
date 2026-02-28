# Utility Processor Template

Minimal single-purpose SaaS template for upload → process → download flows (photo tweaks, file converters, PDF tools). Built with Next.js 14, Supabase, and Stripe for usage/credit billing.

## Features

- Simple navigation (header + compact sidebar)
- Primary CTA for the core job (upload/process/download) with hero dropzone
- Drag-and-drop uploads with validation and optional manual start
- Deterministic progress + waiting UX (upload vs processing) with soft-failure retries
- Recent activity/history list with download links and retention timers
- Quota/usage meter surfaced in the dashboard with permeable paywall defaults
- Supabase Auth (Google + magic links)
- Stripe usage/credit subscriptions with webhook handling

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Payments:** Stripe (usage/credit subscriptions)
- **UI Libraries:** Radix UI, Dropzone, Lucide

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
- Create a new Supabase project
- Run migrations:
```bash
supabase db push
```
- Enable Google OAuth in Supabase Dashboard → Authentication → Providers
- Redirect URL: `{SUPABASE_URL}/auth/v1/callback`

### Stripe Setup
- Create products matching `stripe/products.json` for credit/usage tiers (starter allowance + overage)
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
utility-processor/
├── frontend/
│   ├── app/
│   │   ├── (auth)/          # Login, signup, callback
│   │   ├── (dashboard)/     # Authenticated layout + main workflow
│   │   ├── api/stripe/      # Stripe webhook
│   │   └── page.tsx         # Landing page
│   ├── components/          # UI + workflow components
│   ├── lib/                 # Supabase, Stripe, helpers
│   └── styles/              # Tailwind + brand tokens
├── supabase/                # Migrations + config
├── stripe/                  # Products + pricing
├── content/                 # Content slots
└── manifest.json
```

## Database Schema (supabase/migrations)
- `profiles` — user profiles (extends auth.users)
- `workspaces` / memberships — multi-tenant isolation
- `jobs` / `items` — queue of processing jobs (renamable per use-case)
- `attachments` — uploaded files metadata
- `customers`, `subscriptions`, `usage` — Stripe mapping + metering

## Customization
- Update brand tokens: `frontend/styles/tokens.css`
- Update copy: `content/slots.json`
- Adjust pricing/credits: `stripe/products.json`
- Extend Supabase schema: add columns to jobs/history as needed

## Deployment
- Vercel recommended (add env vars, import repo)
- Any Node-compatible host works (Railway, Render, Fly, etc.)

## License
MIT
