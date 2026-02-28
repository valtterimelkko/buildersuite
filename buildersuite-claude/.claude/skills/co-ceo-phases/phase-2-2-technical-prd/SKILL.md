---
name: phase-2-2-technical-prd
description: Co-CEO Phase 2.2 - Launch Technical Architect agent to design technical architecture, database schema, API contracts, and git structure.
---

# Phase 2.2: Technical PRD & Git Structure

**Mode:** Agent  
**Skills to use:** `mvp-technical-prd-architecture`, `mvp-git-structure-design`  
**Model:** Opus  
**Depends on:** Phase 1.1, 1.2, 2.1 complete

## Status Communication

Announce:
> "Launching the Technical Architect agent now. This agent designs the complete technical architecture—database schema, API contracts, implementation stages, and git workflow. Complex work; should take 20-40 minutes."

## Agent Instructions

```
You are a Technical Architect agent. Use mvp-technical-prd-architecture and mvp-git-structure-design skills.

INPUTS:
- Read: docs/concept/master-concept.md
- Read: docs/brand/brand-kit-guide.md
- Read: docs/mvp-ux-[project].md

TASK:
1. Design and write the Technical PRD following the skill's structure
2. Define implementation stages (focus on BUSINESS LOGIC, not infrastructure)
3. Create git branch structure for staged development
4. Add **Security Architecture section**: function classification (internal/public/admin), RLS requirements per table, SECURITY DEFINER usage policy, immutable `search_path = 'public'` requirement for any SECURITY DEFINER functions, RPC exposure constraints, and template hardening checklist

IMPORTANT - TEMPLATE-AWARE STAGE PLANNING:
Phase 4.3 will deploy: Frontend UI, Database schema, Authentication, Stripe products.

Your implementation stages should focus on:
- Backend API endpoint logic
- Stripe webhook handlers
- Project-specific business logic
- Custom integrations beyond template scope

Do NOT plan stages for: auth setup, schema creation, frontend components, Stripe products.

OUTPUTS:
- docs/Project-Technical-Architecture.md
- Git branches created per mvp-git-structure-design skill

CONSTRAINTS:
- Do NOT spawn additional agents
- Do NOT write implementation code
- Each stage should be 2-8 hours of autonomous work
- On 3 failed attempts, escalate to Co-CEO Session
```

## Completion Criteria

- [ ] All 9 PRD sections present
- [ ] Database schema with RLS policies
- [ ] API contracts defined
- [ ] Implementation stages with dependencies
- [ ] Git workflow section for AI agents
- [ ] Security Architecture section covers Supabase hardening (search_path, RLS, SECURITY DEFINER usage, RPC exposure classification)

## After Agent Completes

```bash
.claude/scripts/co-ceo/git-commit-phase.sh "2.2" "Technical PRD and git structure created"
```

## Verify

```bash
.claude/scripts/co-ceo/verify-phase-completion.sh 2.2
```
