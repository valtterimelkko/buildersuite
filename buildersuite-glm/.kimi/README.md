# Kimi Code CLI Resources

This folder contains Kimi-specific resources for the Co-CEO hybrid architecture.

## Overview

In the hybrid architecture:
- **Phase 1.2-1.5**: Claude Code handles creative brand/marketing work
- **Phase 2+**: Kimi Code CLI handles implementation phases

Kimi uses the **Task tool** with `subagent_name="coder"` instead of Claude's agent registry.

## Folder Structure

```
.kimi/
├── skills/           # Kimi-specific skill wrappers (if needed)
└── README.md         # This file
```

## Key Differences from Claude

| Aspect | Claude Code | Kimi Code CLI |
|--------|-------------|---------------|
| Agent Spawning | `Task(desc, {model, color})` | `Task(desc, subagent_name, prompt)` |
| Agent Registry | `.claude/agents/*.md` | Inline prompts in phase skills |
| Model Selection | `haiku` / `opus` | Complexity: `low/medium/high/critical` |
| Skills Location | `.shared/skills/` | `.shared/skills/` (shared) |
| Scripts Location | `.shared/scripts/` | `.shared/scripts/` (shared) |

## Using Skills with Kimi

Skills are loaded from `.shared/skills/` (shared with Claude). In agent prompts:

```python
Task(
    description="UX Designer",
    subagent_name="coder",
    prompt="""
You are a UX Designer agent. Use the mvp-ux-design skill.

COMPLEXITY: high — This task requires deep reasoning...

INPUTS:
- Read: docs/concept/master-concept.md

TASK:
Create comprehensive MVP User Experience documentation.

OUTPUTS:
- docs/mvp-ux-[project].md
"""
)
```

## Phase Skills for Kimi

Kimi-compatible phase skills are in `.shared/skills/co-ceo-phases/`:

| Phase | Skill | Complexity |
|-------|-------|------------|
| 2.1 | `phase-2-1-ux-design` | High |
| 2.2 | `phase-2-2-technical-prd` | High |
| 3.1 | `phase-3-1-quality-gate` | Low |
| 4.1 | `phase-4-1-notion-sync` | Medium |
| 4.3 | `phase-4-3-template-integration` | Medium |
| 4.3.5 | `phase-4-3-5-supabase-security-audit` | High |
| 4.4 | `phase-4-4-stage-planning` | Medium |
| 5.1 | `phase-5-1-architecture-check` | Medium |
| 6.2 | `phase-6-2-security-review` | Critical |
| 6.1 | `phase-6-1-stage-execution` | Varies |
| 6.9 | `phase-6-9-build-verification` | — |
| 7.1 | `phase-7-1-completion` | — |

## Helper Scripts

All scripts in `.shared/scripts/` work with Kimi:

```bash
# Load phase context
.shared/scripts/co-ceo/load-phase-context.sh 2.1

# Verify phase completion
.shared/scripts/co-ceo/verify-phase-completion.sh 2.1

# Git commit with phase context
.shared/scripts/co-ceo/git-commit-phase.sh "2.1" "UX Design complete"
```

## Entry Point

For Kimi Code CLI Co-CEO sessions, see `KIMI_Reserve.md` (production) or `KIMI.md` (meta-development).
