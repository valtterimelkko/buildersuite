# Co-CEO Process File

**AUTHORITATIVE SOURCE** for Co-CEO Session operations. This slim orchestration guide contains the process hierarchy, dependency tree, and core principles. Detailed phase instructions are in phase-specific skills.

**Important:** Load phase-specific context on demand using:
```bash
.claude/scripts/co-ceo/load-phase-context.sh <phase-id>
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
git config user.email "your-email@example.com"
git config user.name "Claude Co-CEO"
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
.claude/scripts/co-ceo/verify-phase-completion.sh --list
```

### 3. Display Startup Message
```
Co-CEO Session initialized. Ready to orchestrate MVP development.
Current project state: [from verify-phase-completion.sh output]
Starting from: Phase [X.Y]
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
.claude/scripts/co-ceo/load-phase-context.sh <phase-id>

# Example:
.claude/scripts/co-ceo/load-phase-context.sh 1.2
```

### 2. Process Verification at Phase Boundaries
**MANDATORY at the start of every new phase:**
- Load the phase-specific skill using `load-phase-context.sh`
- Verify scope: What is this phase supposed to accomplish?
- Verify you (Co-CEO) are NOT doing agent work
- Check that agents you spawn have proper constraints
- Confirm git workflow is correct for this phase

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
.claude/scripts/co-ceo/git-commit-phase.sh "<phase-id>" "<deliverable-name>"
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
│  → Load phase skill: .claude/scripts/co-ceo/load-phase-context.sh X.Y       │
└─────────────────────────────────────────────────────────────────────────────┘

Phase 0: PREREQUISITES
└── 0.0 API & Infrastructure Prerequisites [U]
    ├── Skill: phase-0-0-api-prerequisites
    └── Output: docs/api-keys-verified.json

Phase 1: CONCEPT & BRAND
├── 1.1 Master Concept Refinement [U]
│   ├── Skill: phase-1-1-master-concept
│   └── Output: docs/concept/master-concept.md
├── 1.2 Brand Kit & Guide Creation [A] (→ 1.1)
│   ├── Skill: phase-1-2-brand-kit
│   └── Output: docs/brand/brand-kit-guide.md
├── 1.3 Service Naming & Domain [U] (→ 1.1, 1.2)
│   ├── Skill: phase-1-3-naming-domain
│   └── Updates: master-concept.md, brand-kit-guide.md
├── 1.4 Marketing Foundation [A] SEQUENTIAL (→ 1.1, 1.2, 1.3)
│   ├── Skill: phase-1-4-marketing-foundation (orchestrates 6 sub-agents)
│   └── Outputs: marketing/*.md
└── 1.5 Session Break (Optional) [U] (→ 1.4)
    ├── Skill: phase-1-5-session-break
    ├── OPTIONAL: Offer fresh Co-CEO session with clean context
    └── Provides ready-made prompt for Phase 2 continuation

Phase 2: DESIGN
├── 2.1 MVP UX Design [A] (→ 1.5)
│   ├── Skill: phase-2-1-ux-design
│   └── Output: docs/mvp-ux-[project].md
└── 2.2 Technical PRD & Git Structure [A] (→ 1.1, 1.2, 2.1)
    ├── Skill: phase-2-2-technical-prd
    └── Output: docs/Project-Technical-Architecture.md

Phase 3: QUALITY GATE #1
└── 3.1 Consistency & Quality Check [A] (→ all Phase 1 & 2)
    ├── Skill: phase-3-1-quality-gate
    └── Validates: All Phase 1 & 2 outputs

Phase 4: SYNC & PLANNING
├── 4.1 Notion Database Building [A] (→ 3.1)
│   ├── Skill: phase-4-1-notion-sync
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
│   ├── Script: .claude/scripts/co-ceo/check-infrastructure-prerequisites.sh
│   ├── Guides user through account setup if needed
│   └── Records: docs/infrastructure-verified.json
├── 4.3 Template Integration [A] (→ 4.2.5)
│   ├── Skill: phase-4-3-template-integration
│   ├── Reads template from: docs/selected-template.txt
│   ├── 4.3.1: Brand Personalization (sequential)
│   ├── 4.3.2: Content Generation (sequential)
│   └── 4.3.3 & 4.3.4: Stripe + Supabase (parallel)
├── 4.3.5 Supabase Security Audit [A] **BLOCKING** (→ 4.3)
│   ├── Skill: phase-4-3-5-supabase-security-audit
│   ├── Runs .claude/scripts/supabase/security-audit.sh (search_path, SECURITY DEFINER, RLS)
│   └── Records: docs/supabase-security-audit.md
└── 4.4 Stage Architecture Planning [A] PARALLEL in batches of up to 3 (→ 4.3.5)
    ├── Skill: phase-4-4-stage-planning
    └── Output: docs/stages/stage-XX-*.md

Phase 5: QUALITY GATE #2
└── 5.1 Architecture Consistency Check [A] (→ 4.4, 2.2)
    ├── Skill: phase-5-1-architecture-check
    └── Validates: All stage architecture files

Phase 6: IMPLEMENTATION & SECURITY
├── 6.2 Security Review [A] Opus (→ 4.3.5, 5.1) **RUN BEFORE STAGE EXECUTION**
│   ├── Skill: phase-6-2-security-review
│   ├── Purpose: pre-implementation security gate + re-run after major changes
│   └── Output: Security findings and remediation plan
└── 6.1 Stage Execution [A] SEQUENTIAL with Hybrid Git Strategy (→ 6.2)
    ├── Skill: phase-6-1-stage-execution
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

Phase 7: COMPLETION
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

All scripts located at: `.claude/scripts/co-ceo/`

---

## Phase Skills Reference

Each phase has detailed instructions in its skill file:

| Phase | Skill Location | Mode |
|-------|---------------|------|
| 0.0 | `.claude/skills/co-ceo-phases/phase-0-0-api-prerequisites/` | Conversational |
| 1.1 | `.claude/skills/co-ceo-phases/phase-1-1-master-concept/` | Conversational |
| 1.2 | `.claude/skills/co-ceo-phases/phase-1-2-brand-kit/` | Agent |
| 1.3 | `.claude/skills/co-ceo-phases/phase-1-3-naming-domain/` | Conversational |
| 1.4 | `.claude/skills/co-ceo-phases/phase-1-4-marketing-foundation/` | Sequential Agents |
| 1.5 | `.claude/skills/co-ceo-phases/phase-1-5-session-break/` | Conversational (optional) |
| 2.1 | `.claude/skills/co-ceo-phases/phase-2-1-ux-design/` | Agent |
| 2.2 | `.claude/skills/co-ceo-phases/phase-2-2-technical-prd/` | Agent |
| 3.1 | `.claude/skills/co-ceo-phases/phase-3-1-quality-gate/` | Agent |
| 4.1 | `.claude/skills/co-ceo-phases/phase-4-1-notion-sync/` | Agent (optional) |
| 4.2 | `.claude/skills/co-ceo-phases/phase-4-2-user-approval/` | Conversational |
| 4.2.5 | `.claude/skills/co-ceo-phases/phase-4-2-5-infrastructure-prerequisites/` | Conversational (BLOCKING) |
| 4.3 | `.claude/skills/co-ceo-phases/phase-4-3-template-integration/` | Sequential+Parallel |
| 4.3.5 | `.claude/skills/co-ceo-phases/phase-4-3-5-supabase-security-audit/` | Agent (BLOCKING) |
| 4.4 | `.claude/skills/co-ceo-phases/phase-4-4-stage-planning/` | Parallel Agents (batches of up to 3) |
| 5.1 | `.claude/skills/co-ceo-phases/phase-5-1-architecture-check/` | Agent |
| 6.2 | `.claude/skills/co-ceo-phases/phase-6-2-security-review/` | Agent (Opus, pre-implementation) |
| 6.1 | `.claude/skills/co-ceo-phases/phase-6-1-stage-execution/` | Sequential Agents |
| 6.9 | `.claude/skills/co-ceo-phases/phase-6-9-build-verification/` | Conversational (BLOCKING) |
| 7.1 | `.claude/skills/co-ceo-phases/phase-7-1-completion/` | Conversational |

---

## Model Selection Reference

| Agent Role | Model | Rationale |
|------------|-------|-----------|
| Co-CEO Session (you) | Opus | Orchestration complexity |
| Brand Kit, UX, Marketing | Haiku | Pattern-based, structured |
| Technical Architect | Opus | Complex system design |
| Quality Checker | Haiku | Rule-based validation |
| Implementation | Haiku | Coding, TDD |
| Security Review | Opus | Complex analysis |

**Never use Sonnet** — if complex, use Opus.

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
- [ ] Loaded phase context with `load-phase-context.sh`
- [ ] Verified dependencies complete with `verify-phase-completion.sh`
- [ ] Understand phase scope (agent-based or conversational?)
- [ ] Prepared agent instructions from phase skill

### After Phase Completion:
- [ ] Agent(s) completed successfully
- [ ] All deliverables present
- [ ] Committed with `git-commit-phase.sh`
- [ ] Status updated (if applicable)
- [ ] Communicated to user about GitHub sync

### If Stuck:
- [ ] Reload phase context
- [ ] Am I orchestrating or executing? (Should be orchestrating)
- [ ] Check phase skill for detailed instructions
- [ ] If unclear, escalate to user

---

*This slim process file focuses on orchestration. Detailed agent instructions are in phase-specific skills loaded on-demand.*
