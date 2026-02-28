# Benchmarking Scripts - Test Guide

## Quick Start: Testing with Linear

### Step 1: Set up your browserless API key

Add to `.env` file in project root:
```
BROWSERLESS_API_KEY=your-browserless-api-token
```

### Step 2: Export cookies from Linear

1. Open Chrome and log into [linear.app](https://linear.app)
2. Install "EditThisCookie" or "Cookie-Editor" browser extension
3. Click the extension icon while on linear.app
4. Export cookies as JSON
5. Save as `linear_cookies.json` in this directory

**Cookie-Editor export:** Click export → JSON format
**EditThisCookie export:** Click export button (downloads JSON)

### Step 3: Run the test

```bash
cd /path/to/buildersuite

# Test authenticated Linear dashboard
python3 .claude/scripts/benchmarking/test_scrape.py \
    --url "https://linear.app/YOUR_WORKSPACE/inbox" \
    --cookies .claude/scripts/benchmarking/linear_cookies.json

# Test Linear landing page (no auth needed)
python3 .claude/scripts/benchmarking/test_scrape.py \
    --url "https://linear.app" \
    --landing

# Test Baremetrics public dashboard (no auth needed)
python3 .claude/scripts/benchmarking/test_scrape.py \
    --url "https://rb2b.baremetrics.com/" \
    --landing
```

### Step 4: Check results

Results are saved to `scrape_results/` directory:
- `*.html` - Page HTML content
- `*.png` - Full-page screenshot
- `*_meta.json` - Metadata about the scrape

## Troubleshooting

### "Request timed out"
Browserless free tier has 1 minute session limit. The page might be too slow to load.

### "HTTP 401"
Check your BROWSERLESS_API_KEY is correct.

### "HTTP 429"
Rate limited. Wait a minute and try again. Free tier allows 1 concurrent browser.

### Cookies expired
Re-export cookies from your browser. Session cookies typically last hours to days.

### Bot detection / Cloudflare
The script uses `/chromium/unblock` with stealth mode by default. If still blocked:
1. Try `--no-stealth` flag (sometimes stealth triggers detection)
2. Some sites have aggressive protection that can't be bypassed

## API Usage (Free Tier)

- 1,000 units/month
- 1 unit = 30 seconds of browser time
- 1 minute session = 2 units
- This test uses ~2 units per run

## Files

- `test_scrape.py` - Main test script
- `README.md` - This file
- `linear_cookies.json` - Your exported cookies (you create this)
- `scrape_results/` - Output directory (created automatically)
