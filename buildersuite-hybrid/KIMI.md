> ⚠️ **META-DEVELOPMENT FILE**: This file is for improving the meta-folder itself.  
> **DELETE this file** when using this folder for MVP production.  
> For production with Kimi Code CLI, use `KIMI_Reserve.md` instead.  
> See "Production Setup Guide" in `slimmed-strategic-co-ceo-process.md` for details.

---

# Kimi Code CLI Guide for Meta-Project

**For agents working with the MVP meta-folder using Kimi Code CLI.**

## Overview

This meta-folder supports a **hybrid architecture**:
- **Phase 1 (1.2-1.5)**: Claude Code only — creative brand/marketing work
- **Phase 0, 1.1, 1.3, 4.2, 4.2.5, 6.9, 7.1**: Conversational — any AI assistant
- **Phase 2+ (2.1 through 6.2)**: Kimi Code CLI compatible — implementation phases

## Quick Start

### 1. Initialize Project
```bash
cd /path/to/your-project
git init
git config user.email "kimi@moonshot.ai"
git config user.name "Kimi Co-CEO"
```

### 2. Load Phase Context
```bash
# Before each phase, load its skill
.shared/scripts/co-ceo/load-phase-context.sh 2.1
```

### 3. Spawn Agents with Kimi Task Tool

Unlike Claude Code's `Task()` with model/color parameters, Kimi uses:

```python
Task(
    description="UX Designer - Create MVP UX documentation",
    subagent_name="coder",
    prompt="""
You are a UX Designer agent. Use the mvp-ux-design skill.

COMPLEXITY: high — This task requires deep reasoning and creative design decisions.

INPUTS:
- docs/concept/master-concept.md
- docs/brand/brand-kit-guide.md

TASK:
Create comprehensive MVP User Experience documentation.

OUTPUTS:
- docs/mvp-ux-[project-name].md

CONSTRAINTS:
- Do NOT spawn additional agents
- On 3 failed attempts, escalate to Co-CEO Session
"""
)
```

## Complexity Indicators

Replace Claude's model selection (`haiku`/`opus`) with complexity indicators:

| Complexity | Description | Example Phases |
|------------|-------------|----------------|
| **low** | Structured, rule-based tasks | Quality checking, validation |
| **medium** | Standard implementation work | Stage planning, API work |
| **high** | Complex reasoning required | UX design, architecture |
| **critical** | Deep analysis mandatory | Security reviews |

**Usage in prompts:**
```
COMPLEXITY: high — This task requires deep reasoning and creative design decisions.
```

## Phase Compatibility Matrix

| Phase | Name | Platform | Complexity |
|-------|------|----------|------------|
| 0.0 | API Prerequisites | Either | — |
| 1.1 | Master Concept | Either | — |
| **1.2** | **Brand Kit** | **Claude only** | — |
| 1.3 | Naming & Domain | Either | — |
| **1.4** | **Marketing Foundation** | **Claude only** | — |
| **1.5** | **Session Break** | **Claude only** | — |
| 2.1 | UX Design | Kimi | High |
| 2.2 | Technical PRD | Kimi | High |
| 3.1 | Quality Gate #1 | Kimi | Low |
| 4.1 | Notion Sync | Kimi | Medium |
| 4.2 | User Approval | Either | — |
| 4.2.5 | Infrastructure | Either | — |
| 4.3 | Template Integration | Kimi | Medium |
| 4.3.5 | Security Audit | Kimi | High |
| 4.4 | Stage Planning | Kimi | Medium |
| 5.1 | Architecture Check | Kimi | Medium |
| 6.2 | Security Review | Kimi | Critical |
| 6.1 | Stage Execution | Kimi | Varies |
| 6.9 | Build Verification | Either | — |
| 7.1 | Completion | Either | — |

## Agent Spawning Patterns

### Single Agent (Phase 2.1, 2.2)
```python
Task(
    description="Agent role - brief task summary",
    subagent_name="coder",
    prompt="""
You are a [Role] agent. Use the [skill-name] skill.

COMPLEXITY: [low|medium|high|critical] — [Why this complexity]

INPUTS:
- Read: [file-path]

TASK:
[Clear task description]

OUTPUTS:
- [output-file-path]

CONSTRAINTS:
- Do NOT spawn additional agents
- On 3 failed attempts, escalate to Co-CEO Session
"""
)
```

### Parallel Agents (Phase 4.4)
```python
# Spawn up to 3 in parallel
Task(
    description="Stage Architect - Stage 1: Auth",
    subagent_name="coder",
    prompt="..."
)
Task(
    description="Stage Architect - Stage 2: API",
    subagent_name="coder", 
    prompt="..."
)
Task(
    description="Stage Architect - Stage 3: Webhooks",
    subagent_name="coder",
    prompt="..."
)
# Wait for all 3 to complete before next batch
```

### Sequential Agents (Phase 6.1)
```python
# One at a time, with verification gates between
for stage in stages:
    # GATE 1: Pre-stage readiness
    run_verify_readiness(stage)
    
    # Spawn agent
    Task(
        description=f"Implementation - Stage {stage}",
        subagent_name="coder",
        prompt="..."
    )
    
    # GATE 2: Post-stage completion
    run_verify_completion(stage)
```

## Key Differences from Claude Code

| Aspect | Claude Code | Kimi Code CLI |
|--------|-------------|---------------|
| **Agent Spawning** | `Task(desc, {model, color})` | `Task(desc, subagent_name, prompt)` |
| **Model Selection** | `model: haiku/opus` | `COMPLEXITY: low/medium/high/critical` |
| **Agent Registry** | `.claude/agents/*.md` | Inline prompts with complexity hints |
| **Subagent Types** | Multiple specialized agents | Single `coder` subagent |
| **Color Coding** | `color: blue/green/red` | Not applicable |

## Skills That Work With Kimi

All skills in `.shared/skills/` work with Kimi Code CLI:
- `mvp-ux-design`
- `mvp-technical-prd-architecture`
- `consistency-quality-check`
- `test-driven-development`
- `systematic-debugging`
- `verification-before-completion`
- `writing-plans`
- All other domain skills

## Helper Scripts

All bash scripts in `.shared/scripts/` work with Kimi:
```bash
.shared/scripts/co-ceo/load-phase-context.sh 2.1
.shared/scripts/co-ceo/git-commit-phase.sh "2.1" "UX Design complete"
.shared/scripts/co-ceo/verify-phase-completion.sh 2.1
```

## Git Workflow

Same git workflow for both platforms:
```bash
# After each phase
.shared/scripts/co-ceo/git-commit-phase.sh "<phase-id>" "<message>"
git push origin main
```

## Error Handling

Same 3-attempt protocol:
```
Attempt 1: Use systematic-debugging skill
Attempt 2: Try alternative approach
Attempt 3: Last attempt with fresh perspective
ESCALATE: Document and return to Co-CEO Session
```

## Best Practices

1. **Always specify complexity** in agent prompts
2. **Use Task tool** for all agent spawning (Phase 2+)
3. **Follow verification gates** between stages (Phase 6.1)
4. **Commit frequently** using helper scripts
5. **Load phase context** before starting each phase

## Troubleshooting

### Agent not following instructions
- Verify complexity indicator is clear
- Check that skill name is correct in prompt
- Ensure all INPUTS are specified

### Subagent spawning issues
- Kimi uses `subagent_name="coder"` (not specialized agent names)
- All agent context must be in the `prompt` parameter
- No YAML frontmatter processing for Kimi

### Model capability concerns
- Use `COMPLEXITY: critical` for security reviews
- Use `COMPLEXITY: high` for architecture/design
- Kimi's model selection is global, not per-task

---

**Remember:** Phase 1 (1.2-1.5) requires Claude Code for optimal results. All other phases work great with Kimi Code CLI!
