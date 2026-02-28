# Meta-Project Folder for MVPs

A reusable project template for autonomous MVP development with AI agents. This folder contains the processes, skills, and agent structure to rapidly build functional MVPs from concept to implementation.

## What This Is For

This is a **meta-project folder** — a template you duplicate for each new MVP you want to build. It's designed for:

- **Speed**: Pre-built workflows let you go from idea to testable MVP quickly
- **Autonomy**: Agents handle most technical work; you guide strategy and design
- **Quality**: Built-in quality gates, testing, and security review
- **Portability**: Works in Claude Code Web/Mobile (everything is in this folder, not global skills)

**Important**: This is for MVPs — functional enough to test your hypothesis and gather user feedback, not production-scale applications. If your MVP succeeds, you'll evolve the architecture for production.

## Quick Start

1. **Duplicate this folder** and rename it to your project (e.g., `my-saas-idea`)
2. **Create an Overall Concept file** in the root with your initial idea
3. **Set up git**: Create `.gitignore`, initialize repo, push to GitHub
4. **Launch the Co-CEO**: Open `CLAUDE_Backup.md` to start the process

The Co-CEO agent will guide you through the entire lifecycle — from refining your concept to deploying a tested MVP.

## How It Works

The process flows through 7 phases:

1. **Concept & Brand** — Refine your idea, create brand identity, choose name/domain
2. **Design** — UX design and technical architecture planning
3. **Quality Gate #1** — Validate consistency across documents
4. **Sync & Planning** — Copy docs to Notion, create detailed stage plans
5. **Quality Gate #2** — Validate stage architectures align
6. **Implementation** — Agents build, test, and document each stage
7. **Security Review** — Check for vulnerabilities before launch

Throughout the process:
- **You're in the loop** for strategic decisions (concept, naming, frontend design)
- **Agents work autonomously** on technical implementation
- **Quality checks** ensure documents and code don't conflict
- **3-attempt protocol** means agents debug systematically before escalating

→ **See `slimmed-strategic-co-ceo-process.md`** for the complete dependency tree and detailed step-by-step guide.

## Project Structure

```
meta-project-for-mvps/
├── CLAUDE_Backup.md              # Co-CEO agent entry point (start here)
├── slimmed-strategic-co-ceo-process.md  # Slim orchestrator with phase dependencies
├── .claude/
│   ├── skills/                   # All skills needed for MVP development
│   │   ├── master-concept-creation/
│   │   ├── mvp-brand-kit-creation/
│   │   ├── mvp-ux-design/
│   │   ├── mvp-technical-prd-architecture/
│   │   ├── mvp-security-review/
│   │   └── ... (and more)
│   └── scripts/                  # Helper scripts for validation, API checks
└── docs/                         # Created during the process
    ├── concept/
    ├── brand/
    ├── stages/
    └── Project-Technical-Architecture.md
```

## Setup for Claude Code Web/Mobile

This project works with Claude Code Web and Mobile apps. Some skills require API credentials.

### Environment Variables

Set these environment variables in Claude Code Web/Mobile app settings:

| Variable | Purpose | How to Get |
|----------|---------|-----------|
| `NOTION_TOKEN` | Access Notion databases for documentation | [Create integration →](https://www.notion.so/my-integrations) |
| `SUPABASE_ACCESS_TOKEN` | Manage Supabase database and authentication | Get from your Supabase project settings |
| `SUPABASE_ORG_ID` | Identify your Supabase organization | Get from your Supabase project settings |
| `CONTEXT7_API_KEY` | Access library documentation through Context7 | [Get API key →](https://context7.com) |
| `PORKBUN_API_KEY` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |
| `PORKBUN_API_SECRET` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |

**To set environment variables in Claude Code Web/Mobile:**
1. Open Claude Code settings (in the app)
2. Navigate to Environment Variables or Secrets
3. Add each variable name and value
4. Save and restart the app for changes to take effect

**For Desktop CLI users:**
- Add variables to your shell profile (`.bashrc`, `.zshrc`, etc.)
- Example: `export NOTION_TOKEN="your-token-here"`

**For `.env` file (works everywhere):**
- Create a `.env` file in the project root with your credentials
- Example:
  ```
  PORKBUN_API_KEY=pk1_your-actual-key-here
  PORKBUN_API_SECRET=sk1_your-actual-secret-here
  ```
- The `.env` file is automatically in `.gitignore` — it won't be committed to git

### Skills & API Requirements

- **Notion Skills** (create notes, edit notes, manage projects, etc.) → Requires `NOTION_TOKEN`
- **Supabase Skills** (database, auth setup) → Requires `SUPABASE_ACCESS_TOKEN` and `SUPABASE_ORG_ID`
- **Context7 Skills** (fetch documentation) → Requires `CONTEXT7_API_KEY`
- **Domain Name Brainstormer** (check domain availability) → Requires `PORKBUN_API_KEY` and `PORKBUN_API_SECRET` (or falls back to WHOIS)
- **Core Skills** (brainstorming, planning, TDD, debugging, git workflows, etc.) → No credentials needed

**Note:** Supabase skills work best with local CLI but can work in Web/Mobile with proper credentials set.

## Technical Stack Defaults

The process guides toward these technologies for speed and simplicity:

- **Authentication & Database**: Supabase
- **File Storage**: Local filesystem at MVP stage (metadata in Supabase)
- **Backend**:
  - Standard backend for most cases
  - n8n workflows if OAuth is needed (Google Drive, Gmail, etc.)
- **Frontend**: User-collaborative design, autonomous auth/API implementation
- **Testing**: Test-driven development enforced by Agents

These are defaults, not requirements. The Technical Architect agent will recommend the right stack for your specific needs.

## Detailed Documentation

- **`CLAUDE_Backup.md`** — Co-CEO agent entry point with quick reference
- **`slimmed-strategic-co-ceo-process.md`** — Slim orchestrator with complete phase hierarchy, dependency tree, and core principles

Start with `CLAUDE_Backup.md` when you're ready to begin.

---

*This is a meta-project folder. When you duplicate it for your MVP, this README becomes your project's README — update it with your project's specific details.*
