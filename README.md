# Buildersuite

> **An almost fully autonomous AI coding agent experience that builds your SaaS MVP for you. You drive the important decisions - the AI handles the implementation.**

Buildersuite is designed especially for non-technical founders who want to build an MVP fast, test with real users, and then improve it based on feedback. Through the **Co-CEO Process**, specialized AI agents handle both technical development AND marketing planning—from concept to deployment, from brand positioning to SEO strategy.

This repository contains **three variations** of the same core framework, designed for different AI tooling preferences and budgets:

| Variation | Primary AI Tools | Best For | Cost Profile |
|-----------|------------------|----------|--------------|
| **buildersuite-claude** | Claude Code only | Users who want the premium experience with best-in-class creative and technical capabilities | Higher |
| **buildersuite-hybrid** | Claude Code + Kimi Code CLI | Users who want Claude's creative excellence + Kimi's implementation efficiency | Medium |
| **buildersuite-glm** | Kimi Code CLI + GLM-5 | Budget-conscious users who want excellent software engineering at lower cost | Lower |

---

## Table of Contents

- [Who This Is For](#who-this-is-for)
- [What Makes Buildersuite Different?](#what-makes-buildersuite-different)
- [Frontend Templates](#frontend-templates)
- [The Autonomous Marketing Planning Process](#the-autonomous-marketing-planning-process)
- [What is the Co-CEO Process?](#what-is-the-co-ceo-process)
- [The Three Variations Explained](#the-three-variations-explained)
- [Quick Start](#quick-start)
- [Getting API Keys](#getting-api-keys)
- [The 7-Phase Development Journey](#the-7-phase-development-journey)
- [Project Structure](#project-structure)
- [FAQ](#faq)

---

## Who This Is For

Buildersuite is perfect for:

- **Non-technical founders** who have a SaaS idea but don't know how to code
- **Entrepreneurs** who want to validate their MVP quickly with real users
- **Product managers** who need to launch fast without a full development team
- **Startup founders** who want professional marketing planning alongside technical execution

You don't need coding skills. The AI agents handle the implementation while you focus on the important strategic decisions: What should your product do? Who is it for? What should it be called?

---

## What Makes Buildersuite Different?

Unlike code generation tools that just write code, Buildersuite provides an **end-to-end autonomous experience** that includes:

### ✅ Complete Technical Implementation
- Database design and security
- User authentication and payments
- Full-stack application code
- Deployment-ready infrastructure

### ✅ Professional Marketing Planning
- Market positioning strategy using 8 proven frameworks
- SEO keyword research with real search volume data
- Lead generation strategy and nurture sequences
- Landing page copy using direct response frameworks
- Content strategy with 6-month roadmap
- Brand voice guidelines for consistency

### ✅ Data-Driven Insights
The autonomous agents don't just guess—they pull real market data:
- **Google Ads API** for search volume and cost-per-click data
- **Google Trends** for trend velocity and rising search queries
- **Autosuggest mining** for long-tail keyword opportunities
- **Domain availability** checking via Porkbun API

---

## Frontend Templates

Buildersuite includes **4 production-ready frontend templates** designed for the most common types of SaaS products. Each template includes both a **landing page** and an **authenticated dashboard experience**, ready to be connected to your backend and authentication system.

### Why These Templates Matter

The core idea behind these templates is **speed to market**:
- ✅ **Deploy Fast**: Get your frontend live quickly with professional, tested code
- ✅ **Easy Backend Integration**: Connect to Supabase authentication and your API effortlessly
- ✅ **Google Sign-Up Ready**: Pre-configured OAuth flows for Google authentication in signup/login pages
- ✅ **Common SaaS Patterns**: Covering 90% of SaaS product types you might want to build

### Preview the 4 Templates

You can view each template's landing page and dashboard to see which style fits your product:

#### 1. Analytics SaaS Template
Perfect for data visualization, analytics dashboards, and metrics tracking SaaS products.
- 🔗 [Landing Page](https://analytics.letsautomate.work/)
- 🔗 [Dashboard](https://analytics.letsautomate.work/dashboard)

#### 2. Productivity Tool SaaS Template
Ideal for task management, productivity tools, and workflow automation platforms.
- 🔗 [Landing Page](https://utility.letsautomate.work/)
- 🔗 [Dashboard](https://utility.letsautomate.work/dashboard)

#### 3. Content Creator SaaS Template
Great for content generation, content management, and creator tools.
- 🔗 [Landing Page](https://content.letsautomate.work/)
- 🔗 [Dashboard](https://content.letsautomate.work/dashboard)

#### 4. Digital Download SaaS Template
Best for selling digital products, downloads, and digital goods marketplaces.
- 🔗 [Landing Page](https://digital.letsautomate.work/)
- 🔗 [Dashboard](https://digital.letsautomate.work/dashboard)

### After Implementation: Personalizing Your Frontend

**Important**: These templates provide the structural foundation, but you'll need to personalize them for your specific product:

1. **Phase 6 Completion**: After the AI completes your full frontend and backend implementation (Phase 6), the templates will be connected to your backend but will still use generic content
2. **Personalization Step**: Ask an AI agent to personalize the frontend with your project's specific content, keywords, and messaging (this is not done automatically in the current version)
3. **Continued Development**: You can then continue developing the frontend further from this template foundation—preferably with feedback from real users
4. **Professional Polish** (Optional): For a more authentic and professional look beyond the templates, consider using tools like [Kombai](https://kombai.com/) to create custom designs from your Figma mockups (we have no affiliation with Kombai, but it's excellent for design-to-code conversion)

These templates give you a solid, tested foundation so you can focus on building your unique features rather than starting from scratch.

---

## The Autonomous Marketing Planning Process

One of Buildersuite's most powerful features is its **autonomous marketing planning**. While you're getting your MVP built, you're also getting a complete go-to-market strategy—something most technical tools completely ignore.

### The 6 Marketing Agents

During Phase 1.4 of the Co-CEO Process, six specialized marketing agents execute in sequence to build your complete marketing foundation:

#### 1. **Positioning Angles Generator**
**What it does:** Analyzes your concept and generates 3-5 strategic positioning angles using 8 proven frameworks (Category Positioning, Comparative Positioning, Audience-First, Outcome-Based, Problem-Centric, Speed/Simplicity, Values/Mission, and Proof-Based).

**What you get:** 
- Multiple positioning angle candidates with headline variants
- Smoke-test-ready headlines for validation
- Recommendations on which positioning to lead with
- Strategic foundation for all marketing messaging

**Why it matters:** Positioning determines how customers categorize and value your product. Get this wrong and even great products fail to gain traction.

---

#### 2. **Keyword Research Generator**
**What it does:** Uses the "6 Circles Method" to build a comprehensive keyword map. Optionally integrates with Google Ads API and pytrends for real search data.

**Data sources it uses:**
- **Google Ads API**: Search volume, cost-per-click (CPC), and competition levels
- **Google Trends (pytrends)**: Trend velocity, rising queries, related terms—no API key needed
- **Autosuggest scraping**: Google/Bing autocomplete suggestions for long-tail keywords

**What you get:**
- Prioritized keyword list with search volume and competition data
- Keywords mapped to funnel stages (awareness, consideration, decision)
- Top 10-20 priority keywords with targeting rationale
- "RevenueZen Matrix" scoring based on intent and competition

**Why it matters:** Without keyword research, you're creating content in the dark. This agent identifies exactly what your target customers are searching for.

---

#### 3. **Lead Magnet Architect**
**What it does:** Designs high-intent lead magnets using "Value Exchange Economics"—not vanity downloads, but assets that qualify prospects.

**What you get:**
- 2-3 lead magnet format recommendations from a 20-format library
- Detailed specs: titles, hooks, content outlines, design requirements
- Landing page structure for testing
- Post-download nurture sequence (3-5 emails)
- A/B test hypotheses for validation

**Format library includes:**
- Downloadable utilities (templates, checklists, calculators)
- Educational content (guides, whitepapers, case studies)
- Interactive tools (quizzes, assessments, audits)
- Community access (newsletters, challenges, courses)

**Why it matters:** Most founders struggle with lead generation. This agent designs magnets that attract *qualified* leads, not just email addresses.

---

#### 4. **Direct Response Copywriter**
**What it does:** Generates high-converting copy for landing pages, emails, and ads using proven frameworks: PAS (Problem-Agitate-Solution), AIDA (Attention-Interest-Desire-Action), BAB (Before-After-Bridge), and JTBD (Jobs-to-Be-Done).

**What you get:**
- Complete landing page copy (hero, problem, solution, features, social proof, FAQ, CTA)
- Email sequences (welcome, nurture, activation, conversion)
- Ad copy variants for social and search ads
- Multiple copy alternatives for A/B testing
- Framework application notes explaining the psychology

**Why it matters:** Converting visitors to users is where most MVPs fail. Professional direct response copy dramatically improves conversion rates.

---

#### 5. **Brand Voice Codifier**
**What it does:** Extends your brand kit with operational voice guidelines using the Nielsen Norman 4 Tone Dimensions framework.

**What you get:**
- Voice vs. Tone distinction explained
- Tone dimension ratings (Funny↔Serious, Formal↔Casual, Respectful↔Irreverent, Enthusiastic↔Matter-of-Fact)
- "This, Not That" framework with 10+ concrete examples
- Context-specific tone variations (errors, success states, onboarding, billing, support)
- Microcopy dictionary (buttons, system messages, form patterns)
- Voice governance guidelines

**Why it matters:** Inconsistent voice confuses customers and damages trust. These guidelines ensure every touchpoint—from error messages to marketing emails—feels cohesive.

---

#### 6. **SEO Content Planner**
**What it does:** Transforms keyword research into an actionable 6-month content strategy using the Pillar-Cluster model and Business Potential scoring.

**What you get:**
- 3-5 pillar pages identified with cluster topics
- Content mapped to buyer journey stages (ToFu, MoFu, BoFu)
- Business Potential scoring (traffic × business value)
- Prioritized 6-month content calendar
- Reusable content brief template
- Internal linking strategy

**Why it matters:** Content without strategy is wasted effort. This agent ensures every piece of content you create serves a strategic purpose and drives organic traffic.

---

### The Power of Integration

These six agents don't work in isolation—they build on each other:

1. **Positioning** establishes your strategic foundation
2. **Keywords** identify what your audience is searching for
3. **Lead magnets** convert that search traffic into qualified leads
4. **Copy** turns those leads into users
5. **Voice guidelines** ensure consistency across all touchpoints
6. **Content strategy** creates a sustainable organic growth engine

And here's the best part: **All of this happens autonomously.** You review and approve, but you don't have to become a marketing expert or hire an agency. The AI agents execute based on proven frameworks and real market data.

---

## What is the Co-CEO Process?

The **Co-CEO Process** is your AI-powered team that builds your SaaS MVP from concept to launch. Think of it like having a startup co-founder who handles all the technical and marketing work while you focus on strategic decisions.

### How It Works: You Lead, AI Executes

**Your Role (The Strategic Decisions):**
- Define what your product should do
- Choose your target audience
- Pick your product name and branding direction
- Select which features to prioritize
- Review and approve what the AI creates

**AI's Role (The Implementation):**
- Write all the code for your application
- Design your database and security
- Create your brand identity and marketing materials
- Research keywords and plan your SEO strategy
- Generate landing page copy and email sequences
- Set up payments and user authentication

### The Development Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     YOUR AI-POWERED MVP JOURNEY                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Phase 0: Setup ───────────────► Get your API keys ready                │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 1: Concept & Marketing ─► Brand + Marketing Strategy             │
│       │                          (6 Marketing Agents Execute Here)      │
│       ▼                                                                  │
│  Phase 2: Design ──────────────► UX Design + Technical Architecture     │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 3: Quality Check ───────► Validate Everything Fits Together      │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 4: Planning ────────────► Pick Your Template + Setup Services    │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 5: Quality Check ───────► Final Architecture Review              │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 6: Build ───────────────► AI Writes All Your Code                │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 7: Launch ──────────────► Deploy and Get Feedback                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

Each phase uses **specialized AI agents** that are experts in their domain—brand creation, UX design, technical architecture, marketing strategy, and code implementation. You make the decisions, they do the work.

---

## The Three Variations Explained

Buildersuite comes in three versions to fit different budgets and preferences. All three deliver the same complete experience—technical implementation + marketing planning—they just use different AI tools:

| Variation | AI Tools Used | Best For | Monthly Cost Estimate |
|-----------|---------------|----------|-----------------------|
| **buildersuite-claude** | Claude Code only | Premium experience, simplest setup | ~$50-100 |
| **buildersuite-hybrid** | Claude Code + Kimi Code | Balanced cost and quality | ~$30-60 |
| **buildersuite-glm** | Kimi Code + GLM-5 | Budget-conscious builders | ~$15-30 |

### buildersuite-claude (Pure Claude Code)

**Best for**: Founders who want the smoothest experience and don't mind the premium price

**What it is**: Uses Claude Code for everything—brand creation, marketing strategy, and code implementation. One tool, one workflow.

**Key characteristics**:
- Single AI tool to learn (Claude Code)
- Best brand and UX design quality
- Excellent for creative work (branding, marketing, copywriting)
- 20+ specialized agents built-in
- Most polished and tested version

**Pros**:
- ✅ Simplest setup—just one tool
- ✅ Best creative output quality
- ✅ Smoothest workflow
- ✅ Most mature implementation

**Cons**:
- ❌ Higher monthly cost (~$50-100)
- ❌ Requires Claude Code subscription

**Start here**: Open `CLAUDE.md` or `CLAUDE_Reserve.md` in Claude Code

---

### buildersuite-hybrid (Claude Code + Kimi Code CLI)

**Best for**: Founders who want Claude's creative excellence at a lower cost

**What it is**: Uses Claude Code for creative work (branding, marketing) and switches to Kimi Code CLI for technical implementation.

**Phase Split**:
| Phases | Tool Used | What Happens |
|--------|-----------|--------------|
| 0.0 - 1.5 | Claude Code | Concept, brand, and marketing strategy |
| 2.1 - 7.1 | Kimi Code CLI | Design, architecture, and code implementation |

**Pros**:
- ✅ Best of both worlds: Claude's creativity + Kimi's cost-effectiveness
- ✅ Lower cost than pure Claude (~$30-60/month)
- ✅ Same high-quality outputs

**Cons**:
- ❌ Need both Claude Code and Kimi Code CLI
- ❌ Switch tools at Phase 1.5
- ❌ Slightly more complex setup

**Start here**: 
- Begin with `CLAUDE_Reserve.md` in Claude Code (Phases 0-1.5)
- Continue with `KIMI_Reserve.md` in Kimi Code CLI (Phases 2-7)

---

### buildersuite-glm (Kimi Code CLI + GLM-5)

**Best for**: Budget-conscious founders who want excellent quality at the lowest cost

**What it is**: Uses Kimi Code CLI for early phases (concept, brand, design) and GLM-5 for implementation. GLM-5 is a powerful coding model available through various tools.

**Phase Split**:
| Phases | Tool Used | Model | What Happens |
|--------|-----------|-------|--------------|
| 0.0 - 4.2 | Kimi Code CLI | kimi-k2.5 | Concept, brand, design, planning |
| 4.3 - 7.1 | GLM-5 Harness | GLM-5 | Integration and code implementation |

**Pros**:
- ✅ Most affordable option (~$15-30/month)
- ✅ GLM-5 excels at software engineering
- ✅ Same deliverables as other versions

**Cons**:
- ❌ Two tools required + GLM-5 harness setup
- ❌ Tool switch at Phase 4.3
- ❌ More complex toolchain

**GLM-5 harness options**: Roo Code, OpenCode, Kilo Code, Kimi Code CLI, Cline

**Start here**:
- Begin with `AGENTS_Reserve.md` in Kimi Code CLI (Phases 0-4.2)
- Continue with `CLAUDE_Reserve.md` using GLM-5 (Phases 4.3-7.1)

---

## Quick Start

### What You'll Need Before Starting

1. **A computer** with Git, Node.js (v18+), and Python (v3.9+)
2. **Your SaaS idea** written down in a document
3. **API accounts** for required services (we'll help you get these)
4. **2-3 hours** for your first session

Don't worry if you don't have the API accounts yet—Phase 0 will guide you through setting them up.

### Step 1: Pick Your Version

Choose based on your budget and comfort level:

```bash
# Option A: Claude only (simplest, ~$50-100/month)
cp -r buildersuite-claude my-saas-project

# Option B: Claude + Kimi (balanced, ~$30-60/month)
cp -r buildersuite-hybrid my-saas-project

# Option C: Kimi + GLM-5 (budget-friendly, ~$15-30/month)
cp -r buildersuite-glm my-saas-project
```

**Not sure which to pick?** Start with **buildersuite-claude** for the smoothest experience.

### Step 2: Set Up Your Project

```bash
cd my-saas-project

# Initialize git (so you can save your progress)
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Create environment file for API keys (you'll fill this in Phase 0)
cp .env.example .env
```

### Step 3: Start Building!

**For buildersuite-claude:**
```bash
# Open the starting document in Claude Code
claude CLAUDE_Reserve.md
```

**For buildersuite-hybrid:**
```bash
# Start with Claude Code for creative phases
claude CLAUDE_Reserve.md
# (After Phase 1.5, you'll switch to Kimi Code CLI)
```

**For buildersuite-glm:**
```bash
# Start with Kimi Code CLI
kimi AGENTS_Reserve.md
# (After Phase 4.2, you'll switch to GLM-5)
```

The AI will guide you through each phase. Your main job is to:
- Review what it creates
- Make decisions when asked
- Approve before moving to the next phase

That's it! The AI handles the implementation—you focus on steering the direction.

### What to Expect

**Total time investment**: 8-16 hours spread over several sessions
- **First session** (3-5 hours): Concept, brand, and marketing strategy
- **Second session** (2-4 hours): UX design and technical planning
- **Third session** (3-5 hours): Template selection and service setup
- **Fourth session** (4-8 hours): Code implementation and testing

**What you'll have at the end**:
- ✅ A fully functional SaaS application
- ✅ Database with security configured
- ✅ User authentication and payment processing
- ✅ Professional brand identity
- ✅ Complete marketing strategy with positioning, keywords, and content plan
- ✅ Landing page copy and email sequences
- ✅ 6-month SEO content calendar

**No coding experience required.** The AI writes all the code. You just make the strategic decisions.

---

## Getting API Keys

Don't worry if this sounds technical—getting API keys is like creating accounts on websites. The AI will guide you through this in Phase 0, but here's what you'll need:

### Required Services (You Need These)

#### 1. Supabase - Your Database and User Management

**What it does**: Stores your data, handles user logins, manages file uploads

**Cost**: Free for MVPs (500MB database, 1GB storage)

**How to get it** (5 minutes):
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project" and choose a name
3. Go to Project Settings → API and copy these values:
   - Project URL (for `SUPABASE_URL`)
   - `anon` / `public` key (for `SUPABASE_ANON_KEY`)
   - `service_role` key (for `SUPABASE_SERVICE_ROLE_KEY` - keep this secret!)
4. Go to [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) to get your access token (for `SUPABASE_ACCESS_TOKEN`)
5. Note your Organization ID from the URL when viewing your organization (for `SUPABASE_ORG_ID`)

**Why you need it**: Every SaaS needs a database. Supabase gives you a professional database with security built-in.

---

#### 2. Stripe - Payment Processing

**What it does**: Handles credit card payments and subscriptions for your SaaS

**Cost**: Free to set up, you pay 2.9% + 30¢ per transaction

**How to get it** (5 minutes):
1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers → API keys
3. Copy your test keys (they start with `pk_test_` and `sk_test_`)
4. Later, when you're ready to launch, you'll get live keys

**Why you need it**: If you want to charge for your product, Stripe is the easiest and most professional way to accept payments.

---

### Optional Services (Nice to Have)

#### 3. Notion - Project Documentation

**What it's for**: Optional - syncing project documentation to Notion

**How to get it**:
1. Go to [notion.so](https://notion.so) and sign up
2. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
3. Create a new integration
4. Copy the "Internal Integration Token"
5. Share your database/page with the integration

**Cost**: Free personal plan available

---

#### 4. Porkbun - Domain Availability Checking

**What it's for**: Automatically checks if domain names are available during the naming phase

**How to get it**:
1. Go to [porkbun.com](https://porkbun.com) and create an account
2. Go to Account → API Access
3. Enable API access
4. Generate API key and secret

**Cost**: Free API access, domains cost ~$9/year if you decide to buy one

**Skip this if**: You're fine manually checking domain availability on GoDaddy or Namecheap

---

#### 5. Google Ads API - Keyword Search Volume Data

**What it's for**: Gets real search volume and cost-per-click data for keyword research (used by the Keyword Research Generator agent)

**How to get it**:
1. Have a Google Ads account
2. Apply for Developer Token (requires Google Ads manager account)
3. Approval can take several days

**Cost**: Free to obtain, you only pay if you run ads

**Skip this if**: The agents will use Google Trends (free, no API key needed) as a fallback for keyword volume estimates

---

### What About Google Trends?

Good news! The **Keyword Research Generator** agent also uses **Google Trends** (via pytrends) which requires **no API key**. It provides:
- Trend velocity (is interest growing or declining?)
- Rising search queries
- Related search terms

This works as a free alternative or complement to Google Ads data.

---

### Summary: What's Actually Required?

**Must have** (Phase 0 will block without these):
- ✅ Supabase account + keys
- ✅ Stripe account + keys

**Nice to have** (agents will work around if missing):
- 📋 Notion (for documentation sync)
- 🌐 Porkbun (for domain checking)
- 📊 Google Ads API (for precise search volumes)

**Built-in and free** (no setup needed):
- ✨ Google Trends via pytrends (keyword trends and volume estimates)
- ✨ Autosuggest scraping (long-tail keyword discovery)

---

### Your .env File

After getting your API keys, your `.env` file should look like this:

```bash
# ============================================
# REQUIRED: Supabase Configuration
# ============================================
SUPABASE_ACCESS_TOKEN=your_supabase_access_token_here
SUPABASE_ORG_ID=your_supabase_organization_id_here
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# ============================================
# REQUIRED: Stripe Configuration
# ============================================
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# ============================================
# OPTIONAL: Notion Integration
# ============================================
NOTION_TOKEN=secret_your_notion_token_here

# ============================================
# OPTIONAL: Porkbun Domain Checking
# ============================================
PORKBUN_API_KEY=your_porkbun_api_key_here
PORKBUN_API_SECRET=your_porkbun_secret_here

# ============================================
# OPTIONAL: Additional Services
# ============================================
CONTEXT7_API_KEY=your_context7_api_key_here
BROWSERLESS_API_KEY=your_browserless_api_key_here
GOOGLE_ADS_DEVELOPER_TOKEN=your_google_ads_token_here
```

---

## The 7-Phase Development Journey

Here's what to expect at each phase of the Co-CEO process:

### Phase 0: Prerequisites
**Duration**: 30-60 minutes  
**Your involvement**: High  
**Output**: Verified API credentials

What happens:
- Co-CEO verifies your `.env` configuration
- Tests connections to Supabase, Stripe, and other services
- You may need to create accounts and generate keys

What you need:
- Accounts on required services
- API keys ready

---

### Phase 1: Concept & Brand
**Duration**: 2-4 hours  
**Your involvement**: Medium-High  
**Outputs**: Master concept, brand kit, marketing foundation

#### 1.1 Master Concept Refinement (You + Co-CEO)
- Refine your SaaS concept
- Define target audience, value proposition, features
- Output: `docs/concept/master-concept.md`

#### 1.2 Brand Kit Creation (Agent)
- Creates visual identity system
- Colors, typography, logo concepts
- Output: `docs/brand/brand-kit-guide.md`

#### 1.3 Naming & Domain (You + Co-CEO)
- Brainstorm names
- Check domain availability (if Porkbun configured)
- Select final name

#### 1.4 Marketing Foundation (6 Sequential Agents)
- **Positioning Angles Generator**: Market positioning strategy
- **Keyword Research Generator**: SEO keyword map
- **Lead Magnet Architect**: Lead generation strategy
- **Direct Response Copywriter**: Landing page copy
- **Brand Voice Codifier**: Voice & tone guidelines
- **SEO Content Planner**: Content strategy

Outputs: `marketing/*.md` (6 files)

#### 1.5 Session Break (Optional)
- Natural stopping point
- In hybrid mode, this is where you switch from Claude to Kimi

---

### Phase 2: Design
**Duration**: 2-3 hours  
**Your involvement**: Medium  
**Outputs**: UX design, technical architecture

#### 2.1 MVP UX Design (Agent)
- Creates complete UX specifications
- User flows, wireframes, component specifications
- Output: `docs/mvp-ux-[project].md`

#### 2.2 Technical PRD & Git Structure (Agent)
- Technical architecture document
- Database schema, API design, tech stack decisions
- Git workflow setup
- Output: `docs/Project-Technical-Architecture.md`

---

### Phase 3: Quality Gate #1
**Duration**: 30 minutes  
**Your involvement**: Low  
**Output**: Validation report

- Agent checks consistency between Phase 1 & 2 outputs
- Validates that UX matches concept
- Validates that architecture supports UX

---

### Phase 4: Planning & Setup
**Duration**: 3-5 hours  
**Your involvement**: High (critical decisions)  
**Outputs**: Notion sync, template selection, stage plans

#### 4.1 Notion Database Building (Optional Agent)
- Syncs project docs to Notion (if configured)

#### 4.2 User Approval & Template Selection (You + Co-CEO) ⚠️ **CRITICAL**
- **You** review all documents generated so far
- **You** select one of 5 templates:
  - `analytics-dashboard`: Usage analytics SaaS
  - `content-creator`: Content creation platform
  - `digital-download`: Digital product sales
  - `productivity-tool`: Task/productivity SaaS
  - `utility-processor`: File processing utility
- Output: `docs/selected-template.txt`

#### 4.2.5 Infrastructure Prerequisites (Blocking Gate)
- Verifies Stripe and Supabase are properly configured
- Must pass before proceeding

#### 4.3 Template Integration (Agents)
- **Brand Personalizer**: Applies brand to template
- **Content Copywriter**: Generates template-specific content
- **Stripe Deployer**: Sets up Stripe products/prices
- **Supabase Deployer**: Deploys database schema and RLS policies

#### 4.3.5 Supabase Security Audit (Blocking Agent)
- Reviews Row Level Security policies
- Must pass before implementation

#### 4.4 Stage Architecture Planning (Parallel Agents)
- Breaks implementation into stages
- Creates architecture document for each stage
- Outputs: `docs/stages/stage-XX-*.md`

---

### Phase 5: Quality Gate #2
**Duration**: 30 minutes  
**Your involvement**: Low  
**Output**: Architecture validation

- Validates consistency across all stage architecture files
- Ensures stages integrate properly

---

### Phase 6: Implementation
**Duration**: 4-8 hours (depending on complexity)  
**Your involvement**: Medium  
**Outputs**: Working code, build verification

#### 6.2 Security Review (Agent)
- Pre-implementation security analysis
- Identifies potential vulnerabilities
- Output: Security findings document

#### 6.1 Stage Execution (Sequential Agents)
- Implements each stage according to architecture docs
- Uses test-driven development
- Git commits at each stage

#### 6.9 Build Verification Gate (Blocking)
- Verifies the application builds successfully
- Runs tests
- Must pass before completion
- Output: `docs/build-verification-report.md`

---

### Phase 7: Completion
**Duration**: 30 minutes  
**Your involvement**: Medium  
**Output**: Project summary

- Final validation
- Deployment guidance
- Handoff documentation
- Summary of what was built

---

## Project Structure

Each variation follows this structure:

```
my-saas-project/
├── README.md                          # Project documentation
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
│
├── docs/                              # Output documents
│   ├── concept/                       # Master concept
│   ├── brand/                         # Brand kit
│   ├── stages/                        # Stage architecture files
│   ├── build-reports/                 # Build verification
│   └── ...
│
├── marketing/                         # Marketing deliverables
│   ├── positioning-angles.md
│   ├── keyword-research.md
│   └── ...
│
├── templates/                         # 5 SaaS starter templates
│   ├── analytics-dashboard/
│   ├── content-creator/
│   ├── digital-download/
│   ├── productivity-tool/
│   └── utility-processor/
│
└── [platform-specific directories]     # Varies by variation
    ├── .claude/                       # Claude Code resources
    ├── .kimi/                         # Kimi Code CLI resources
    ├── .glm5/                         # GLM-5 resources
    └── .shared/                       # Shared resources (hybrids)
```

---

## FAQ

### Do I really not need to know how to code?

**Short answer**: No coding skills required!

**Long answer**: The AI agents write all the code. Your job is to make strategic decisions:
- What should the product do?
- Who is it for?
- What should your product be named?
- Which features are most important?

If you can use Google Docs and make decisions about your business, you can use Buildersuite.

---

### Which version should I choose if I'm just starting out?

Start with **buildersuite-claude**. It's the simplest to set up (just one tool) and provides the smoothest experience. Yes, it costs more (~$50-100/month), but when you're validating an idea, your time is more valuable than the cost difference.

Once you're comfortable with the process, you can explore the hybrid or GLM versions for cost savings.

---

### How long until I can show my MVP to users?

**Realistic timeline**: 1-2 weeks of part-time work (8-16 hours total)

- **Week 1, Session 1** (3-5 hours): Brand, concept, and marketing strategy complete
- **Week 1, Session 2** (2-4 hours): UX design and technical planning done
- **Week 2, Session 3** (3-5 hours): Services connected, template customized
- **Week 2, Session 4** (4-8 hours): Full application built and tested

After that, you have a working MVP you can deploy and share with users.

---

### What's included in the "marketing planning" exactly?

You get a complete go-to-market foundation:

1. **Positioning Strategy**: How to position your product in the market (using 8 proven frameworks)
2. **Keyword Research**: What your customers are searching for, with search volumes
3. **Lead Generation Strategy**: How to capture qualified leads (with magnet specs and nurture sequences)
4. **Landing Page Copy**: Professional direct response copy for your homepage
5. **Brand Voice Guidelines**: Consistency rules for all your messaging
6. **6-Month Content Calendar**: SEO content strategy with topics prioritized

This represents the type of work that marketing agencies typically charge thousands of dollars for.

---

### Can I customize the templates after they're generated?

Absolutely! The templates are professional starting points that get customized with your brand during Phase 4. After that, you can continue customizing them—they're just standard Next.js/React code.

The AI sets up the foundation; you can tweak and extend as needed.

---

### What if I get stuck or something breaks?

The process has built-in error handling:

1. **Agents retry automatically**: If an agent hits an issue, it tries 3 times with different approaches
2. **Quality gates**: Phase 3 and Phase 5 check that everything fits together
3. **Build verification**: Phase 6 includes build and test verification before completion

If something still doesn't work, the AI will explain the issue and suggest solutions. You're never left stranded.

---

### Is the code production-ready or just a prototype?

The code is production-ready with:
- ✅ Database security (Row Level Security policies)
- ✅ User authentication (via Supabase)
- ✅ Payment processing (Stripe integration with webhooks)
- ✅ Error handling and boundaries
- ✅ Build verification and tests

However, before going live with real users, you should:
- Review the generated code
- Test with real users in a staging environment
- Consider a security audit if handling sensitive data

Think of it as 80-90% done. You still need to polish, test, and validate with users.

---

### How much does this cost to run each month?

**Infrastructure** (required):
- Supabase: **$0** (free tier covers most MVPs)
- Stripe: **$0** + 2.9% per transaction
- **Total**: $0-$10/month for small MVPs

**AI Tools** (pick one):
- buildersuite-claude: ~$50-100/month
- buildersuite-hybrid: ~$30-60/month
- buildersuite-glm: ~$15-30/month

**Realistic total for getting started**: $20-$110/month depending on which version you choose.

---

### Can I use this for any kind of SaaS?

The included templates cover the most common SaaS patterns:
- **Analytics Dashboard**: For data visualization, analytics, and metrics tracking SaaS
- **Productivity Tool**: For task/project management, workflow automation, and productivity SaaS
- **Content Creator**: For content generation, content management, and creator tools
- **Digital Download**: For selling digital products, downloads, and digital goods
- **Utility Processor**: For file processing, conversion tools, and data transformation (variant of Productivity Tool)

You can [preview all templates live](#frontend-templates) to see which style fits your product best.

If your idea fits one of these patterns (and most SaaS ideas do), you're good to go. If you need something completely different, the templates are fully customizable starting points.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

This is a community resource. Improvements and adaptations are welcome. The core Co-CEO process can be extended with new agents, skills, and templates.

---

## Support

For issues, questions, or discussions:
- Open a GitHub issue
- Check the documentation in `docs/` folder
- Review the specific variation's README files

---

## Ready to Build Your MVP?

You now understand what Buildersuite offers:
- ✅ Complete technical implementation (database, auth, payments, code)
- ✅ Professional marketing planning (positioning, keywords, copy, content strategy)
- ✅ Data-driven insights (Google Ads API, Google Trends, autosuggest)
- ✅ Autonomous AI agents that do the work while you make decisions

### Next Steps:

1. **Decide which version to use** (buildersuite-claude recommended for beginners)
2. **Copy the folder** to start your project
3. **Get your API keys** (Supabase and Stripe required, others optional)
4. **Launch Phase 0** and let the AI guide you through the process

### What You'll Have in 1-2 Weeks:

- A fully functional SaaS application ready to deploy
- Professional brand identity and marketing materials
- Complete go-to-market strategy with content calendar
- Real users testing your MVP and giving feedback

**No coding experience needed. You drive the vision—AI handles the implementation.**

Choose your variation and start building!
