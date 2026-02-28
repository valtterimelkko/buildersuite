# Analytics Dashboard Template

Production-ready SaaS template for analytics and data visualization products. Inspired by Plausible, Simple Analytics, and Baremetrics.

## Features

- **Big Number Cards** with sparklines and trend indicators
- **Date Range Controller** with global state management
- **Breakdown Lists** with progress bars and favicons
- **Real-time Activity Ticker** for live visitor tracking
- **Public Dashboard** sharing for "Build in Public" transparency
- **Tracking Code Generator** with framework-specific guides
- **Usage-based Billing** with Stripe integration

## Quick Start

### 1. Clone and Install

```bash
cp -r templates/analytics-dashboard my-analytics-app
cd my-analytics-app/frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Your Analytics App
```

### 3. Set Up Supabase

```bash
# Install Supabase CLI if needed
npm install -g supabase

# Initialize and link to your project
cd ../supabase
supabase init
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 4. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → Enable Google
5. Add your Client ID and Secret

### 5. Set Up Stripe Webhooks

```bash
# For local development
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret to your .env.local
```

### 6. Start Development

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

## Customization

### Brand Tokens

Edit `styles/tokens.css` to customize your brand:

```css
:root {
  /* Primary brand colors */
  --color-primary: #3B82F6;    /* Your main brand color */
  --color-secondary: #6366F1;  /* Secondary accent */
  --color-accent: #8B5CF6;     /* Highlights */

  /* Typography */
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Content Slots

Content is injected at predefined slots. See `content/slots.json` for all available slots.

**Example slots:**
- `landing.hero.headline` - Main landing page headline
- `landing.cta.primary` - Primary CTA button text
- `dashboard.empty.title` - Empty state title
- `auth.login.title` - Login page title

To customize, either:
1. Edit the placeholder values in component files (look for `{/* CONTENT_SLOT: */}` comments)
2. Use the `copywriter` skill to generate personalized content

### Adding New Features

The template follows a clear structure:
- `app/(dashboard)/` - Authenticated dashboard pages
- `app/(auth)/` - Authentication pages
- `components/dashboard/` - Dashboard-specific components
- `components/ui/` - Base UI components

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google OAuth + Magic Link) |
| Payments | Stripe (Usage-based billing) |
| Charts | Recharts |
| Icons | Lucide React |

## Billing Model

This template uses **usage-based billing**:

- **Starter ($9/mo)**: 1,000 events/month, 7-day retention
- **Pro ($29/mo)**: 50,000 events/month, 1-year retention
- **Enterprise**: Unlimited, custom pricing

See `stripe/products.json` to customize pricing tiers.

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends auth.users) |
| `teams` | Multi-tenant workspaces |
| `team_members` | Team membership with roles |
| `customers` | Stripe customer mapping |
| `subscriptions` | Subscription status tracking |
| `usage` | Usage metering for billing |
| `sites` | Domains being tracked |
| `events` | Pageview and custom events |
| `daily_stats` | Aggregated daily statistics |

All tables have Row Level Security (RLS) enabled.

## Project Structure

```
analytics-dashboard/
├── manifest.json           # Template metadata
├── README.md               # This file
├── frontend/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Auth pages
│   │   ├── (dashboard)/    # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   └── styles/             # CSS + tokens
├── supabase/
│   ├── migrations/         # Database schema
│   └── config.toml         # Supabase config
├── stripe/
│   └── products.json       # Billing products
└── content/
    └── slots.json          # Content slots
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The template is a standard Next.js app and works with any hosting that supports Node.js:
- Railway
- Render
- AWS Amplify
- Self-hosted

## Support

- [Documentation](https://docs.example.com)
- [GitHub Issues](https://github.com/example/issues)
- [Discord Community](https://discord.gg/example)

---

Built with the Meta-Project for MVPs template system.
