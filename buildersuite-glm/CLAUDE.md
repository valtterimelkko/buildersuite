> ⚠️ **META-DEVELOPMENT FILE**: This file is for improving the meta-folder itself.  
> **DELETE this file** when using this folder for MVP production.  
> For production with GLM-5, use `CLAUDE_Reserve.md` instead.  
> See "Production Setup Guide" in `slimmed-strategic-co-ceo-process.md` for details.
>
> **Note:** GLM-5 handles Phases 4.3-7.1 (template integration through completion).

---

# GLM-5 Guide for Meta-Project Development (Phases 4.3-7.1)

**For agents working to improve the MVP meta-folder using GLM-5.**

**Scope:** GLM-5 handles implementation phases (4.3-7.1) after Kimi completes planning phases (0-4.2).

## Overview

This meta-folder supports a **hybrid Kimi/GLM-5 architecture**:
- **Phases 0-4.2**: Kimi Code CLI + Agents (concept through template selection)
- **Phases 4.3-7.1**: GLM-5 (template integration through completion)

| Phase Range | Platform | Model | Purpose |
|-------------|----------|-------|---------|
| **0.0 - 4.2** | **Kimi Code CLI** | **kimi-k2.5** | Concept, brand, design, planning |
| **4.3 - 7.1** | **GLM-5** | **GLM-5** | Integration, implementation, completion |

As a GLM-5 agent working on the meta-folder, you can improve:
- Skills in `.shared/skills/` (used by both platforms)
- Agent definitions in `.glm5/agents/` (GLM-5 specific)
- Helper scripts in `.shared/scripts/` (used by both platforms)
- Documentation and processes

## Your Role

You improve, maintain, and evolve the meta-folder structure by:
1. Understanding the complete process through all linked files
2. Creating and editing skills in `.shared/skills/`
3. Creating and editing agent descriptions in `.glm5/agents/`
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
- Agent descriptions in `.glm5/agents/`
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
- Agent descriptions for autonomous execution (in `.glm5/agents/`)
- Helper scripts for automation

## GLM-5 Specifics

### Agent Spawning with GLM-5 Task Tool

GLM-5 uses the Task tool with explicit model selection:

```python
Task(
    description="Stage Implementation Agent",
    subagent_name="coder",
    prompt="""You are an Implementation agent for Stage X...

MODEL: GLM-5

INPUTS:
- docs/stages/stage-XX-*.md
- docs/Project-Technical-Architecture.md

TASK:
Implement the stage following TDD principles.

OUTPUTS:
- Implemented code
- Updated stage documentation

CONSTRAINTS:
- Do NOT spawn additional agents
- 3-attempt escalation protocol
"""
)
```

Agent definitions are stored in `.glm5/agents/<agent-name>.md`.

### Model Selection

All GLM-5 agents use explicit model specification:

| Model | Use For | Phases |
|-------|---------|--------|
| **GLM-5** | All agent tasks | 4.3 - 7.1 |

**Usage in prompts:**
```
MODEL: GLM-5
```

### Phases Where GLM-5 Excels

| Phase | Name | Why GLM-5 |
|-------|------|-----------|
| **4.3** | Template Integration | Complex multi-step integration |
| **4.3.5** | Security Audit | Deep security analysis |
| **4.4** | Stage Planning | Architecture planning |
| **5.1** | Architecture Check | Quality validation |
| **6.1** | Stage Execution | Implementation |
| **6.2** | Security Review | Pre-deployment security |
| **7.1** | Completion | Final validation |

## File Organization

```
.glm5/                         # GLM-5 specific agent definitions
└── agents/                    # Agent descriptions for Phases 4.3-7.1
    ├── stage-executor.md
    ├── mvp-security-review.md
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

**Location:** `.glm5/agents/<agent-name>.md`

**Structure:**
```markdown
---
name: agent-name
description: Use this agent when... [triggering conditions with examples]
model: GLM-5
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

## Platform Architecture: Kimi vs GLM-5

| Aspect | Kimi (Phases 0-4.2) | GLM-5 (Phases 4.3-7.1) |
|--------|---------------------|------------------------|
| **Agent Spawning** | `Task(desc, subagent_name, prompt)` | `Task(desc, subagent_name, prompt)` |
| **Model Selection** | `MODEL: kimi-k2.5` | `MODEL: GLM-5` |
| **Agent Registry** | `.kimi/agents/*.md` | `.glm5/agents/*.md` |
| **Subagent Types** | Single `coder` subagent | Single `coder` subagent |
| **Best For** | Concept, brand, design, planning | Integration, implementation, completion |

**Note:** Kimi and GLM-5 use the same Task tool format but with different model specifications.

## Common Improvement Tasks

### Adding a New Phase
1. Create phase skill in `.shared/skills/co-ceo-phases/`
2. Update `slimmed-strategic-co-ceo-process.md` with new phase
3. Add any needed agent descriptions (if Claude-specific)
4. Add helper scripts if needed
5. Update both AGENTS.md (for Kimi phases 0-4.2) and CLAUDE.md (for GLM-5 phases 4.3-7.1) if patterns change

### Adding a New Skill
1. Read `writing-skills` skill for guidance
2. Create directory in `.shared/skills/<skill-name>/`
3. Write SKILL.md with proper frontmatter
4. Test with subagents before completing
5. Update any phase skills that should reference it

### Adding a New Agent (GLM-5)
1. Create file in `.glm5/agents/<agent-name>.md`
2. Provide clear input/output requirements
3. Include `model: GLM-5` in YAML frontmatter
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
- [ ] Both AGENTS.md (Kimi phases 0-4.2) and CLAUDE.md (GLM-5 phases 4.3-7.1) are updated if needed

---

*This is the meta-folder for MVP development. Changes here affect all future MVP projects using this system. Be thorough, be careful, be minimal.*
