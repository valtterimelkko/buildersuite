# Productivity Tool Template

A keyboard-first issue tracking and project management template inspired by Linear. Built with Next.js 14, Supabase, and Stripe for seat-based billing.

## Features

- **Keyboard-first design**: Every action has a shortcut
- **Command palette**: Navigate anywhere with ⌘K
- **Kanban boards**: Drag-and-drop issue management
- **Side peek**: Quick issue editing without losing context
- **Dark mode by default**: Easy on the eyes for long sessions
- **Seat-based billing**: Per-user pricing with Stripe
- **Workspace-based multi-tenancy**: Team isolation with RLS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Payments**: Stripe (seat-based subscriptions)
- **UI Libraries**: cmdk, @hello-pangea/dnd, TipTap

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

3. Enable Google OAuth in Supabase Dashboard:
   - Go to Authentication > Providers > Google
   - Add your Google OAuth credentials
   - Set redirect URL to `{SUPABASE_URL}/auth/v1/callback`

### Stripe Setup

1. Create products matching `stripe/products.json`:
   - Free tier (5 seats)
   - Pro tier ($8/seat/month)
   - Business tier ($12/seat/month)

2. Set up webhook endpoint:
   - URL: `{APP_URL}/api/stripe/webhook`
   - Events to listen for:
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
productivity-tool/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── callback/
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── my-issues/
│   │   │       ├── projects/
│   │   │       ├── views/
│   │   │       └── settings/
│   │   ├── api/
│   │   │   └── stripe/webhook/
│   │   └── page.tsx (landing)
│   ├── components/
│   │   └── dashboard/
│   │       ├── CommandPalette.tsx
│   │       ├── KanbanBoard.tsx
│   │       ├── SidePeek.tsx
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

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `C` | Create new issue |
| `J/K` | Navigate up/down |
| `↵` | Open selected issue |
| `E` | Edit issue |
| `S` | Change status |
| `P` | Change priority |
| `A` | Assign issue |
| `L` | Add label |
| `Esc` | Close modal/panel |

## Database Schema

### Core Tables

- `profiles` - User profiles (extends Supabase auth.users)
- `workspaces` - Team workspaces (multi-tenant)
- `workspace_members` - Workspace membership with roles
- `projects` - Issue containers
- `issues` - The core entity with status, priority, assignments
- `labels` - Issue categorization
- `comments` - Issue discussions

### Billing Tables

- `customers` - Stripe customer mapping
- `subscriptions` - Active subscriptions with seat counts
- `seat_usage` - Historical seat usage tracking

## Customization

### Brand Tokens

Edit `frontend/styles/tokens.css` to customize:
- Colors (background, foreground, primary, status colors)
- Typography
- Spacing
- Border radius

### Content

Edit `content/slots.json` to customize all user-facing copy.

### Billing Model

Edit `stripe/products.json` to adjust:
- Pricing tiers
- Seat limits
- Features per tier

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
