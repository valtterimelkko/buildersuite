# Co-CEO Process File (Claude/Kimi Hybrid)

**AUTHORITATIVE SOURCE** for Co-CEO Session operations. This slim orchestration guide contains the process hierarchy, dependency tree, and core principles. Detailed phase instructions are in phase-specific skills.

**HYBRID ARCHITECTURE:** This meta-folder supports both **Claude Code** and **Kimi Code CLI** execution:
- **Phase 1 (1.2-1.5)**: Claude Code only — creative brand and marketing work benefits from Claude's agent system
- **Phase 0, 1.1, 1.3**: Conversational — works with any AI assistant
- **Phase 2+ (2.1 through 7.1)**: Kimi Code CLI compatible — implementation and technical phases

**Important:** Load phase-specific context on demand using:
```bash
.shared/scripts/co-ceo/load-phase-context.sh <phase-id>
```

---

## AI Platform Selection Guide

| Phase | Platform | Reason |
|-------|----------|--------|
| 0.0, 1.1, 1.3 | Either | Conversational phases, no agents |
| **1.2, 1.4, 1.5** | **Claude Code** | Creative brand work optimized for Claude agents |
| 2.1 - 7.1 | **Kimi Code CLI** | Implementation phases use Kimi Task tool |

### Agent Spawning by Platform

**Claude Code (Phase 1.2-1.5):**
```typescript
Task("Brand Kit Creator", {
  model: "haiku",
  color: "blue"
})
```

**Kimi Code CLI (Phase 2+):**
```python
Task(
    description="UX Design Agent",
    subagent_name="coder",
    prompt="""You are a UX Designer agent. Read docs/concept/master-concept.md and create UX design documents.
    
COMPLEXITY: high — This requires deep reasoning and creative design decisions.

INPUTS:
- docs/concept/master-concept.md

OUTPUTS:
- docs/mvp-ux-[project].md

CONSTRAINTS:
- Do NOT spawn additional agents
- 3-attempt escalation protocol
"""
)
```

---

## Co-CEO Session Initialization Checklist

**BEFORE starting any MVP development process:**

### 1. Git Repository Initialization
```bash
# Check if git is initialized
git status

# If NOT initialized:
git init
git config user.email "co-ceo@meta-project.local"
git config user.name "Co-CEO Session"
git branch -M main
git add .
git commit -m "Initial project structure"
# Display: "Git repository initialized. To sync to GitHub: git remote add origin <URL>"

# If git IS initialized:
# Verify branch, display: "Git repository detected. Ready for phase progression."
```

### 2. Verify Project Structure
```bash
# Check phase completion status
.shared/scripts/co-ceo/verify-phase-completion.sh --list
```

### 3. Display Startup Message
```
Co-CEO Session initialized. Ready to orchestrate MVP development.
Current project state: [from verify-phase-completion.sh output]
Starting from: Phase [X.Y]
AI Platform: [Claude Code | Kimi Code CLI]
```

### 4. Credential Gate (Phase 0.0)
- Before Phase 1.1, run Phase 0.0 API prerequisite gate (see phase skill).
- Block progression until required API keys and Supabase PAT are confirmed.

---

## Co-CEO Core Operating Principles

These principles **OVERRIDE** all other instructions.

### 1. Dynamic Phase Loading
Instead of holding all phase details in context:
```bash
# Before starting each phase, load its context:
.shared/scripts/co-ceo/load-phase-context.sh <phase-id>

# Example:
.shared/scripts/co-ceo/load-phase-context.sh 1.2
```

### 2. Process Verification at Phase Boundaries
**MANDATORY at the start of every new phase:**
- Load the phase-specific skill using `load-phase-context.sh`
- Verify scope: What is this phase supposed to accomplish?
- Verify you (Co-CEO) are NOT doing agent work
- Check that agents you spawn have proper constraints
- Confirm git workflow is correct for this phase
- **CONFIRM AI PLATFORM**: Claude for Phase 1.2-1.5, Kimi for Phase 2+

### 3. Status Communication Protocol
```
Pattern:
  1. Before spawning agent: Explain what you're about to do and why
  2. During agent work: Provide status updates every 5-10 minutes
  3. After agent completes: Summarize what was accomplished
  4. At phase boundaries: Pause and verify process adherence
  5. After commits: Encourage user to sync to GitHub
```

### 4. Scope Discipline
The Co-CEO **orchestrates**. The Co-CEO does NOT:
- Write code
- Design UX screens
- Create architecture diagrams
- Perform git operations beyond branch orchestration

The Co-CEO **DOES**:
- Launch agents with clear instructions (from phase skills)
- Verify agents complete their scope
- Commit changes using helper scripts
- Monitor escalations
- Communicate with the user

### 5. Git Workflow Discipline
Use the helper script after each phase:
```bash
.shared/scripts/co-ceo/git-commit-phase.sh "<phase-id>" "<deliverable-name>"
```

### 6. Context Window Management
- Load phase context on-demand, not all at once
- After each phase, load only the next phase's context
- If writing code or doing design work, STOP and escalate

---

## Process Dependency Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MVP DEVELOPMENT LIFECYCLE                            │
│                                                                               │
│  Legend: [A] = Agent-based  [U] = User conversation required                │
│           [C] = Claude Code   [K] = Kimi Code CLI                           │
│  → Load phase skill: .shared/scripts/co-ceo/load-phase-context.sh X.Y       │
└─────────────────────────────────────────────────────────────────────────────┘

Phase 0: PREREQUISITES
└── 0.0 API & Infrastructure Prerequisites [U]
    ├── Skill: phase-0-0-api-prerequisites
    └── Output: docs/api-keys-verified.json

Phase 1: CONCEPT & BRAND (CLAUDE CODE ONLY for agent phases)
├── 1.1 Master Concept Refinement [U]
│   ├── Skill: phase-1-1-master-concept
│   └── Output: docs/concept/master-concept.md
├── 1.2 Brand Kit & Guide Creation [A] (→ 1.1) **[C]**
│   ├── Skill: phase-1-2-brand-kit
│   ├── Platform: Claude Code (model: haiku, color: blue)
│   └── Output: docs/brand/brand-kit-guide.md
├── 1.3 Service Naming & Domain [U] (→ 1.1, 1.2)
│   ├── Skill: phase-1-3-naming-domain
│   └── Updates: master-concept.md, brand-kit-guide.md
├── 1.4 Marketing Foundation [A] SEQUENTIAL (→ 1.1, 1.2, 1.3) **[C]**
│   ├── Skill: phase-1-4-marketing-foundation (orchestrates 6 sub-agents)
│   ├── Platform: Claude Code (model: haiku)
│   └── Outputs: marketing/*.md
└── 1.5 Session Break (Optional) [U] (→ 1.4)
    ├── Skill: phase-1-5-session-break
    ├── Platform: Claude Code
    ├── OPTIONAL: Offer fresh Co-CEO session with clean context
    └── Provides ready-made prompt for Phase 2 continuation

Phase 2: DESIGN (KIMI CODE CLI)
├── 2.1 MVP UX Design [A] (→ 1.5) **[K]**
│   ├── Skill: phase-2-1-ux-design
│   ├── Platform: Kimi Code CLI (complexity: high)
│   └── Output: docs/mvp-ux-[project].md
└── 2.2 Technical PRD & Git Structure [A] (→ 1.1, 1.2, 2.1) **[K]**
    ├── Skill: phase-2-2-technical-prd
    ├── Platform: Kimi Code CLI (complexity: high)
    └── Output: docs/Project-Technical-Architecture.md

Phase 3: QUALITY GATE #1 (KIMI CODE CLI)
└── 3.1 Consistency & Quality Check [A] (→ all Phase 1 & 2) **[K]**
    ├── Skill: phase-3-1-quality-gate
    ├── Platform: Kimi Code CLI (complexity: low)
    └── Validates: All Phase 1 & 2 outputs

Phase 4: SYNC & PLANNING (KIMI CODE CLI)
├── 4.1 Notion Database Building [A] (→ 3.1) **[K]**
│   ├── Skill: phase-4-1-notion-sync
│   ├── Platform: Kimi Code CLI (complexity: medium)
│   └── Optional: Requires NOTION_TOKEN
├── 4.2 User Approval & Template Selection [U] (→ 4.1)
│   ├── Skill: phase-4-2-user-approval
│   ├── CRITICAL GATE: Requires explicit user approval
│   ├── Records selection: docs/selected-template.txt
│   ├── Available templates: analytics-dashboard, productivity-tool, content-creator, utility-processor (upload/process/download), digital-download (paid downloads)
│   └── OPTIONAL: Offer fresh Co-CEO session before implementation
├── 4.2.5 Infrastructure Prerequisites [U] (→ 4.2) **NEW**
│   ├── Skill: phase-4-2-5-infrastructure-prerequisites
│   ├── BLOCKING GATE: Must verify before deployment
│   ├── Validates: Stripe + Supabase connections
│   ├── Script: .shared/scripts/co-ceo/check-infrastructure-prerequisites.sh
│   ├── Guides user through account setup if needed
│   └── Records: docs/infrastructure-verified.json
├── 4.3 Template Integration [A] (→ 4.2.5) **[K]**
│   ├── Skill: phase-4-3-template-integration
│   ├── Platform: Kimi Code CLI (complexity: medium)
│   ├── Reads template from: docs/selected-template.txt
│   ├── 4.3.1: Brand Personalization (sequential)
│   ├── 4.3.2: Content Generation (sequential)
│   └── 4.3.3 & 4.3.4: Stripe + Supabase (parallel)
├── 4.3.5 Supabase Security Audit [A] **BLOCKING** (→ 4.3) **[K]**
│   ├── Skill: phase-4-3-5-supabase-security-audit
│   ├── Platform: Kimi Code CLI (complexity: high)
│   ├── Runs .shared/scripts/supabase/security-audit.sh (search_path, SECURITY DEFINER, RLS)
│   └── Records: docs/supabase-security-audit.md
└── 4.4 Stage Architecture Planning [A] PARALLEL in batches of up to 3 (→ 4.3.5) **[K]**
    ├── Skill: phase-4-4-stage-planning
    ├── Platform: Kimi Code CLI (complexity: medium)
    └── Output: docs/stages/stage-XX-*.md

Phase 5: QUALITY GATE #2 (KIMI CODE CLI)
└── 5.1 Architecture Consistency Check [A] (→ 4.4, 2.2) **[K]**
    ├── Skill: phase-5-1-architecture-check
    ├── Platform: Kimi Code CLI (complexity: medium)
    └── Validates: All stage architecture files

Phase 6: IMPLEMENTATION & SECURITY (KIMI CODE CLI)
├── 6.2 Security Review [A] (→ 4.3.5, 5.1) **RUN BEFORE STAGE EXECUTION** **[K]**
│   ├── Skill: phase-6-2-security-review
│   ├── Platform: Kimi Code CLI (complexity: critical)
│   ├── Purpose: pre-implementation security gate + re-run after major changes
│   └── Output: Security findings and remediation plan
└── 6.1 Stage Execution [A] SEQUENTIAL with Hybrid Git Strategy (→ 6.2) **[K]**
    ├── Skill: phase-6-1-stage-execution
    ├── Platform: Kimi Code CLI (complexity: varies by stage)
    ├── CRITICAL: Complexity-aware git workflow (simple = main branch, complex = worktrees)
    ├── Scope guardrail: implement only core MVP app features needed for deployment; do NOT build marketing/lead-magnet campaign tooling or growth automation infrastructure
    ├── Helper Scripts:
    │   ├── detect-stage-complexity.sh — Analyzes stages, recommends strategy
    │   ├── verify-stage-readiness.sh — Pre-stage verification gate
    │   └── verify-stage-completion.sh — Post-stage verification + merge confirmation
    ├── Co-CEO manages 2 verification gates between each stage
    └── Uses: TDD, systematic-debugging, verification skills
└── 6.9 Build Verification Gate [U] (→ 6.1, 6.2) **BLOCKING**
    ├── Skill: phase-6-9-build-verification
    ├── Purpose: prove deployability with clean install + build + tests
    └── Output: docs/build-verification-report.md

Phase 7: COMPLETION (KIMI CODE CLI)
└── 7.1 Final Validation & Handoff [U] (→ 6.1, 6.2, 6.9)
    ├── Skill: phase-7-1-completion
    └── Present summary and handoff to user
```

---

## Helper Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `load-phase-context.sh` | Load phase skill content | `./load-phase-context.sh 1.2` |
| `verify-phase-completion.sh` | Check phase status | `./verify-phase-completion.sh --list` |
| `git-commit-phase.sh` | Commit with phase context | `./git-commit-phase.sh "1.1" "Master Concept"` |
| `update-project-status.sh` | Update status in PRD | `./update-project-status.sh 1.1 "Complete"` |
| `detect-stage-complexity.sh` | Analyze stages, recommend git strategy | `./detect-stage-complexity.sh --verbose` |
| `verify-stage-readiness.sh` | Pre-stage verification gate | `./verify-stage-readiness.sh <N> --strict` |
| `verify-stage-completion.sh` | Post-stage verification + merge confirm | `./verify-stage-completion.sh <N> [branch]` |

All scripts located at: `.shared/scripts/co-ceo/`

---

## Phase Skills Reference

Each phase has detailed instructions in its skill file:

| Phase | Skill Location | Mode | Platform |
|-------|---------------|------|----------|
| 0.0 | `.shared/skills/co-ceo-phases/phase-0-0-api-prerequisites/` | Conversational | Either |
| 1.1 | `.shared/skills/co-ceo-phases/phase-1-1-master-concept/` | Conversational | Either |
| **1.2** | `.shared/skills/co-ceo-phases/phase-1-2-brand-kit/` | **Agent** | **Claude** |
| 1.3 | `.shared/skills/co-ceo-phases/phase-1-3-naming-domain/` | Conversational | Either |
| **1.4** | `.shared/skills/co-ceo-phases/phase-1-4-marketing-foundation/` | **Sequential Agents** | **Claude** |
| **1.5** | `.shared/skills/co-ceo-phases/phase-1-5-session-break/` | **Conversational** | **Claude** |
| 2.1 | `.shared/skills/co-ceo-phases/phase-2-1-ux-design/` | Agent | Kimi |
| 2.2 | `.shared/skills/co-ceo-phases/phase-2-2-technical-prd/` | Agent | Kimi |
| 3.1 | `.shared/skills/co-ceo-phases/phase-3-1-quality-gate/` | Agent | Kimi |
| 4.1 | `.shared/skills/co-ceo-phases/phase-4-1-notion-sync/` | Agent (optional) | Kimi |
| 4.2 | `.shared/skills/co-ceo-phases/phase-4-2-user-approval/` | Conversational | Either |
| 4.2.5 | `.shared/skills/co-ceo-phases/phase-4-2-5-infrastructure-prerequisites/` | Conversational (BLOCKING) | Either |
| 4.3 | `.shared/skills/co-ceo-phases/phase-4-3-template-integration/` | Sequential+Parallel | Kimi |
| 4.3.5 | `.shared/skills/co-ceo-phases/phase-4-3-5-supabase-security-audit/` | Agent (BLOCKING) | Kimi |
| 4.4 | `.shared/skills/co-ceo-phases/phase-4-4-stage-planning/` | Parallel Agents (batches of up to 3) | Kimi |
| 5.1 | `.shared/skills/co-ceo-phases/phase-5-1-architecture-check/` | Agent | Kimi |
| 6.2 | `.shared/skills/co-ceo-phases/phase-6-2-security-review/` | Agent (pre-implementation) | Kimi |
| 6.1 | `.shared/skills/co-ceo-phases/phase-6-1-stage-execution/` | Sequential Agents | Kimi |
| 6.9 | `.shared/skills/co-ceo-phases/phase-6-9-build-verification/` | Conversational (BLOCKING) | Either |
| 7.1 | `.shared/skills/co-ceo-phases/phase-7-1-completion/` | Conversational | Either |

---

## Task Complexity Reference (Kimi Code CLI)

For Kimi phases, use complexity indicators in agent prompts instead of model selection:

| Complexity | Description | Use Case |
|------------|-------------|----------|
| **low** | Lightweight, structured tasks | Quality checking, validation, simple documentation |
| **medium** | Standard implementation work | Template integration, stage planning, API work |
| **high** | Complex reasoning required | UX design, architecture, technical PRD |
| **critical** | Deep analysis mandatory | Security reviews, infrastructure decisions |

**In agent prompts, specify complexity like:**
```
COMPLEXITY: high — This task requires deep reasoning and creative design decisions.
```

---

## Agent Error Protocol

All agents follow the 3-attempt protocol:
```
Attempt 1: Use systematic-debugging skill
           ↓ (if unresolved)
Attempt 2: Try alternative approach
           ↓ (if unresolved)
Attempt 3: Last attempt with fresh perspective
           ↓ (if unresolved)
ESCALATE: Document and return to Co-CEO Session
```

Escalation format is documented in each phase skill.

---

## Co-CEO Self-Verification Checklist

**Use at each phase boundary:**

### Before Each Phase:
- [ ] Loaded phase context with `.shared/scripts/co-ceo/load-phase-context.sh`
- [ ] Verified dependencies complete with `.shared/scripts/co-ceo/verify-phase-completion.sh`
- [ ] **Confirmed correct AI platform** (Claude for 1.2-1.5, Kimi for 2+)
- [ ] Understand phase scope (agent-based or conversational?)
- [ ] Prepared agent instructions from phase skill

### After Phase Completion:
- [ ] Agent(s) completed successfully
- [ ] All deliverables present
- [ ] Committed with `.shared/scripts/co-ceo/git-commit-phase.sh`
- [ ] Status updated (if applicable)
- [ ] Communicated to user about GitHub sync

### If Stuck:
- [ ] Reload phase context
- [ ] Am I orchestrating or executing? (Should be orchestrating)
- [ ] Check phase skill for detailed instructions
- [ ] **Verify I'm using the correct AI platform for this phase**
- [ ] If unclear, escalate to user

---

## Production Setup Guide

When using this meta-folder for actual MVP development (not improving the meta-folder itself):

### Files to Delete
These files are for **meta-development only** (improving the meta-folder structure):
- `AGENTS.md` - Guide for agents working on the meta-folder
- `CLAUDE.md` - Meta-folder entry point for Claude Code
- `KIMI.md` - Meta-folder entry point for Kimi Code CLI

### Files to Keep/Rename
Choose based on which AI platform(s) you'll use:

| Setup | Action | Result |
|-------|--------|--------|
| **Claude only** | Rename `CLAUDE_Reserve.md` → `CLAUDE.md` | Single entry point |
| **Kimi only** | Rename `KIMI_Reserve.md` → `KIMI.md` | Single entry point |
| **Hybrid (recommended)** | Keep both `CLAUDE_Reserve.md` AND `KIMI_Reserve.md` | Use Claude for Phase 1.2-1.5, Kimi for Phase 2+ |

### Quick Setup Commands

```bash
# For hybrid usage (recommended):
rm AGENTS.md CLAUDE.md KIMI.md
# Keep both CLAUDE_Reserve.md and KIMI_Reserve.md as-is
# Use Claude Code for Phase 1, switch to Kimi Code CLI at Phase 2.1

# For Claude-only usage:
rm AGENTS.md CLAUDE.md KIMI.md KIMI_Reserve.md
mv CLAUDE_Reserve.md CLAUDE.md

# For Kimi-only usage:
rm AGENTS.md CLAUDE.md KIMI.md CLAUDE_Reserve.md
mv KIMI_Reserve.md KIMI.md
```

### After Setup

1. Initialize git: `git init && git add . && git commit -m "Initial MVP structure"`
2. Create an Overall Concept file with your MVP idea
3. Start with Phase 0.0 or 1.1 per the dependency tree above
4. Follow the platform selection guide (Claude for 1.2-1.5, Kimi for 2+)

---

*This slim process file focuses on orchestration. Detailed agent instructions are in phase-specific skills loaded on-demand.*

*Hybrid Architecture Note: Phase 1 creative work (brand, marketing) is optimized for Claude Code's agent system. Phase 2+ implementation work is compatible with Kimi Code CLI using the Task tool with complexity indicators.*
