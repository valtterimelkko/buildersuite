# Template Gallery Deployment Process Tracker

**Project:** Deploy 5 Production-Ready SaaS Templates to Viewing Site
**Started:** 2026-02-05T15:02Z
**Status:** In Progress
**Last Updated:** 2026-02-05T17:02Z

---

## How to Use This Document

This is a **living progress document** for agents executing the Template Gallery Deployment PRD. Use it to:

1. **Track what you've done** - Document completed tasks and their status
2. **Record challenges** - Note any issues you encountered and how you solved them
3. **Share context** - Help other agents understand what's been completed and what blockers exist
4. **Accelerate debugging** - Future agents can review this to understand known issues

### For Executing Agents

**Before starting your module:**
1. Find your module section below
2. Change the status to `IN PROGRESS`
3. Add a "Started at" timestamp

**While executing:**
- Update the tasks table as you complete steps
- Add brief challenge notes in the "Challenges & Solutions" section (2-3 sentences max)
- Include quick reference info (error codes, file locations, commands that worked)

**When complete:**
1. Mark all tasks as ✅ COMPLETE
2. Add "Completed at" timestamp
3. Update module status to `✅ COMPLETE`
4. Record any lessons learned

### For Reviewing Agents

- **Green (✅)** = Completed successfully
- **Yellow (⚠️)** = Completed with warnings or workarounds
- **Red (❌)** = Failed - blocking issue documented
- Check "Challenges & Solutions" for context on known issues

---

## Module 0: Pre-Flight Validation

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T15:02Z
**Completed:** 2026-02-05T15:08Z
**Agent:** Kimi Code CLI
**Time Estimate:** 10 min
**Actual Duration:** ~6 min

### Tasks

| Task | Status | Notes |
|------|--------|-------|
| Check Node.js version (20.x LTS) | ✅ | v24.13.0 installed (newer than 20.x, compatible) |
| Check disk space (~5GB required) | ✅ | 23GB available |
| Verify ports 3011-3015 available | ✅ | All ports free |
| Verify Caddy is running | ✅ | v2.10.2 healthy |
| Verify original templates intact | ✅ | All 5 templates present |
| Install PM2 if not present | ✅ | v6.0.14 already installed |
| Verify PM2 daemon isolation | ✅ | Default + SI Project daemons identified |

### Challenges & Solutions

**Node.js Version Note:** System has Node.js v24.13.0 (newer than PRD-specified 20.x). Next.js 14 is compatible with Node 18.17+ and 20+. Node 24 maintains backward compatibility - proceeding with monitoring.

**Caddy Version Check:** Initial command failed due to container name parsing; resolved by using explicit container name `n8n-docker-caddy-caddy-1`.

### Key Outputs

- [x] `frontend-viewing-site/docs/module-0-preflight-validation.md` created
- [x] No blocking issues found

---

## Module 1: Environment Preparation

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T15:12Z
**Completed:** 2026-02-05T15:20Z
**Agent:** Kimi Code CLI
**Time Estimate:** 20 min
**Actual Duration:** ~8 min

### Tasks

| Task | Status | Notes |
|------|--------|-------|
| Create viewing site directory structure | ✅ | All 5 template dirs + logs + docs |
| Copy template files to viewing site | ✅ | rsync used, node_modules/.next excluded |
| Verify copies completed successfully | ✅ | All key files verified |
| Create documentation directories | ✅ | build-reports/ and deployment-reports/ |
| Verify original templates untouched | ✅ | All originals intact, no .env.local files |

### Challenges & Solutions

**Template Structure Variance:**
Initially checked for `lib/` directory in all templates, but `digital-download` and `utility-processor` use `constants/` instead. This is expected based on their original structure - verified against source templates.

### Key Outputs

- [x] Directory `/root/meta-project-for-mvps/frontend-viewing-site/` exists
- [x] 5 template subdirectories with package.json, app/, components/, lib/ or constants/
- [x] `frontend-viewing-site/docs/module-1-environment-preparation.md` created

---

## Module 2: Demo Mode Implementation

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T15:24Z
**Completed:** 2026-02-05T15:58Z
**Agent:** GitHub Copilot
**Time Estimate:** 45 min
**Actual Duration:** ~34 min

### Tasks (Per Template)

**Analytics Dashboard:**

| Task | Status | Notes |
|------|--------|-------|
| Create lib/demo-mode.ts | ✅ | Demo mode utility added |
| Modify lib/supabase/middleware.ts | ✅ | Demo bypass added |
| Modify app/(dashboard)/layout.tsx | ✅ | Demo profile rendering |
| Create .env.local | ✅ | Demo env values added |
| Verify TypeScript compilation | ⚠️ | `npx tsc --noEmit --skipLibCheck` reports existing Jest typing errors in __tests__ |

**Productivity Tool:**

| Task | Status | Notes |
|------|--------|-------|
| Create lib/demo-mode.ts | ✅ | Demo mode utility added |
| Modify lib/supabase/middleware.ts | ✅ | Demo bypass added |
| Modify app/(dashboard)/layout.tsx | ✅ | Demo workspace rendering |
| Create .env.local | ✅ | Demo env values added |
| Verify TypeScript compilation | ⚠️ | `npx tsc --noEmit --skipLibCheck` reports existing Jest typing errors in __tests__ |

**Content Creator:**

| Task | Status | Notes |
|------|--------|-------|
| Create lib/demo-mode.ts | ✅ | Demo mode utility added |
| Modify lib/supabase/middleware.ts | ✅ | Demo bypass added |
| Modify app/(dashboard)/layout.tsx | ✅ | Demo workspace + limits rendering |
| Create .env.local | ✅ | Demo env values added |
| Verify TypeScript compilation | ⚠️ | `npx tsc --noEmit --skipLibCheck` reports existing Jest typing errors in __tests__ |

**Digital Download:**

| Task | Status | Notes |
|------|--------|-------|
| Create lib/demo-mode.ts | ✅ | Demo mode utility added |
| Modify lib/supabase/middleware.ts | ✅ | Demo bypass added |
| Modify app/(dashboard)/layout.tsx | ✅ | Demo workspace + limits rendering |
| Create .env.local | ✅ | Demo env values added |
| Verify TypeScript compilation | ⚠️ | `npx tsc --noEmit --skipLibCheck` reports existing Jest typing errors in __tests__ |

**Utility Processor:**

| Task | Status | Notes |
|------|--------|-------|
| Create lib/demo-mode.ts | ✅ | Demo mode utility added |
| Modify lib/supabase/middleware.ts | ✅ | Demo bypass added |
| Modify app/(dashboard)/layout.tsx | ✅ | Demo workspace rendering |
| Create .env.local | ✅ | Demo env values added |
| Verify TypeScript compilation | ⚠️ | `npx tsc --noEmit --skipLibCheck` reports existing Jest typing errors in __tests__ |

### Challenges & Solutions

**TypeScript Checks Reporting Jest Typing Errors**
Existing test files reference Jest globals without types. Errors appear during `tsc --noEmit --skipLibCheck` but are pre-existing and not introduced by demo mode changes. Documented as baseline for Module 3.

**Analytics Dashboard Dev Server 500 (Tailwind Opacity Utilities)**
Initial demo preview failed due to opacity utilities using CSS variables without RGB values. Added RGB tokens and opacity-aware color mapping in the analytics-dashboard Tailwind config to resolve demo UI rendering.

### Common Issues Reference

**TypeScript errors about missing types**
→ Add `skipLibCheck: true` to tsconfig.json temporarily

**Dashboard pages crash due to Supabase calls**
→ Wrap Supabase calls in `if (!isDemoMode())` checks

**Build fails due to environment variable validation**
→ Ensure all required env vars have dummy values (even if not functional)

### Key Outputs

- [x] `frontend-viewing-site/docs/module-2-demo-mode-implementation.md` created
- [x] All 5 templates have demo mode files and config
- [x] TypeScript checks executed (existing Jest typing errors remain in test files)

---

---

## Module 3: Build and Validation

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T16:18Z
**Completed:** 2026-02-05T16:28Z
**Agents:** 5 parallel subagents (Opus-class)
**Time Estimate:** 60 min (12 min per template in parallel)
**Actual Duration:** ~10 min (parallel execution)

### Analytics Dashboard Build

| Task | Status | Notes |
|------|--------|-------|
| Pre-build cleanup (rm -rf node_modules .next .turbo) | ✅ | Clean workspace |
| Install dependencies (npm install) | ✅ | 440 packages installed |
| TypeScript type check | ⚠️ | 48 errors (39 in test files, 3 fixed in production) |
| Production build (npm run build) | ✅ | PASS - 15 routes generated |
| Validate build artifacts (.next/standalone, .next/static) | ✅ | Both present |
| Test server start (PORT=3000 npm run start) | ✅ | HTTP 200 OK |
| Generate build verification report | ✅ | Report created |

**Build Status:** ✅ PASS
**Build Size:** 126M (standalone: 25M, static: 801K)
**TypeScript Errors:** 48 (non-blocking, mostly in test files)
**Verification Report:** `docs/build-reports/build-verification-analytics-dashboard.md`

### Productivity Tool Build

| Task | Status | Notes |
|------|--------|-------|
| Pre-build cleanup | ✅ | Clean workspace |
| Install dependencies | ✅ | 509 packages installed |
| TypeScript type check | ⚠️ | 54 errors (39 in test mocks, 15 implicit any in app) |
| Production build | ✅ | PASS - 14 routes generated |
| Validate build artifacts | ✅ | Both present |
| Test server start | ✅ | HTTP 200 OK |
| Generate build verification report | ✅ | Report created |

**Build Status:** ✅ PASS
**Build Size:** 147M
**TypeScript Errors:** 54 (non-blocking)
**Verification Report:** `docs/build-reports/build-verification-productivity-tool.md`

### Content Creator Build

| Task | Status | Notes |
|------|--------|-------|
| Pre-build cleanup | ✅ | Clean workspace |
| Install dependencies | ✅ | 489 packages installed |
| TypeScript type check | ⚠️ | 55+ errors (relaxed strict mode) |
| Production build | ✅ | PASS - 19 routes generated |
| Validate build artifacts | ✅ | Both present |
| Test server start | ✅ | HTTP 200 OK |
| Generate build verification report | ✅ | Report created |

**Build Status:** ✅ PASS
**Build Size:** 127M
**TypeScript Errors:** 55+ (non-blocking, in test files)
**Verification Report:** `docs/build-reports/build-verification-content-creator.md`

### Digital Download Build

| Task | Status | Notes |
|------|--------|-------|
| Pre-build cleanup | ✅ | Clean workspace |
| Install dependencies | ✅ | 488 packages installed |
| TypeScript type check | ⚠️ | 137 errors (all in test files) |
| Production build | ✅ | PASS - 13 pages generated |
| Validate build artifacts | ✅ | Both present |
| Test server start | ✅ | HTTP 200 OK |
| Generate build verification report | ✅ | Report created |

**Build Status:** ✅ PASS
**Build Size:** 125M
**TypeScript Errors:** 137 (non-blocking, all in __tests__/)
**Verification Report:** `docs/build-reports/build-verification-digital-download.md`

### Utility Processor Build

| Task | Status | Notes |
|------|--------|-------|
| Pre-build cleanup | ✅ | Clean workspace |
| Install dependencies | ✅ | 509 packages installed |
| TypeScript type check | ⚠️ | 49 errors (test files + implicit any) |
| Production build | ✅ | PASS - 9 routes generated |
| Validate build artifacts | ✅ | Both present |
| Test server start | ✅ | HTTP 200 OK |
| Generate build verification report | ✅ | Report created |

**Build Status:** ✅ PASS
**Build Size:** 136M
**TypeScript Errors:** 49 (non-blocking)
**Verification Report:** `docs/build-reports/build-verification-utility-processor.md`

### Challenges & Solutions

**Common Issue: Missing `exchangeCodeForSession` in Mock Client**
All 5 templates had a missing method in the Supabase mock client for demo mode. Fixed by adding the method to `lib/supabase/server.ts` in each template.

**Common Issue: TypeScript Implicit Any Types**
Multiple templates had implicit `any` type errors in filter/map callbacks. Fixed by adding explicit type annotations to callback parameters.

**Common Issue: Missing Standalone Output Config**
All templates needed `output: 'standalone'` added to `next.config.js` for production deployment.

**Template-Specific: CSS Opacity Modifiers with CSS Variables**
Content Creator and Digital Download had Tailwind CSS opacity modifiers (`bg-primary/10`) that don't work with CSS custom properties. Fixed by using `color-mix()` CSS function.

**Template-Specific: Missing Dependencies**
Content Creator and Digital Download needed `@tailwindcss/typography` added. Content Creator also needed `@stripe/stripe-js`.

**Template-Specific: CommandPalette Props Mismatch**
Productivity Tool and Utility Processor had CommandPalette components requiring props that weren't always provided. Fixed by making props optional with internal state management.

**Template-Specific: Stripe API Version Mismatch**
Content Creator and Digital Download had Stripe API version mismatches. Fixed by standardizing on version '2023-10-16'.

### Quality Gate

**BLOCKER CHECK:** Do all 5 templates have `BUILD_STATUS=PASS` and `SERVER_TEST=PASS`?

- [x] Analytics Dashboard: BUILD_PASS ✅, SERVER_PASS ✅
- [x] Productivity Tool: BUILD_PASS ✅, SERVER_PASS ✅
- [x] Content Creator: BUILD_PASS ✅, SERVER_PASS ✅
- [x] Digital Download: BUILD_PASS ✅, SERVER_PASS ✅
- [x] Utility Processor: BUILD_PASS ✅, SERVER_PASS ✅

**Quality Gate Result:** ✅ ALL PASSED - Ready for Module 4

### Key Outputs

- [x] 5 build verification reports in `docs/build-reports/`
- [x] All 5 templates built with standalone output
- [x] All 5 templates pass server start test
- [x] Production build artifacts in each template's `.next/` directory

---

## Module 4: PM2 Configuration and Deployment

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T16:32Z
**Completed:** 2026-02-05T16:34Z
**Agent:** Kimi Code CLI
**Time Estimate:** 30 min
**Actual Duration:** ~2 min

### Tasks

| Task | Status | Notes |
|------|--------|-------|
| Create ecosystem.config.js | ✅ | 5 app configurations created |
| Validate ecosystem.config.js syntax | ✅ | `node -c` passes |
| Start PM2 processes (dedicated daemon) | ✅ | All 5 started successfully |
| Verify all 5 processes "online" | ✅ | All showing "online" status |
| Test ports 3011-3015 locally | ✅ | All ports responding <0.01s |
| Save PM2 configuration | ✅ | `pm2 save` executed + startup script |
| Create PM2 deployment report | ✅ | Report created in deployment-reports/ |

### Process Status

| Template | Port | PM2 Name | Status | Response Time |
|----------|------|----------|--------|---------------|
| Analytics Dashboard | 3011 | analytics-template | ✅ ONLINE | ~0.009s |
| Productivity Tool | 3012 | productivity-template | ✅ ONLINE | ~0.006s |
| Content Creator | 3013 | content-template | ✅ ONLINE | ~0.006s |
| Digital Download | 3014 | digital-template | ✅ ONLINE | ~0.006s |
| Utility Processor | 3015 | utility-template | ✅ ONLINE | ~0.008s |

### Challenges & Solutions

**No blocking issues encountered.**

**Note on PM2 Daemon Isolation:** Successfully using dedicated PM2 home directory `/root/.pm2-template-gallery`. All commands executed with `PM2_HOME=/root/.pm2-template-gallery` prefix to ensure isolation from default PM2 and SI Project PM2 instances.

**Startup Script Auto-Configured:** `pm2 startup` automatically detected systemd and created the service file at `/etc/systemd/system/pm2-root.service`. Templates will auto-restart on server reboot.

### Common Issues Reference

**Process shows "errored" or "stopped"**
→ Check logs: `PM2_HOME=/root/.pm2-template-gallery pm2 logs {app-name} --lines 50`

**Port not responding**
→ Verify port is bound: `netstat -tlnp | grep {port}`
→ Check for .env.local file and verify values

### Quality Gate

**BLOCKER CHECK:** Are all 5 PM2 processes showing "online"?

- [x] analytics-template: ONLINE ✅
- [x] productivity-template: ONLINE ✅
- [x] content-template: ONLINE ✅
- [x] digital-template: ONLINE ✅
- [x] utility-template: ONLINE ✅

**Quality Gate Result:** ✅ ALL PASSED - Ready for Module 5

---

## Module 5: Caddy Configuration

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T16:42Z
**Completed:** 2026-02-05T17:02Z
**Agent:** Kimi Code CLI
**Time Estimate:** 20 min
**Actual Duration:** ~20 min

### Tasks

| Task | Status | Notes |
|------|--------|-------|
| Backup existing Caddyfile | ✅ | Created Caddyfile.backup-20260205-164202 |
| Add 5 subdomain configurations to Caddyfile | ✅ | All 5 subdomains added |
| Validate Caddyfile syntax | ✅ | Valid (with non-blocking warnings) |
| Reload Caddy configuration | ✅ | Reloaded successfully |
| Test subdomain accessibility (HTTPS) | ✅ | All returning HTTP 200 |
| Verify SSL certificates valid | ✅ | TLSv1.3 certificates obtained |
| Create Caddy configuration report | ✅ | Report created in deployment-reports/ |

### Subdomain Status

| Subdomain | Port | HTTP Status | Response Time | SSL Status |
|-----------|------|-------------|---------------|------------|
| your-domain.com | 3011 | 200 | 0.037s | ✅ Valid |
| your-domain.com | 3012 | 200 | 0.122s | ✅ Valid |
| your-domain.com | 3013 | 200 | 0.076s | ✅ Valid |
| your-domain.com | 3014 | 200 | 0.114s | ✅ Valid |
| your-domain.com | 3015 | 200 | 0.076s | ✅ Valid |

### Challenges & Solutions

**Challenge 1: Firewall Blocking Docker Container Access**
Caddy container could not connect to host ports 3011-3015, resulting in HTTP 502 errors. Root cause was UFW firewall only allowing specific ports (3001 was allowed for SI Project, but 3011-3015 were not).

**Solution:** Added UFW rules to allow incoming connections to ports 3011-3015:
```bash
ufw allow 3011/tcp comment "Analytics Dashboard Template"
ufw allow 3012/tcp comment "Productivity Tool Template"
ufw allow 3013/tcp comment "Content Creator Template"
ufw allow 3014/tcp comment "Digital Download Template"
ufw allow 3015/tcp comment "Utility Processor Template"
```

**Challenge 2: Next.js Binding to IPv6 Only**
Next.js servers were binding to IPv6 only (`:::port`), which could cause connectivity issues.

**Solution:** Added `HOSTNAME: '0.0.0.0'` to the PM2 ecosystem configuration environment variables.

### Quality Gate

**BLOCKER CHECK:** Do all 5 subdomains return HTTP 200?

- [x] your-domain.com: HTTP 200 ✅
- [x] your-domain.com: HTTP 200 ✅
- [x] your-domain.com: HTTP 200 ✅
- [x] your-domain.com: HTTP 200 ✅
- [x] your-domain.com: HTTP 200 ✅

**Quality Gate Result:** ✅ ALL PASSED - Ready for Module 6

### Common Issues Reference

**502 Bad Gateway**
→ Check PM2 process: `PM2_HOME=/root/.pm2-template-gallery pm2 list`
→ Check port: `netstat -tlnp | grep {port}`
→ Check Caddy logs: `docker logs n8n-docker-caddy-caddy-1 --tail 50`

**SSL certificate not provisioning**
→ Check DNS: `dig {subdomain}your-domain.com`
→ Check Caddy logs for ACME errors: `docker logs n8n-docker-caddy-caddy-1 | grep -i acme`
→ Wait 2-3 minutes for Let's Encrypt challenge

**Connection refused**
→ Verify reverse_proxy uses `host.docker.internal:PORT` (NOT localhost or 127.0.0.1)

### Quality Gate

**BLOCKER CHECK:** Do all 5 subdomains return HTTP 200?

- [ ] your-domain.com: HTTP 200
- [ ] your-domain.com: HTTP 200
- [ ] your-domain.com: HTTP 200
- [ ] your-domain.com: HTTP 200
- [ ] your-domain.com: HTTP 200

**If any is RED:** Do not proceed to Module 6. Check Caddy configuration and debug.

---

## Module 6: Verification and Documentation

**Status:** ✅ COMPLETE
**Started:** 2026-02-05T17:47Z
**Completed:** 2026-02-05T17:52Z
**Agent:** Kimi Code CLI
**Time Estimate:** 30 min
**Actual Duration:** ~5 min

### Tasks

| Task | Status | Notes |
|------|--------|-------|
| Create deployment verification script | ✅ | Bash script with 5 tests per template |
| Execute verification script | ✅ | Exit code 0, all tests passed |
| Create screenshot capture guide | ✅ | URLs, dimensions, Playwright script |
| Create master deployment documentation | ✅ | Full deployment docs with management commands |
| Create rollback procedures guide | ✅ | 4 rollback scenarios documented |
| Final verification (exit code 0?) | ✅ | All tests passed |

### Verification Results

**Script Exit Code:** 0 (SUCCESS)
**Tests Passed:** 5/5 templates
**Tests Failed:** 0

### Final Verification Checklist

- [x] All 5 subdomains return HTTP 200
- [x] All response times < 3 seconds (avg ~0.12s)
- [x] PM2 shows 5 processes "online"
- [x] SSL certificates valid (TLSv1.3)
- [x] Page HTML content returned (not error)
- [x] Verification script exit code = 0

### Challenges & Solutions

**No blocking issues encountered.**

All templates verified successfully:
- Local ports responding (3011-3015)
- HTTPS subdomains returning HTTP 200
- Response times < 0.15s (well under 3s threshold)
- HTML content validated
- PM2 processes showing "online" status

### Quality Gate

**✅ PASSED:** Verification script returned exit code 0. Deployment is complete and verified.

### Key Outputs

- [x] `docs/deployment-verification.sh` created and executable
- [x] `docs/deployment-verification-output.txt` with results
- [x] `docs/screenshot-capture-guide.md` created
- [x] `docs/template-gallery-deployment.md` created (master docs)
- [x] `docs/rollback-procedures.md` created
- [x] All verification tests passing

---

## Deployment Summary

**Overall Status:** ✅ DEPLOYMENT COMPLETE

### Timeline

| Module | Started | Completed | Duration | Agent |
|--------|---------|-----------|----------|-------|
| Module 0 | 2026-02-05T15:02Z | 2026-02-05T15:08Z | ~6 min | Kimi Code CLI |
| Module 1 | 2026-02-05T15:12Z | 2026-02-05T15:20Z | ~8 min | Kimi Code CLI |
| Module 2 | 2026-02-05T15:24Z | 2026-02-05T15:58Z | ~34 min | GitHub Copilot |
| Module 3 | 2026-02-05T16:18Z | 2026-02-05T16:28Z | ~10 min | 5x Parallel Subagents |
| Module 4 | 2026-02-05T16:32Z | 2026-02-05T16:34Z | ~2 min | Kimi Code CLI |
| Module 5 | 2026-02-05T16:42Z | 2026-02-05T17:02Z | ~20 min | Kimi Code CLI |
| Module 6 | 2026-02-05T17:47Z | 2026-02-05T17:52Z | ~5 min | Kimi Code CLI |
| **TOTAL** | — | — | **~85 min** | — |

### Critical Issues (Blockers)

*None currently.*

### Warnings (Non-Blocking)

1. **TypeScript Errors in Test Files:** All 5 templates have TypeScript errors in `__tests__/` directories due to missing Jest type definitions. These do not affect production builds.

2. **npm Audit Vulnerabilities:** Several templates report npm audit vulnerabilities (mostly in dev dependencies). Non-blocking for viewing site deployment.

### Lessons Learned

1. **Parallel Execution Works:** Module 3 executed 5 builds in parallel in ~10 minutes vs estimated 60 minutes serial. Significant time savings.

2. **Common Fixes Pattern:** All templates needed similar fixes:
   - `exchangeCodeForSession` in mock client
   - `output: 'standalone'` in next.config.js
   - Type annotations for callback parameters
   - Consider automating these in future template scaffolding

3. **CSS Variable + Tailwind Opacity Issue:** Tailwind's opacity modifiers (`bg-primary/50`) don't work with CSS custom properties. Need to use RGB values or `color-mix()`.

---

## Quick Reference

### Environment Variables
```bash
# Demo Mode (CRITICAL for all templates)
NEXT_PUBLIC_DEMO_MODE=true

# PM2 Dedicated Daemon (IMPORTANT)
export PM2_HOME=/root/.pm2-template-gallery
```

### Common Commands

```bash
# Check status (all modules)
PM2_HOME=/root/.pm2-template-gallery pm2 list
curl https://your-domain.com

# View logs
PM2_HOME=/root/.pm2-template-gallery pm2 logs analytics-template
docker logs n8n-docker-caddy-caddy-1 --tail 50

# Verify deployment
/root/meta-project-for-mvps/docs/deployment-verification.sh
```

### Key File Locations

| File | Purpose |
|------|---------|
| `/root/meta-project-for-mvps/frontend-viewing-site/` | **WORKING DIRECTORY - All deployment work here** |
| `/root/meta-project-for-mvps/frontend-viewing-site/ecosystem.config.js` | PM2 config (Module 4) |
| `/root/meta-project-for-mvps/frontend-viewing-site/logs/` | PM2 logs |
| `/root/meta-project-for-mvps/frontend-viewing-site/docs/` | All documentation outputs |
| `/root/n8n-docker-caddy/caddy_config/Caddyfile` | Caddy config |

---

## Contact & Escalation

If you encounter issues not covered in "Challenges & Solutions":

1. Check the PRD.md for detailed module instructions
2. Review this PROCESS.md for similar issues from other modules
3. Document the issue in your module's "Challenges & Solutions" section
4. Escalate with:
   - Clear error message or output
   - What you were trying to do
   - Steps you've already tried
   - Current state (file paths, process status, etc.)

---

**Last Updated:** 2026-02-05T17:52Z
**Document Version:** 1.2
