# Template Validation Scripts

Helper scripts for validating MVP templates against integration requirements.

## Usage

### Master Validation Script

Runs all validation checks on a template:

```bash
./validate-template.sh templates/analytics-dashboard
```

### Individual Checks

```bash
# Structure validation
python3 check-structure.py templates/analytics-dashboard

# Manifest validation
python3 check-manifest.py templates/analytics-dashboard/manifest.json

# Content slots validation
python3 check-content-slots.py templates/analytics-dashboard/content/slots.json

# Brand tokens validation
python3 check-brand-tokens.py templates/analytics-dashboard/frontend/styles/tokens.css

# Supabase schema validation
python3 check-supabase-schema.py templates/analytics-dashboard/supabase/migrations/

# Stripe config validation
python3 check-stripe-config.py templates/analytics-dashboard/stripe/products.json
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Pass - no issues |
| 1 | Blockers found - must fix |
| 2 | Warnings only - should fix |

## JSON Output

All Python scripts support `--json` flag for machine-readable output:

```bash
python3 check-content-slots.py templates/analytics-dashboard/content/slots.json --json
```

Output:
```json
{
  "status": "pass",
  "blockers": [],
  "warnings": [],
  "total_slots": 42
}
```

## Scripts

| Script | Purpose |
|--------|---------|
| `validate-template.sh` | Master script - runs all checks |
| `check-structure.py` | Validates directory structure |
| `check-manifest.py` | Validates manifest.json |
| `check-content-slots.py` | Validates content/slots.json |
| `check-brand-tokens.py` | Validates CSS tokens |
| `check-supabase-schema.py` | Validates SQL migrations |
| `check-stripe-config.py` | Validates Stripe products.json |

## Making Scripts Executable

```bash
chmod +x validate-template.sh
chmod +x *.py
```
