# Shared Resources (Claude & Kimi)

This folder contains scripts and skills used by **both Claude Code and Kimi Code CLI** in the hybrid Co-CEO architecture.

## Folder Structure

```
.shared/
├── scripts/          # Shared helper scripts (shell and Python)
│   ├── co-ceo/       # Phase management, git operations
│   ├── supabase/     # Database operations, migrations
│   ├── stripe/       # Billing product deployment
│   ├── templates/    # Template validation and branding
│   ├── notion/       # Notion integration scripts
│   └── ...
└── skills/           # Shared skills used by both platforms
    ├── co-ceo-phases/    # Phase orchestration skills
    ├── mvp-ux-design/    # UX design skill
    ├── mvp-technical-prd-architecture/
    ├── mvp-security-review/
    ├── test-driven-development/
    ├── systematic-debugging/
    └── ...
```

## Platform-Specific Locations

| Platform | Location | Purpose |
|----------|----------|---------|
| **Shared** (both) | `.shared/scripts/` | Helper scripts for both platforms |
| **Shared** (both) | `.shared/skills/` | Skills used by both platforms |
| **Claude only** | `.claude/agents/` | Agent definitions (Claude Task tool) |
| **Claude only** | `.claude/skills/` | Phase 1.4 marketing skills (Claude-only) |
| **Kimi only** | `.kimi/skills/` | Kimi-specific skill wrappers (if needed) |

## Path References

### In Scripts
Scripts reference other shared resources using relative paths:
```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$SCRIPT_DIR/../../skills/co-ceo-phases"
```

### In Skills
Skills reference scripts using paths from project root:
```bash
.claude/scripts/co-ceo/load-phase-context.sh 2.1
```

Or in documentation:
```bash
.shared/scripts/co-ceo/load-phase-context.sh 2.1
```

## Phase Platform Usage

| Phase | Platform | Scripts Used From |
|-------|----------|-------------------|
| 0.0, 1.1, 1.3 | Either | `.shared/scripts/` |
| 1.2, 1.4, 1.5 | Claude | `.shared/scripts/` |
| 2.1 - 7.1 | Kimi | `.shared/scripts/` |

## Adding New Shared Resources

1. **Scripts**: Add to `.shared/scripts/<category>/`
2. **Skills**: Add to `.shared/skills/<skill-name>/`
3. Update any path references in documentation

## Migration Notes

This folder was created as part of the hybrid architecture refactoring:
- Scripts were moved from `.claude/scripts/` → `.shared/scripts/`
- Skills were moved from `.claude/skills/` → `.shared/skills/`
- Only Phase 1.4 marketing skills remain in `.claude/skills/`
- Agent definitions remain in `.claude/agents/` (Claude-only)
