# Meta-Project Folder for MVPs (Claude/Kimi Hybrid)

A reusable project template for autonomous MVP development with AI agents. This folder contains the processes, skills, and agent structure to rapidly build functional MVPs from concept to implementation.

> ⚠️ **SANITIZED VERSION**: This is a public release version with all sensitive credentials removed.
> To get started, copy `.env.example` to `.env` and fill in your own API credentials.
> See `SANITIZATION.md` for details on what was sanitized.

**🔄 HYBRID ARCHITECTURE**: This meta-folder now supports both **Claude Code** and **Kimi Code CLI**:
- **Phase 1 (1.2-1.5)**: Claude Code — creative brand and marketing work
- **Phase 0, 1.1, 1.3**: Conversational — works with any AI assistant
- **Phase 2+ (2.1 through 7.1)**: Kimi Code CLI — implementation and technical phases

See `KIMI.md` for Kimi-specific guidance.

## What This Is For

This is a **meta-project folder** — a template you duplicate for each new MVP you want to build. It's designed for:

- **Speed**: Pre-built workflows let you go from idea to testable MVP quickly
- **Autonomy**: Agents handle most technical work; you guide strategy and design
- **Quality**: Built-in quality gates, testing, and security review
- **Portability**: Works in Claude Code, Kimi Code CLI, and Web/Mobile (everything is in this folder, not global skills)

**Important**: This is for MVPs — functional enough to test your hypothesis and gather user feedback, not production-scale applications. If your MVP succeeds, you'll evolve the architecture for production.

## Quick Start

1. **Duplicate this folder** and rename it to your project (e.g., `my-saas-idea`)
2. **Create an Overall Concept file** in the root with your initial idea
3. **Set up git**: Create `.gitignore`, initialize repo, push to GitHub
4. **Choose your AI platform**:
   - **Claude Code**: Start with `CLAUDE.md` or `CLAUDE_Reserve.md`
   - **Kimi Code CLI**: Start with `KIMI.md`

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

**Platform Guide:**
| Phase | Best Platform | Reason |
|-------|---------------|--------|
| 0.0, 1.1, 1.3 | Either | Conversational phases |
| **1.2, 1.4, 1.5** | **Claude Code** | Creative brand/marketing work |
| 2.1 - 7.1 | **Kimi Code CLI** | Implementation phases |

Throughout the process:
- **You're in the loop** for strategic decisions (concept, naming, frontend design)
- **Agents work autonomously** on technical implementation
- **Quality checks** ensure documents and code don't conflict
- **3-attempt protocol** means agents debug systematically before escalating

→ **See `slimmed-strategic-co-ceo-process.md`** for the complete dependency tree and detailed step-by-step guide.
→ **See `KIMI.md`** for Kimi Code CLI specific instructions.

## Project Structure

```
meta-project-claudekimi/
├── CLAUDE.md / CLAUDE_Reserve.md # Co-CEO agent entry point for Claude Code
├── KIMI.md / KIMI_Reserve.md     # Co-CEO agent entry point for Kimi Code CLI
├── slimmed-strategic-co-ceo-process.md  # Slim orchestrator with phase dependencies
├── .shared/                      # Shared resources (both platforms)
│   ├── skills/                   # All skills needed for MVP development
│   │   ├── co-ceo-phases/        # Phase orchestration skills
│   │   ├── master-concept-creation/
│   │   ├── mvp-brand-kit-creation/
│   │   ├── mvp-ux-design/
│   │   ├── mvp-technical-prd-architecture/
│   │   ├── mvp-security-review/
│   │   └── ... (and more)
│   └── scripts/                  # Helper scripts for validation, API checks
├── .claude/                      # Claude-specific resources
│   ├── agents/                   # Agent definitions (Claude Code only)
│   └── skills/                   # Phase 1.4 marketing skills (Claude-only)
├── .kimi/                        # Kimi-specific resources
│   └── skills/                   # Kimi-specific skill wrappers (if needed)
└── docs/                         # Created during the process
    ├── concept/
    ├── brand/
    ├── stages/
    └── Project-Technical-Architecture.md
```

## Setup for AI Platforms

### Claude Code (Phase 1.2-1.5, Optional for others)

Set these environment variables in Claude Code settings:

| Variable | Purpose | How to Get |
|----------|---------|-----------|
| `NOTION_TOKEN` | Access Notion databases for documentation | [Create integration →](https://www.notion.so/my-integrations) |
| `SUPABASE_ACCESS_TOKEN` | Manage Supabase database and authentication | Get from your Supabase project settings |
| `SUPABASE_ORG_ID` | Identify your Supabase organization | Get from your Supabase project settings |
| `CONTEXT7_API_KEY` | Access library documentation through Context7 | [Get API key →](https://context7.com) |
| `PORKBUN_API_KEY` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |
| `PORKBUN_API_SECRET` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |

### Kimi Code CLI (Phase 2+)

Kimi Code CLI uses the same environment variables. Add to your shell profile:
```bash
export NOTION_TOKEN="your-token-here"
export SUPABASE_ACCESS_TOKEN="your-token-here"
export SUPABASE_ORG_ID="your-org-id"
```

Or create a `.env` file in the project root (already in `.gitignore`).

### Skills & API Requirements

- **Notion Skills** → Requires `NOTION_TOKEN`
- **Supabase Skills** → Requires `SUPABASE_ACCESS_TOKEN` and `SUPABASE_ORG_ID`
- **Context7 Skills** → Requires `CONTEXT7_API_KEY`
- **Domain Name Brainstormer** → Requires `PORKBUN_API_KEY` and `PORKBUN_API_SECRET` (or falls back to WHOIS)
- **Core Skills** → No credentials needed

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

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Co-CEO agent entry point for Claude Code |
| `KIMI.md` | Co-CEO agent entry point for Kimi Code CLI |
| `slimmed-strategic-co-ceo-process.md` | Slim orchestrator with complete phase hierarchy |
| `AGENTS.md` | Guide for agents working on the meta-folder itself |

## Platform-Specific Notes

### Claude Code
- Uses `Task(description, {model, color})` for agent spawning
- Supports specialized agent definitions in `.claude/agents/`
- Model selection: `haiku` (fast) or `opus` (complex)

### Kimi Code CLI
- Uses `Task(description, subagent_name, prompt)` for agent spawning
- Uses `subagent_name="coder"` for all agents
- Complexity indicators: `low`, `medium`, `high`, `critical`
- See `KIMI.md` for detailed patterns

---

*This is a meta-project folder. When you duplicate it for your MVP, this README becomes your project's README — update it with your project's specific details.*
