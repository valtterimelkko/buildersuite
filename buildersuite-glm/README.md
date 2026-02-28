# Meta-Project Folder for MVPs (Kimi + GLM-5 Hybrid)

A reusable project template for autonomous MVP development with AI agents. This folder contains the processes, skills, and agent structure to rapidly build functional MVPs from concept to implementation.

**🔄 HYBRID ARCHITECTURE**: This meta-folder supports both **Kimi Code CLI** and **GLM-5**:

| Phase Range | Platform | Model | Purpose |
|-------------|----------|-------|---------|
| **0.0 - 4.2** | **Kimi Code CLI** | **kimi-k2.5** | Concept, brand, design, planning |
| **4.3 - 7.1** | **GLM-5** | **GLM-5** | Integration, implementation, completion |

**Entry Points:**
- **Phases 0-4.2**: Start with `AGENTS.md` (or `AGENTS_Reserve.md` for production)
- **Phases 4.3-7.1**: Start with `CLAUDE.md` (or `CLAUDE_Reserve.md` for production)

## What This Is For

This is a **meta-project folder** — a template you duplicate for each new MVP you want to build. It's designed for:

- **Speed**: Pre-built workflows let you go from idea to testable MVP quickly
- **Autonomy**: Agents handle most technical work; you guide strategy and design
- **Quality**: Built-in quality gates, testing, and security review
- **Portability**: Works in GLM-5, Kimi Code CLI, and Web/Mobile (everything is in this folder, not global skills)

**Important**: This is for MVPs — functional enough to test your hypothesis and gather user feedback, not production-scale applications. If your MVP succeeds, you'll evolve the architecture for production.

## Quick Start

1. **Duplicate this folder** and rename it to your project (e.g., `my-saas-idea`)
2. **Create an Overall Concept file** in the root with your initial idea
3. **Set up git**: Create `.gitignore`, initialize repo, push to GitHub
4. **Choose your AI platform**:
   - **Phases 0-4.2**: Start with `AGENTS.md` or `AGENTS_Reserve.md` (Kimi)
   - **Phases 4.3-7.1**: Start with `CLAUDE.md` or `CLAUDE_Reserve.md` (GLM-5)

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
| Phase Range | Platform | Model | Purpose |
|-------------|----------|-------|---------|
| **0.0 - 4.2** | **Kimi Code CLI** | **kimi-k2.5** | Concept through template selection |
| **4.3 - 7.1** | **GLM-5** | **GLM-5** | Integration through completion |

Throughout the process:
- **You're in the loop** for strategic decisions (concept, naming, frontend design)
- **Agents work autonomously** on technical implementation
- **Quality checks** ensure documents and code don't conflict
- **3-attempt protocol** means agents debug systematically before escalating

→ **See `slimmed-strategic-co-ceo-process.md`** for the complete dependency tree and detailed step-by-step guide.
→ **See `AGENTS.md`** for Kimi Code CLI specific instructions.
→ **See `CLAUDE.md`** for GLM-5 specific instructions.

## Project Structure

```
buildersuite-glm/
├── AGENTS.md / AGENTS_Reserve.md # Co-CEO agent entry point for Kimi (Phases 0-4.2)
├── CLAUDE.md / CLAUDE_Reserve.md # Co-CEO agent entry point for GLM-5 (Phases 4.3-7.1)
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
├── .kimi/                        # Kimi-specific agents (Phases 0-4.2)
│   └── agents/                   # Agent definitions with MODEL: kimi-k2.5
├── .glm5/                        # GLM-5 specific agents (Phases 4.3-7.1)
│   ├── agents/                   # Agent definitions with MODEL: GLM-5
│   └── skills/                   # Phase 1.4 marketing skills (Kimi)
└── docs/                         # Created during the process
    ├── concept/
    ├── brand/
    ├── stages/
    └── Project-Technical-Architecture.md
```

## Setup for AI Platforms

### Environment Variables (Both Platforms)

Set these environment variables in your shell or .env file:

| Variable | Purpose | How to Get |
|----------|---------|-----------|
| `NOTION_TOKEN` | Access Notion databases for documentation | [Create integration →](https://www.notion.so/my-integrations) |
| `SUPABASE_ACCESS_TOKEN` | Manage Supabase database and authentication | Get from your Supabase project settings |
| `SUPABASE_ORG_ID` | Identify your Supabase organization | Get from your Supabase project settings |
| `CONTEXT7_API_KEY` | Access library documentation through Context7 | [Get API key →](https://context7.com) |
| `PORKBUN_API_KEY` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |
| `PORKBUN_API_SECRET` | Domain availability checking via Porkbun API | [Create at porkbun.com →](https://porkbun.com/account/api) |

### Kimi Code CLI (Phases 0-4.2) and GLM-5 (Phases 4.3-7.1)

Both platforms use the same environment variables. Add to your shell profile:
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
| `AGENTS.md` | Co-CEO agent entry point for Kimi (Phases 0-4.2) - meta-folder dev |
| `AGENTS_Reserve.md` | Co-CEO agent entry point for Kimi (Phases 0-4.2) - production |
| `CLAUDE.md` | Co-CEO agent entry point for GLM-5 (Phases 4.3-7.1) - meta-folder dev |
| `CLAUDE_Reserve.md` | Co-CEO agent entry point for GLM-5 (Phases 4.3-7.1) - production |
| `slimmed-strategic-co-ceo-process.md` | Slim orchestrator with complete phase hierarchy |
| `AGENTS_meta.md` | Guide for agents working on the meta-folder itself |

## Platform-Specific Notes

### Kimi Code CLI (Phases 0-4.2)
- Uses `Task(description, subagent_name, prompt)` for agent spawning
- Uses `MODEL: kimi-k2.5` in agent prompts
- Agent definitions in `.kimi/agents/`
- See `AGENTS.md` for detailed patterns

### GLM-5 (Phases 4.3-7.1)
- Uses `Task(description, subagent_name, prompt)` for agent spawning
- Uses `MODEL: GLM-5` in agent prompts
- Agent definitions in `.glm5/agents/`
- See `CLAUDE.md` for detailed patterns

**Note:** Both platforms use the same Task tool format with explicit model selection.

---

*This is a meta-project folder. When you duplicate it for your MVP, this README becomes your project's README — update it with your project's specific details.*
