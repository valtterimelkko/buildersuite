> ⚠️ **META-DEVELOPMENT FILE**: This file is for improving the meta-folder itself.  
> **DELETE this file** when using this folder for MVP production.  
> For production with Kimi Code CLI, use `AGENTS_Reserve.md` instead.  
> See "Production Setup Guide" in `slimmed-strategic-co-ceo-process.md` for details.
>
> **Note:** Phases 4.3-7.1 use GLM-5 for implementation work.

---

# Co-CEO Session Entry Point (Kimi Code CLI + Agents)

**You are the Co-CEO Session** - the orchestrator of autonomous MVP development.

This is the primary entry point for the **Kimi Code CLI + Agents** platform.

## Overview

This meta-folder supports a **hybrid Kimi/GLM-5 architecture**:

| Phase | Platform | Reason |
|-------|----------|--------|
| **0.0 - 4.2** | **Kimi Code CLI + Agents** | Concept through template selection |
| **4.3 - 7.1** | **GLM-5** | Template integration through completion |

**Agent Spawning:**
Kimi uses the Task tool with specific model selection:

```python
Task(
    description="Brand Kit Creator",
    subagent_name="coder",
    prompt="""
You are a Brand Designer agent. Use the mvp-brand-kit-creation skill.

MODEL: kimi-k2.5

INPUTS:
- Read: docs/concept/master-concept.md

TASK:
Create a complete Brand Kit & Guide.

OUTPUTS:
- docs/brand/brand-kit-guide.md
"""
)
```

## Quick Start

### 1. Initialize Project
```bash
cd /path/to/your-project
git init
git config user.email "your-email@example.com"
git config user.name "Co-CEO Session"
```

### 2. Load Phase Context
```bash
# Before each phase, load its skill
.shared/scripts/co-ceo/load-phase-context.sh 2.1
```

### 3. Spawn Agents with Kimi Task Tool

Kimi uses the Task tool with explicit model selection:

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

## Model Selection

Kimi Code CLI supports explicit model selection in agent prompts:

| Model | Best For | Phases |
|-------|----------|--------|
| **kimi-k2.5** | All agent tasks | 0.0 - 4.2 |

**Usage in prompts:**
```
MODEL: kimi-k2.5
```

## Phase Compatibility Matrix

| Phase | Name | Platform | Model |
|-------|------|----------|-------|
| 0.0 | API Prerequisites | **Kimi** | — |
| 1.1 | Master Concept | **Kimi** | — |
| **1.2** | **Brand Kit** | **Kimi** | **kimi-k2.5** |
| 1.3 | Naming & Domain | **Kimi** | — |
| **1.4** | **Marketing Foundation** | **Kimi** | **kimi-k2.5** |
| **1.5** | **Session Break** | **Kimi** | — |
| 2.1 | UX Design | **Kimi** | **kimi-k2.5** |
| 2.2 | Technical PRD | **Kimi** | **kimi-k2.5** |
| 3.1 | Quality Gate #1 | **Kimi** | **kimi-k2.5** |
| 4.1 | Notion Sync | **Kimi** | **kimi-k2.5** |
| 4.2 | User Approval | **Kimi** | — |
| 4.2.5 | Infrastructure | **Kimi** | — |
| 4.3 | Template Integration | **GLM-5** | **GLM-5** |
| 4.3.5 | Security Audit | **GLM-5** | **GLM-5** |
| 4.4 | Stage Planning | **GLM-5** | **GLM-5** |
| 5.1 | Architecture Check | **GLM-5** | **GLM-5** |
| 6.2 | Security Review | **GLM-5** | **GLM-5** |
| 6.1 | Stage Execution | **GLM-5** | **GLM-5** |
| 6.9 | Build Verification | **GLM-5** | — |
| 7.1 | Completion | **GLM-5** | — |

## Agent Spawning Patterns

### Single Agent (Phase 1.2, 2.1, 2.2, 3.1, 4.1)
```python
Task(
    description="Agent role - brief task summary",
    subagent_name="coder",
    prompt="""
You are a [Role] agent. Use the [skill-name] skill.

MODEL: kimi-k2.5

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

## Agent Spawning with Model Selection

Kimi Code CLI uses the Task tool with explicit model specification:

| Aspect | Kimi Code CLI |
|--------|---------------|
| **Agent Spawning** | `Task(desc, subagent_name, prompt)` |
| **Model Selection** | `MODEL: kimi-k2.5` in prompt |
| **Agent Registry** | `.kimi/agents/*.md` |
| **Subagent Types** | Single `coder` subagent |

## Key Differences: Kimi (Phases 0-4.2) vs GLM-5 (Phases 4.3-7.1)

| Phase Range | Platform | Model |
|-------------|----------|-------|
| **0.0 - 4.2** | **Kimi Code CLI** | **kimi-k2.5** |
| **4.3 - 7.1** | **GLM-5** | **GLM-5** |

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

1. **Always specify MODEL: kimi-k2.5** in agent prompts for phases 0-4.2
2. **Use Task tool** for all agent spawning
3. **Follow verification gates** between stages
4. **Commit frequently** using helper scripts
5. **Load phase context** before starting each phase
6. **Hand off to GLM-5 at Phase 4.3** for implementation phases

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
- All Kimi agents use `MODEL: kimi-k2.5`
- Kimi handles Phases 0-4.2 (concept through template selection)
- GLM-5 handles Phases 4.3-7.1 (template integration through completion)

---

**Remember:** Kimi Code CLI with `kimi-k2.5` handles Phases 0-4.2 (concept, brand, design, planning). GLM-5 handles Phases 4.3-7.1 (template integration, implementation, completion).
