# Content Creator Template

A content management and publishing platform for creators, writers, and media teams. Built with Next.js 14, Supabase, and Stripe for feature-based billing.

## Features

- **Rich text editor**: TipTap-powered editor with formatting, images, and links
- **Media library**: Upload and organize images and files
- **Content calendar**: Visual scheduling with drag-and-drop
- **Feature-based billing**: Post limits, storage quotas, team size
- **Multi-tenant workspaces**: Isolated content per organization
- **Warm, creative design**: Coral accents, serif typography

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe (feature-limits subscriptions)
- **UI Libraries**: TipTap, react-dropzone, date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- Stripe account

### Installation

1. Install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Configure environment variables in `.env.local`:
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

1. Create a new Supabase project

2. Run migrations in order:
   ```bash
   supabase db push
   ```

   Or manually run each migration file in `supabase/migrations/`

3. Create a storage bucket named `media`:
   - Go to Storage in Supabase Dashboard
   - Create new bucket called `media`
   - Set to public for image serving

4. Enable Google OAuth in Supabase Dashboard:
   - Go to Authentication > Providers > Google
   - Add your Google OAuth credentials
   - Set redirect URL to `{SUPABASE_URL}/auth/v1/callback`

### Stripe Setup

1. Create products matching `stripe/products.json`:
   - Starter (free)
   - Creator ($15/month)
   - Studio ($39/month)

2. Set up webhook endpoint:
   - URL: `{APP_URL}/api/stripe/webhook`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
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
content-creator/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── callback/
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── content/
│   │   │       ├── media/
│   │   │       ├── calendar/
│   │   │       └── settings/
│   │   ├── api/
│   │   │   └── stripe/webhook/
│   │   └── page.tsx (landing)
│   ├── components/
│   │   └── dashboard/
│   │       ├── RichTextEditor.tsx
│   │       ├── MediaUploader.tsx
│   │       ├── ContentCalendar.tsx
│   │       ├── Sidebar.tsx
│   │       └── Header.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   └── stripe/
│   └── styles/
│       ├── tokens.css
│       └── globals.css
├── supabase/
│   ├── config.toml
│   └── migrations/
│       ├── 00001_auth_schema.sql
│       ├── 00002_billing_schema.sql
│       └── 00003_app_schema.sql
├── stripe/
│   └── products.json
├── content/
│   └── slots.json
└── manifest.json
```

## Database Schema

### Core Tables

- `profiles` - User profiles (extends Supabase auth.users)
- `workspaces` - Content studios/organizations
- `workspace_members` - Membership with roles (owner, admin, editor, member)
- `posts` - Content with status workflow
- `categories` - Post categorization
- `media` - Uploaded files and images

### Billing Tables

- `customers` - Stripe customer mapping
- `subscriptions` - Active subscriptions with feature limits
- `feature_usage` - Monthly usage tracking

## Content Status Workflow

```
draft → review → scheduled → published
                    ↓
                 archived
```

## Feature Limits

| Feature | Starter | Creator | Studio |
|---------|---------|---------|--------|
| Posts | 10 | 100 | Unlimited |
| Storage | 500MB | 10GB | 100GB |
| Scheduled | 5 | 50 | Unlimited |
| Team | 1 | 3 | 10 |

## Customization

### Brand Tokens

Edit `frontend/styles/tokens.css` to customize:
- Colors (warm coral, golden yellow, sage green)
- Typography (Inter for UI, Merriweather for content)
- Spacing and borders

### Content

Edit `content/slots.json` to customize all user-facing copy.

### Billing Model

Edit `stripe/products.json` to adjust:
- Pricing tiers
- Feature limits per tier
- Plan descriptions

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy

### Other Platforms

Build the production bundle:
```bash
cd frontend
pnpm build
```

## Support

For issues and feature requests, please open a GitHub issue.

## License

MIT
