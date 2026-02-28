> ⚠️ **META-DEVELOPMENT FILE**: This file is for improving the meta-folder itself.  
> **DELETE this file** when using this folder for MVP production.  
> For production, use `CLAUDE_Reserve.md` or `KIMI_Reserve.md` instead.  
> See "Production Setup Guide" in `slimmed-strategic-co-ceo-process.md` for details.

---

# Agent Guide for Meta-Folder Development

**For agents working on the MVP meta-folder itself.**

## Your Purpose

You are an autonomous agent improving the MVP development meta-folder. This folder contains the complete system for AI-driven MVP development including skills, agent descriptions, scripts, and processes.

## Critical First Step

**ALWAYS start by reading `slimmed-strategic-co-ceo-process.md`**. This is the entry point that sign-posts to all other process files.

**Then follow ALL links** to understand the complete system before making any changes.

## Understanding the Architecture

### The Process Hierarchy

```
slimmed-strategic-co-ceo-process.md (entry point)
    ↓
Phase Skills (.shared/skills/co-ceo-phases/)
    ↓
Domain Skills (.shared/skills/)
    ↓
Agent Descriptions (.claude/agents/)
    ↓
Helper Scripts (.shared/scripts/)
```

**Key insight:** The slim process file is NOT self-contained. It links to detailed phase skills, which reference domain skills, which invoke agents. To understand any part, you must trace through all connected files.

### File Types You May Create/Edit

#### 1. Skills (`.shared/skills/<name>/SKILL.md`)

**Structure:**
```yaml
---
name: skill-name
description: Use when [specific triggering conditions]
---

# Title

## Overview
What this is, core principle.

## When to Use
Symptoms and situations.

## Core Pattern
How to do it.

## Common Mistakes
What goes wrong.
```

**Frontmatter rules:**
- Only `name` and `description` fields
- Name: letters, numbers, hyphens only
- Description: max 1024 chars, starts with "Use when..."
- Never describe the workflow in description (only triggers)

**Use the `writing-skills` skill** in `.shared/skills/writing-skills/` before creating any skill.

#### 2. Agent Descriptions (`.claude/agents/<name>.md`)

**Structure:**
```yaml
---
name: agent-name
description: Use this agent when... [with examples]
model: haiku|opus
color: red|blue|green|yellow|purple|orange
---

You are a [Role] agent...

INPUT REQUIREMENTS:
- What to read first

CORE RESPONSIBILITIES:
- What to accomplish

OUTPUT REQUIREMENTS:
- Deliverables

OPERATIONAL CONSTRAINTS:
- You MUST NOT spawn additional agents
- 3-attempt protocol

QUALITY ASSURANCE:
- Verification steps

SUCCESS CRITERIA:
- Completion checklist
```

#### 3. Helper Scripts (`.shared/scripts/<category>/<name>.sh`)

- Make executable: `chmod +x script.sh`
- Include error handling
- Document usage in comments
- Test before committing

#### 4. Documentation (various `.md` files)

- Keep links working
- Follow existing formatting
- Update when processes change

## Work Patterns

### When Adding a New Phase

1. Read `slimmed-strategic-co-ceo-process.md` - understand the flow
2. Read adjacent phase skills - understand the pattern
3. Create phase skill in `.shared/skills/co-ceo-phases/phase-X-Y-name/`
4. Update `slimmed-strategic-co-ceo-process.md`:
   - Add to dependency tree
   - Add to phase skills reference table
5. Create agent description if needed
6. Add helper scripts if needed

### When Adding a New Skill

1. **Read `writing-skills` skill first**
2. Choose location:
   - Phase skills → `.shared/skills/co-ceo-phases/`
   - Domain skills → `.shared/skills/`
3. Create directory and SKILL.md
4. Write frontmatter (name, description only)
5. Write content following the pattern
6. **Test with subagents** before completing
7. Update any referencing files

### When Adding a New Agent

1. Read related phase skill - understand when agent is invoked
2. Read similar agent descriptions - follow the pattern
3. Create file in `.claude/agents/<name>.md`
4. Write YAML frontmatter
5. Write detailed instructions
6. Update phase skill to reference this agent

### When Improving Existing Files

1. Read the file you plan to improve
2. Read all files it references
3. Read all files that reference it
4. Make minimal, focused changes
5. Verify no links are broken
6. Test if applicable

## Key Conventions

### Skill Naming
- Use hyphens: `writing-skills`, not `writing_skills`
- Verb-first: `creating-brands`, not `brand-creation`
- Be specific: `mvp-security-review`, not `security`

### Agent Naming
- Descriptive: `brand-kit-creator`, not `brand-agent`
- Action-oriented: `stage-executor`, not `stage-runner`

### Script Naming
- Use hyphens: `verify-phase.sh`
- Be descriptive: `check-infrastructure-prerequisites.sh`

### Documentation Conventions
- Use markdown tables for reference material
- Use flowcharts (Graphviz) only for non-obvious decisions
- Cross-reference with skill names, not file paths
- Keep it concise

## Quality Standards

### For Skills
- [ ] Tested with subagents (RED-GREEN-REFACTOR)
- [ ] Frontmatter follows rules
- [ ] Description is triggers-only
- [ ] Cross-references other skills appropriately
- [ ] No file paths with `@` syntax (force-loads)

### For Agents
- [ ] YAML frontmatter valid
- [ ] Input requirements clear
- [ ] Output requirements specific
- [ ] Constraints explicit (especially "no spawning agents")
- [ ] Escalation format documented

### For Scripts
- [ ] Executable permissions set
- [ ] Error handling included
- [ ] Usage documented
- [ ] Tested in realistic scenarios

### For Documentation
- [ ] All internal links work
- [ ] Follows existing format
- [ ] Minimal and focused
- [ ] Code examples tested

## Common Pitfalls

### ❌ Don't
- Create skills without testing
- Add workflow details to skill descriptions
- Use `@` links that force-load files
- Break backward compatibility without planning
- Make large changes without understanding the full system
- Spawn additional agents (only the Co-CEO does this)

### ✅ Do
- Follow all links to understand context
- Make minimal, focused changes
- Test skills with subagents
- Preserve existing patterns
- Update all affected files
- Use cross-references, not duplication

## Getting Help

If you're stuck:

1. Read `slimmed-strategic-co-ceo-process.md` again
2. Read the relevant phase skill
3. Read similar existing implementations
4. Escalate with:
   - What you were trying to do
   - What you read
   - Where you're stuck
   - Options you're considering

## Remember

**This meta-folder enables MVP development.** Every improvement you make should make the system more:
- **Reliable** - works consistently
- **Clear** - easy to understand
- **Maintainable** - easy to update
- **Effective** - produces better MVPs

When in doubt, follow the links, follow the patterns, and keep changes minimal.
