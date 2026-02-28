> ⚠️ **META-DEVELOPMENT FILE**: This file is for improving the meta-folder itself.  
> **DELETE this file** when using this folder for MVP production.  
> For production with Claude Code, use `CLAUDE_Reserve.md` instead.  
> See "Production Setup Guide" in `slimmed-strategic-co-ceo-process.md` for details.

---

# Claude Code Guide for Meta-Project Development

**For agents working to improve the MVP meta-folder using Claude Code.**

## Overview

This meta-folder supports a **hybrid architecture**:
- **Phase 1 (1.2-1.5)**: Claude Code — creative brand/marketing work (uses Claude's agent system)
- **Phase 0, 1.1, 1.3, 4.2, 4.2.5, 6.9, 7.1**: Conversational — any AI assistant
- **Phase 2+ (2.1 through 7.1)**: Can use Claude Code or Kimi Code CLI — implementation phases

As a Claude Code agent working on the meta-folder, you can improve:
- Skills in `.shared/skills/` (used by both platforms)
- Agent definitions in `.claude/agents/` (Claude Code only)
- Helper scripts in `.shared/scripts/` (used by both platforms)
- Documentation and processes

## Your Role

You improve, maintain, and evolve the meta-folder structure by:
1. Understanding the complete process through all linked files
2. Creating and editing skills in `.shared/skills/`
3. Creating and editing agent descriptions in `.claude/agents/`
4. Improving documentation, scripts, and processes
5. Following the established patterns and conventions

**Core principle:** This meta-folder enables rapid MVP development. Your changes should make the system more reliable, clearer, and easier to use.

## Source of Truth

**`slimmed-strategic-co-ceo-process.md` is the entry point** for understanding this meta-folder. It contains:
- High-level process sequencing and phase dependencies
- When each phase should be invoked
- What each phase should accomplish
- Links to detailed phase skills and agent descriptions

**⚠️ CRITICAL:** Before modifying ANYTHING, you must understand the entire process by following all links from `slimmed-strategic-co-ceo-process.md`. This slim file is a sign-posting document - the actual detailed instructions are distributed across:
- Phase-specific skills in `.shared/skills/co-ceo-phases/`
- Domain skills in `.shared/skills/`
- Agent descriptions in `.claude/agents/`
- Helper scripts in `.shared/scripts/`

## How to Start Improving the Meta-Folder

When the user asks you to improve the meta-folder:

1. **Read `slimmed-strategic-co-ceo-process.md`** to understand the overall flow
2. **Follow all links** to understand the complete system:
   - Read phase skills that are relevant to the improvement area
   - Read related domain skills
   - Read agent descriptions (for Claude-specific phases)
   - Review helper scripts
3. **Identify gaps or improvement opportunities**
4. **Make minimal, focused changes** that preserve existing patterns

## Understanding the Complete System

The MVP development process has 7 phases with multiple sub-phases:

```
Phase 0: Prerequisites (API keys, infrastructure)
Phase 1: Concept & Brand (Master Concept, Brand Kit, Naming, Marketing)
Phase 2: Design (UX Design, Technical PRD)
Phase 3: Quality Gate #1 (Consistency checks)
Phase 4: Sync & Planning (Notion, Template Selection, Integration, Stage Planning)
Phase 5: Quality Gate #2 (Architecture consistency)
Phase 6: Implementation & Security (Stage Execution)
Phase 7: Completion (Final validation)
```

Each phase has:
- A phase skill in `.shared/skills/co-ceo-phases/phase-X-Y-name/SKILL.md`
- Associated domain skills for specific tasks
- Agent descriptions for autonomous execution (Claude phases only)
- Helper scripts for automation

## Claude Code Specifics

### Agent Spawning with Claude Task Tool

Claude Code uses specialized agents with model and color selection:

```typescript
Task("Brand Kit Creator", {
  model: "haiku",  // or "opus"
  color: "blue"    // red, blue, green, yellow, purple, orange
})
```

Agent definitions are stored in `.claude/agents/<agent-name>.md` with YAML frontmatter:
```yaml
---
name: agent-name
description: Use this agent when... [triggering conditions]
model: haiku|opus
color: red|blue|green|yellow|purple|orange
---
```

### Model Selection Guide

| Task Type | Model | Rationale |
|-----------|-------|-----------|
| Simple documentation, patterns | Haiku | Token-efficient |
| Complex architecture, reasoning | Opus | Complex analysis required |
| Quality checking, validation | Haiku | Rule-based, structured |
| Security reviews | Opus | Critical analysis |
| You (Co-CEO Session) | Opus | Orchestration complexity |

**Never use Sonnet** - Opus is more capable and often more token-efficient for complex tasks.

### Phases Where Claude Excels

| Phase | Name | Why Claude |
|-------|------|------------|
| **1.2** | Brand Kit | Creative visual identity work |
| **1.4** | Marketing Foundation | Multi-agent orchestration for positioning, copy, SEO |
| **1.5** | Session Break | Agent-based transition handling |

## File Organization

```
.claude/                       # Claude-specific agent definitions
└── agents/                    # Agent descriptions (YAML frontmatter + instructions)
    ├── brand-kit-creator.md
    ├── mvp-ux-designer.md
    └── ...

.shared/                       # Shared resources for all AI platforms
├── skills/                    # Skills (SKILL.md with frontmatter)
│   ├── co-ceo-phases/         # Phase orchestration skills
│   │   ├── phase-1-1-master-concept/
│   │   ├── phase-1-2-brand-kit/       # Claude excels here
│   │   ├── phase-1-4-marketing-foundation/  # Claude excels here
│   │   └── ...
│   ├── master-concept-creation/
│   ├── mvp-brand-kit-creation/
│   └── ...
└── scripts/                   # Helper scripts
    ├── co-ceo/               # Phase management scripts
    ├── supabase/             # Supabase operations
    ├── stripe/               # Stripe operations
    └── ...
```

## Creating/Editing Skills

**Location:** `.shared/skills/<skill-name>/SKILL.md`

**Use the `writing-skills` skill** for detailed guidance on skill creation.

**Key requirements:**
- YAML frontmatter with `name` and `description` fields only
- Description starts with "Use when..." and describes triggering conditions
- Follow TDD approach: test with subagents before finalizing
- Keep it concise and actionable
- Cross-reference other skills instead of duplicating content

**Structure:**
```markdown
---
name: skill-name
description: Use when [specific triggering conditions]
---

# Skill Name

## Overview
Core principle in 1-2 sentences.

## When to Use
Specific symptoms and situations.

## Core Pattern
Before/after or step-by-step guidance.

## Common Mistakes
What goes wrong + fixes.
```

## Creating/Editing Agent Descriptions

**Location:** `.claude/agents/<agent-name>.md`

**Structure:**
```markdown
---
name: agent-name
description: Use this agent when... [triggering conditions with examples]
model: haiku|opus
color: red|blue|green|yellow|purple|orange
---

You are a [Role] agent specializing in [specialty].

INPUT REQUIREMENTS:
- What the agent needs to read/know before starting

CORE RESPONSIBILITIES:
- What the agent should accomplish

OUTPUT REQUIREMENTS:
- Expected deliverables

OPERATIONAL CONSTRAINTS:
- You MUST NOT spawn additional agents
- 3-attempt retry protocol
- Escalation format

QUALITY ASSURANCE:
- How to verify work

SUCCESS CRITERIA:
- Checklist for completion
```

## Key Differences: Claude Code vs Kimi Code CLI

| Aspect | Claude Code | Kimi Code CLI |
|--------|-------------|---------------|
| **Agent Spawning** | `Task(desc, {model, color})` | `Task(desc, subagent_name, prompt)` |
| **Model Selection** | `model: haiku/opus` | Complexity: `low/medium/high/critical` |
| **Agent Registry** | `.claude/agents/*.md` files | Inline prompts in phase skills |
| **Subagent Types** | Multiple specialized agents | Single `coder` subagent |
| **Color Coding** | `color: blue/green/red` | Not applicable |
| **Best For** | Phase 1.2-1.5 (creative) | Phase 2+ (implementation) |

## Common Improvement Tasks

### Adding a New Phase
1. Create phase skill in `.shared/skills/co-ceo-phases/`
2. Update `slimmed-strategic-co-ceo-process.md` with new phase
3. Add any needed agent descriptions (if Claude-specific)
4. Add helper scripts if needed
5. Update both CLAUDE.md and KIMI.md if patterns change

### Adding a New Skill
1. Read `writing-skills` skill for guidance
2. Create directory in `.shared/skills/<skill-name>/`
3. Write SKILL.md with proper frontmatter
4. Test with subagents before completing
5. Update any phase skills that should reference it

### Adding a New Agent (Claude-only)
1. Create file in `.claude/agents/<agent-name>.md`
2. Follow the YAML frontmatter structure
3. Provide clear input/output requirements
4. Include escalation format
5. Update phase skill that invokes this agent

### Improving Documentation
1. Follow all links to understand context
2. Make minimal, focused edits
3. Verify all internal links still work
4. Test any code examples

## Key Principles for Meta-Folder Improvements

### 1. Minimal Changes
Make the smallest change that achieves the goal. Preserve existing patterns.

### 2. Follow Established Conventions
- Match the style of existing skills and agents
- Use the same YAML frontmatter structure
- Follow the same file naming conventions

### 3. Test Before Deploying
- For skills: Use subagents to verify the skill works
- For scripts: Test execution paths
- For documentation: Verify links work

### 4. Document Dependencies
If you add or change dependencies between files, update all affected files.

### 5. Preserve Backward Compatibility
Don't break existing MVP projects that use this meta-folder.

## Helper Scripts for Meta-Folder Development

Located at `.shared/scripts/`:

| Script Category | Purpose |
|-----------------|---------|
| `co-ceo/` | Phase management, git operations |
| `supabase/` | Database operations, migrations, security audits |
| `stripe/` | Product deployment, webhook validation |
| `templates/` | Template validation, brand token application |
| `consistency-check/` | Document validation, cross-reference checking |
| `marketing/` | Keyword research, trend analysis |

## Escalation Protocol

When you encounter issues you cannot resolve:

1. **Document the issue clearly** - what you were trying to do
2. **Show what you've attempted** - with specific examples
3. **Identify blocking factors** - what's preventing progress
4. **Propose options** - ways forward for user consideration

## Self-Verification Checklist

Before completing any meta-folder improvement:

- [ ] I've read `slimmed-strategic-co-ceo-process.md`
- [ ] I've followed relevant links to understand the complete system
- [ ] My changes follow existing patterns and conventions
- [ ] For skills: I've tested with subagents (if applicable)
- [ ] For scripts: I've verified they execute correctly
- [ ] All internal links still work
- [ ] Changes are minimal and focused
- [ ] Backward compatibility is preserved
- [ ] Both CLAUDE.md and KIMI.md are updated if needed

---

*This is the meta-folder for MVP development. Changes here affect all future MVP projects using this system. Be thorough, be careful, be minimal.*
