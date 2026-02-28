# Buildersuite

> **AI-Powered Meta-Framework for Building SaaS MVPs**

Buildersuite is a production-ready, agentic workflow system for rapidly developing Software-as-a-Service (SaaS) Minimum Viable Products (MVPs) from concept to deployment. It orchestrates multiple AI agents through a structured 7-phase development process called the **Co-CEO Process**.

This repository contains **three variations** of the same core framework, designed for different AI tooling preferences and budgets:

| Variation | Primary AI Tools | Best For | Cost Profile |
|-----------|------------------|----------|--------------|
| **buildersuite-claude** | Claude Code only | Users who want the premium experience with best-in-class creative and technical capabilities | Higher |
| **buildersuite-hybrid** | Claude Code + Kimi Code CLI | Users who want Claude's creative excellence + Kimi's implementation efficiency | Medium |
| **buildersuite-glm** | Kimi Code CLI + GLM-5 | Budget-conscious users who want excellent software engineering at lower cost | Lower |

---

## Table of Contents

- [What is the Co-CEO Process?](#what-is-the-co-ceo-process)
- [The Three Variations Explained](#the-three-variations-explained)
- [Quick Start](#quick-start)
- [Getting API Keys](#getting-api-keys)
- [The 7-Phase Development Journey](#the-7-phase-development-journey)
- [Project Structure](#project-structure)
- [FAQ](#faq)

---

## What is the Co-CEO Process?

The **Co-CEO Process** is a sophisticated, multi-phase agentic workflow that treats AI agents as specialized team members working under your direction. Just as a startup might have a CEO handling vision and a CTO handling implementation, the Co-CEO process assigns specific roles to different AI agents at different phases of development.

### Core Philosophy

1. **Orchestration over Implementation**: You (the human) and the Co-CEO orchestration layer direct specialized agents, rather than doing the work yourself
2. **Phase-Gated Development**: Each phase has specific inputs, outputs, and quality gates
3. **Agent Specialization**: Different tasks require different agent capabilities (creative vs. technical)
4. **Platform Flexibility**: Use the AI tools that match your budget and preferences

### How It Works

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CO-CEO PROCESS                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Phase 0: Prerequisites ───────► API & Infrastructure Setup             │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 1: Concept & Brand ─────► Master Concept → Brand Kit → Marketing │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 2: Design ──────────────► UX Design → Technical Architecture     │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 3: Quality Gate #1 ─────► Document Consistency Validation        │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 4: Planning ────────────► Notion Sync → Template Selection       │
│       │                         → Security Audit → Stage Planning       │
│       ▼                                                                  │
│  Phase 5: Quality Gate #2 ─────► Architecture Consistency Check         │
│       │                                                                  │
│       ▼                                                                  │
│  Phase 6: Implementation ──────► Security Review → Stage Execution      │
│       │                         → Build Verification                    │
│       ▼                                                                  │
│  Phase 7: Completion ──────────► Final Validation & Handoff             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

Each phase uses **specialized sub-agents** for tasks like brand creation, UX design, technical architecture, and implementation. The Co-CEO orchestration layer manages handoffs between these agents.

---

## The Three Variations Explained

### buildersuite-claude (Pure Claude Code)

**Best for**: Users who want the most streamlined experience with a single, powerful AI tool

**What it is**: The original, complete implementation using **Claude Code** as the sole AI orchestrator throughout all 7 phases.

**Key characteristics**:
- Uses Claude's built-in multi-agent spawning with model selection (`haiku` for fast/creative tasks, `opus` for complex/technical tasks)
- 20+ specialized agent definitions in `.claude/agents/`
- 58+ skills in `.claude/skills/`
- All phases (0-7) use Claude Code

**Pros**:
- ✅ Single tool to learn and use
- ✅ Best-in-class UI/UX design capabilities
- ✅ Excellent for creative phases (branding, marketing)
- ✅ Seamless agent handoffs within one platform
- ✅ Most mature and tested implementation

**Cons**:
- ❌ Higher cost (Claude Code is premium priced)
- ❌ Requires Claude Code subscription
- ❌ No alternative for budget-conscious users

**Entry point**: `CLAUDE.md` or `CLAUDE_Reserve.md`

---

### buildersuite-hybrid (Claude Code + Kimi Code CLI)

**Best for**: Users who want Claude's creative excellence but more cost-effective implementation

**What it is**: A **hybrid workflow** that strategically splits phases between Claude Code (for creative work) and Kimi Code CLI (for technical implementation).

**Phase Distribution**:
| Phases | Platform | Why |
|--------|----------|-----|
| 0.0 - 1.5 | **Claude Code** | Creative work: concept, brand kit, marketing |
| 1.5 (break) | Transition | Handoff point |
| 2.1 - 7.1 | **Kimi Code CLI** | Technical work: design, architecture, implementation |

**Key characteristics**:
- Shared `.shared/` directory contains skills and scripts used by both platforms
- Claude agents in `.claude/agents/` (21 agents)
- Kimi wrappers in `.kimi/skills/`
- Dual entry points: `CLAUDE_Reserve.md` and `KIMI_Reserve.md`

**Pros**:
- ✅ Leverages Claude's strength in creative/marketing phases
- ✅ Uses Kimi's cost-effective implementation for coding
- ✅ Shared skill library means no duplication
- ✅ Best of both worlds approach

**Cons**:
- ❌ Requires both Claude Code and Kimi Code CLI
- ❌ Context switching between platforms at Phase 1.5
- ❌ Slightly more complex setup

**Entry points**: 
- Start: `CLAUDE_Reserve.md` (Phases 0-1.5)
- Continue: `KIMI_Reserve.md` (Phases 2-7)

---

### buildersuite-glm (Kimi Code CLI + GLM-5)

**Best for**: Budget-conscious users who want excellent software engineering capabilities at lower cost

**What it is**: A **cost-optimized hybrid** using Kimi Code CLI for early phases and GLM-5 for implementation. GLM-5 is a highly capable coding model available through various harnesses.

**Phase Distribution**:
| Phases | Platform | Model | Purpose |
|--------|----------|-------|---------|
| 0.0 - 4.2 | **Kimi Code CLI** | `kimi-k2.5` | Concept, brand, design, planning |
| 4.3 - 7.1 | **GLM-5** | `GLM-5` | Integration, implementation, completion |

**Key characteristics**:
- Kimi agents in `.kimi/agents/` (15 agents for phases 0-4.2)
- GLM-5 agents in `.glm5/agents/` (6 agents for phases 4.3-7.1)
- Shared `.shared/` resources like the hybrid version
- Explicit model selection in agent prompts

**Pros**:
- ✅ Most cost-effective option
- ✅ GLM-5 is excellent at software engineering tasks
- ✅ Kimi handles creative phases well
- ✅ Can use various GLM-5 harnesses (Roo Code, OpenCode, Kilo Code, etc.)
- ✅ Shared resources minimize duplication

**Cons**:
- ❌ Requires Kimi Code CLI + GLM-5 setup
- ❌ Context switching at Phase 4.3
- ❌ GLM-5 may not match Claude's UI/UX design capabilities
- ❌ More complex tool chain

**Entry points**:
- Start: `AGENTS_Reserve.md` (Kimi, Phases 0-4.2)
- Continue: `CLAUDE_Reserve.md` (GLM-5, Phases 4.3-7.1)

---

## Quick Start

### Prerequisites

Before starting, you'll need:
1. **Git** installed
2. **Node.js** (v18+) for frontend templates
3. **Python** (v3.9+) for helper scripts
4. API accounts (see [Getting API Keys](#getting-api-keys))

### Step 1: Choose Your Variation

Decide which variation fits your budget and preferences:

```bash
# Option A: Pure Claude (premium experience)
cp -r buildersuite-claude my-saas-project

# Option B: Claude + Kimi hybrid (balanced)
cp -r buildersuite-hybrid my-saas-project

# Option C: Kimi + GLM-5 (budget-optimized)
cp -r buildersuite-glm my-saas-project
```

### Step 2: Initialize Your Project

```bash
cd my-saas-project

# Initialize git
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Copy environment template
cp .env.example .env

# Edit .env with your API keys (see next section)
nano .env  # or your preferred editor
```

### Step 3: Install Dependencies

```bash
# For template work (when you reach Phase 4.3)
cd templates/analytics-dashboard/frontend  # or your chosen template
npm install

# For Python helper scripts
python -m venv .venv
source .venv/bin/activate
pip install stripe supabase notion-client python-dotenv requests
```

### Step 4: Start the Co-CEO Process

**For buildersuite-claude:**
```bash
# Open CLAUDE.md or CLAUDE_Reserve.md in Claude Code
claude CLAUDE_Reserve.md
```

**For buildersuite-hybrid:**
```bash
# Start with Claude Code for Phases 0-1.5
claude CLAUDE_Reserve.md

# After Phase 1.5, switch to Kimi Code CLI
kimi KIMI_Reserve.md
```

**For buildersuite-glm:**
```bash
# Start with Kimi Code CLI for Phases 0-4.2
kimi AGENTS_Reserve.md

# After Phase 4.2, switch to GLM-5
# (Using your GLM-5 harness of choice)
```

### Step 5: Follow the Process

The Co-CEO will guide you through each phase. Key things to know:

1. **Have your Overall Concept ready**: A document describing your SaaS idea
2. **Be prepared to make decisions**: Some phases require your input (naming, template selection)
3. **Let agents do their work**: The Co-CEO spawns specialized agents; don't interrupt them
4. **Use helper scripts**: Located in `.shared/scripts/co-ceo/` or `.claude/scripts/co-ceo/`

---

## Getting API Keys

The Co-CEO process requires several API keys. Here's how to obtain each:

### Required Services

#### 1. Supabase (Database, Auth, Storage)

**What it's for**: PostgreSQL database, authentication, and file storage for your SaaS

**How to get it**:
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Get credentials from Project Settings → API:
   - `SUPABASE_URL` (Project URL)
   - `SUPABASE_ANON_KEY` (anon/public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role key - keep secret!)
4. Get management token from [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens):
   - `SUPABASE_ACCESS_TOKEN`
5. Get your Organization ID from the URL when viewing your organization

**Cost**: Free tier available (500MB database, 1GB storage)

---

#### 2. Stripe (Payments & Billing)

**What it's for**: Processing payments, subscriptions, and usage-based billing

**How to get it**:
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete verification (required for live keys)
3. Get test keys from Developers → API keys:
   - `STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_test_`)
4. For production, toggle "Test mode" off and get live keys (starts with `pk_live_` / `sk_live_`)

**Cost**: Pay per transaction (2.9% + 30¢ for cards)

---

#### 3. Notion (Documentation & Project Management)

**What it's for**: Optional - syncing project documentation to Notion

**How to get it**:
1. Go to [notion.so](https://notion.so) and sign up
2. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
3. Create a new integration
4. Copy the "Internal Integration Token"
5. Share your database/page with the integration

**Cost**: Free personal plan, paid teams plans available

---

#### 4. Porkbun (Domain Checking)

**What it's for**: Checking domain availability during naming phase

**How to get it**:
1. Go to [porkbun.com](https://porkbun.com) and create an account
2. Go to Account → API Access
3. Enable API access
4. Generate API key and secret

**Cost**: Free API access, pay for domain registration (~$9/year)

**Alternative**: If you don't want to use Porkbun, you can skip this and manually check domains

---

### Optional Services

#### 5. Context7 (Documentation Access)

**What it's for**: Fetching up-to-date library documentation for technical phases

**How to get it**:
1. Go to [context7.com](https://context7.com)
2. Sign up for an account
3. Get API key from your dashboard

**Cost**: Free tier available

---

#### 6. Browserless (Web Scraping)

**What it's for**: Headless browser automation for testing

**How to get it**:
1. Go to [browserless.io](https://browserless.io)
2. Create an account
3. Get API key from dashboard

**Cost**: Free tier available (limited hours)

---

#### 7. Google Ads (Marketing)

**What it's for**: Optional - Google Ads integration for marketing phases

**How to get it**:
1. Have a Google Ads account
2. Apply for Developer Token (requires Google Ads manager account)
3. Approval can take several days

**Cost**: Free to obtain, pay for ads if you use them

---

### Environment File Template

Your `.env` file should look like this:

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

### Which variation should I choose?

**Choose buildersuite-claude if:**
- You want the simplest, most streamlined experience
- You're already using Claude Code
- Budget is not your primary concern
- You want best-in-class creative output

**Choose buildersuite-hybrid if:**
- You want Claude's creative excellence
- You want more cost-effective implementation
- You don't mind switching tools at Phase 1.5
- You want a balanced approach

**Choose buildersuite-glm if:**
- Budget is a primary concern
- You're comfortable with multiple tools
- You want excellent software engineering at lower cost
- You're familiar with GLM-5 and Kimi

### Can I switch variations mid-project?

Not easily. The variations have different agent definitions and entry points. Choose your variation at the start based on your preferred workflow.

### Do I need to know how to code?

Basic understanding helps, but the Co-CEO process is designed to be accessible. The agents do the coding; you provide direction and make decisions.

### How long does the full process take?

- **Total time**: 8-16 hours spread over several sessions
- **Phase 0-1**: 3-5 hours (one session)
- **Phase 2-3**: 2-4 hours (one session)
- **Phase 4**: 3-5 hours (one session)
- **Phase 5-7**: 4-8 hours (one or more sessions)

### Can I customize the templates?

Yes! The templates are starting points. The brand personalization agent customizes them with your brand, and you can further customize during and after the Co-CEO process.

### What if an agent gets stuck?

The Co-CEO process has built-in error handling:
1. Agent attempts fix (Attempt 1)
2. Agent tries alternative approach (Attempt 2)
3. Agent makes final attempt with fresh perspective (Attempt 3)
4. If still stuck, escalates to Co-CEO (you)

### Is this production-ready?

The templates include production considerations like:
- Row Level Security policies
- Stripe webhook handling
- Error boundaries
- Build verification

However, you should still:
- Review all generated code
- Run security audits
- Test thoroughly
- Consider professional security review for sensitive applications

### What AI tools can I use with GLM-5?

GLM-5 works with various harnesses:
- **Roo Code**: VS Code extension
- **OpenCode**: CLI tool
- **Kilo Code**: VS Code extension
- **Kimi Code CLI**: Also works with GLM-5
- **Cline**: VS Code extension

### How much does this cost to run?

**Required services**:
- Supabase: Free tier (500MB, 1GB storage)
- Stripe: Free to set up, pay per transaction
- Notion: Free personal plan
- Porkbun: Free API, ~$9/year per domain

**AI tools** (varies by usage):
- Claude Code: Subscription required
- Kimi Code CLI: Uses your Kimi API credits
- GLM-5: Varies by provider/harness

**Total minimum**: Can be $0-50/month depending on AI tools and usage

---

## License

This project is provided as-is for educational and development purposes. Please review and comply with the terms of service for all third-party services (Supabase, Stripe, etc.) used in your projects.

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

**Ready to build your SaaS MVP? Choose your variation and start with Phase 0!**
