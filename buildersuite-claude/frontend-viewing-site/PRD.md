# PRD: SaaS Template Gallery Deployment

**Project:** Deploy 5 Production-Ready SaaS Templates to Viewing Site
**Owner:** Meta-Project for MVPs
**Target Deployment:** your-domain.com subdomains via Caddy
**Estimated Time:** 3-4 hours (with parallel execution)
**Status:** Planning Complete - Ready for Execution

---

## ⚠️ CRITICAL: Working Directory

**ALL work for this deployment MUST be done in:**
```
/root/meta-project-for-mvps/frontend-viewing-site/
```

**This is the ONLY location for:**
- Template files (copied from `/root/meta-project-for-mvps/templates/`)
- Build artifacts (`.next/`, `node_modules/`)
- Configuration files (`.env.local`, `ecosystem.config.js`)
- Documentation (`docs/` folder)
- Log files (`logs/` folder)

**NEVER modify files in `/root/meta-project-for-mvps/templates/` directly** - those are the source originals. Always work in `frontend-viewing-site/`.

---

## Executive Summary

Deploy all 5 SaaS frontend templates (analytics-dashboard, productivity-tool, content-creator, digital-download, utility-processor) to publicly accessible subdomains for viewing purposes and marketing screenshot capture. Templates will use **Demo Mode** to bypass authentication, enabling full dashboard viewing without Supabase infrastructure setup.

### Success Criteria
- ✅ All 5 templates built successfully with zero errors
- ✅ Each template accessible via unique subdomain (HTTPS)
- ✅ Landing pages fully functional
- ✅ Dashboard pages viewable without authentication (demo mode)
- ✅ All templates responding < 2 seconds
- ✅ Screenshots suitable for marketing materials
- ✅ Documentation complete for future maintenance

### Key Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Template Count** | All 5 templates | Comprehensive showcase |
| **Auth Strategy** | Demo Mode | Shows full functionality without infrastructure overhead |
| **Deployment Platform** | Caddy (Docker) | Already running with auto SSL, faster setup, sufficient for viewing |
| **Port Allocation** | Sequential 3011-3015 | Predictable, no conflicts with existing SI Project (3001) |
| **Process Manager** | PM2 (Dedicated Daemon) | Separate PM2 instance at `/root/.pm2-template-gallery` to avoid clashes with default `/root/.pm2` and SI Project's `/root/.pm2-si-project` |

**IMPORTANT NOTES:**
- SI Project dashboard already uses port 3001, so templates will use 3011-3015 instead
- Dedicated PM2 daemon ensures template gallery processes are isolated and won't interfere with other PM2 instances
- Caddy is running in Docker container `n8n-docker-caddy-caddy-1` and handles SSL/TLS automatically via Let's Encrypt

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│ Caddy Reverse Proxy (Docker: n8n-docker-caddy-caddy-1)           │
├──────────────────────────────────────────────────────────────────┤
│ your-domain.com     → host.docker.internal:3011     │
│ your-domain.com  → host.docker.internal:3012     │
│ your-domain.com       → host.docker.internal:3013     │
│ your-domain.com       → host.docker.internal:3014     │
│ your-domain.com       → host.docker.internal:3015     │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ PM2 Process Manager (5 Next.js Production Servers)               │
├──────────────────────────────────────────────────────────────────┤
│ analytics-template:3011  (npm run start, DEMO_MODE=true)        │
│ productivity-template:3012 (npm run start, DEMO_MODE=true)      │
│ content-template:3013    (npm run start, DEMO_MODE=true)        │
│ digital-template:3014    (npm run start, DEMO_MODE=true)        │
│ utility-template:3015    (npm run start, DEMO_MODE=true)        │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│ File System: /root/meta-project-for-mvps/frontend-viewing-site/  │
├──────────────────────────────────────────────────────────────────┤
│ ├── analytics-dashboard/    (.next, node_modules, .env.local)   │
│ ├── productivity-tool/      (.next, node_modules, .env.local)   │
│ ├── content-creator/        (.next, node_modules, .env.local)   │
│ ├── digital-download/       (.next, node_modules, .env.local)   │
│ ├── utility-processor/      (.next, node_modules, .env.local)   │
│ ├── ecosystem.config.js     (PM2 configuration)                 │
│ └── logs/                   (PM2 process logs)                  │
└──────────────────────────────────────────────────────────────────┘
```

### Port Allocation (UPDATED)

| Template | Port | Subdomain | Display Name | PM2 Name |
|----------|------|-----------|--------------|----------|
| analytics-dashboard | 3011 | your-domain.com | Analytics Dashboard | analytics-template |
| productivity-tool | 3012 | your-domain.com | Productivity Tool | productivity-template |
| content-creator | 3013 | your-domain.com | Content Creator | content-template |
| digital-download | 3014 | your-domain.com | Digital Download | digital-template |
| utility-processor | 3015 | your-domain.com | Utility Processor | utility-template |

---

## DNS Configuration (Porkbun)

**Required DNS A Records:**

| Subdomain | Type | Value | Purpose |
|-----------|------|-------|---------|
| your-domain.com | A | {SERVER_IP} | Analytics Dashboard Template |
| your-domain.com | A | {SERVER_IP} | Productivity Tool Template |
| your-domain.com | A | {SERVER_IP} | Content Creator Template |
| your-domain.com | A | {SERVER_IP} | Digital Download Template |
| your-domain.com | A | {SERVER_IP} | Utility Processor Template |

**Note:** Replace `{SERVER_IP}` with the actual server IP address where Caddy is running (same server as existing your-domain.com and your-domain.com).

**Instructions:** Login to Porkbun → DNS Management → Add the A records above. Caddy will automatically provision SSL certificates via Let's Encrypt.

---

## PM2 Daemon Configuration

**Dedicated PM2 Instance:** `/root/.pm2-template-gallery`

**Rationale:**
- Default PM2 (`/root/.pm2`): Currently empty, reserved for system processes
- SI Project PM2 (`/root/.pm2-si-project`): Running SI Project dashboard
- Template Gallery PM2 (`/root/.pm2-template-gallery`): **NEW - Dedicated for template gallery processes**

This separation ensures:
- Template gallery processes won't interfere with SI Project
- Easier management and debugging
- Ability to restart/update templates independently
- Clear process isolation

**Environment Variable:** When starting PM2 for templates, use `PM2_HOME=/root/.pm2-template-gallery`

---

## Module Breakdown (Modular for Parallel Execution)

### Module 0: Pre-Flight Validation (10 min)
**Agent:** Haiku
**Dependencies:** None
**Parallelizable:** No

#### Purpose
Validate system prerequisites before deployment begins.

#### Tasks
1. **Check Node.js version**
   ```bash
   node --version  # Should be 20.x LTS
   npm --version   # Should be 10.x+
   ```

2. **Check available disk space**
   ```bash
   df -h /root  # Need ~5GB free for 5 builds
   ```

3. **Verify port availability**
   ```bash
   # Check ports 3011-3015 are free
   for port in 3011 3012 3013 3014 3015; do
     netstat -tlnp | grep :$port && echo "⚠️ Port $port in use" || echo "✓ Port $port available"
   done
   ```

4. **Verify Caddy is running**
   ```bash
   docker ps | grep caddy
   docker exec n8n-docker-caddy-caddy-1 caddy version
   ```

5. **Verify original templates intact**
   ```bash
   for template in analytics-dashboard productivity-tool content-creator digital-download utility-processor; do
     [ -f /root/meta-project-for-mvps/templates/$template/frontend/package.json ] && echo "✓ $template exists" || echo "✗ $template missing"
   done
   ```

6. **Install PM2 if not present**
   ```bash
   pm2 --version || npm install -g pm2
   ```

7. **Verify PM2 daemon isolation**
   ```bash
   # Check existing PM2 instances
   ps aux | grep "PM2 v" | grep -v grep

   # Should see:
   # - /root/.pm2 (default)
   # - /root/.pm2-si-project (SI Project)
   # Template gallery will create: /root/.pm2-template-gallery
   ```

#### Verification Criteria
- [ ] Node.js 20.x installed
- [ ] At least 5GB disk space free
- [ ] Ports 3011-3015 available
- [ ] Caddy container running and healthy
- [ ] All 5 template source folders exist
- [ ] PM2 installed globally
- [ ] Existing PM2 daemons verified (default + SI Project)

#### Outputs
- `frontend-viewing-site/docs/module-0-preflight-validation.md` - Validation report

#### Blocking Issues
If any check fails, STOP and escalate to user with details.

---

### Module 1: Environment Preparation (20 min)
**Agent:** Haiku
**Dependencies:** Module 0 complete
**Parallelizable:** No (foundation for other modules)

#### Purpose
Create deployment directory structure and copy template files.

#### Tasks
1. **Create viewing site directory structure**
   ```bash
   mkdir -p /root/meta-project-for-mvps/frontend-viewing-site/{analytics-dashboard,productivity-tool,content-creator,digital-download,utility-processor}
   mkdir -p /root/meta-project-for-mvps/frontend-viewing-site/logs
   mkdir -p /root/meta-project-for-mvps/docs
   ```

2. **Copy template files to viewing site**
   ```bash
   cd /root/meta-project-for-mvps

   # Copy each template's frontend folder
   for template in analytics-dashboard productivity-tool content-creator digital-download utility-processor; do
     echo "Copying $template..."
     cp -r templates/$template/frontend/* frontend-viewing-site/$template/
     echo "✓ $template copied"
   done
   ```

3. **Verify copies completed successfully**
   ```bash
   for template in analytics-dashboard productivity-tool content-creator digital-download utility-processor; do
     if [ -f frontend-viewing-site/$template/package.json ]; then
       echo "✓ $template: package.json exists"
     else
       echo "✗ $template: MISSING package.json"
     fi

     if [ -d frontend-viewing-site/$template/app ]; then
       echo "✓ $template: app/ directory exists"
     else
       echo "✗ $template: MISSING app/ directory"
     fi
   done
   ```

4. **Create documentation directory structure**
   ```bash
   mkdir -p /root/meta-project-for-mvps/docs/build-reports
   mkdir -p /root/meta-project-for-mvps/docs/deployment-reports
   ```

5. **Verify original templates untouched**
   ```bash
   # Quick check: original templates should not have .env.local or .next
   for template in analytics-dashboard productivity-tool content-creator digital-download utility-processor; do
     if [ -f /root/meta-project-for-mvps/templates/$template/frontend/.env.local ]; then
       echo "⚠️ WARNING: Original template $template has .env.local (should not exist)"
     fi
   done
   ```

#### Verification Criteria
- [ ] Directory `/root/meta-project-for-mvps/frontend-viewing-site/` exists
- [ ] 5 template subdirectories created
- [ ] Each subdirectory contains `package.json`, `app/`, `components/`, `lib/`
- [ ] `logs/` directory exists
- [ ] `docs/` directory structure created
- [ ] Original templates at `/root/meta-project-for-mvps/templates/` untouched

#### Outputs
- `frontend-viewing-site/docs/module-1-environment-preparation.md` - Environment setup report with verification results

---

### Module 2: Demo Mode Implementation (45 min)
**Agent:** Opus (requires code modification logic)
**Dependencies:** Module 1 complete
**Parallelizable:** No (systematic approach needed)

#### Purpose
Modify copied templates to bypass authentication in demo mode, enabling dashboard viewing without Supabase infrastructure.

#### Implementation Strategy: Demo Mode

**Core Concept:** Add `NEXT_PUBLIC_DEMO_MODE=true` environment variable and modify middleware to bypass auth checks when enabled.

#### Tasks

**For EACH template (analytics-dashboard, productivity-tool, content-creator, digital-download, utility-processor):**

##### Task 2.1: Create Demo Mode Utility

File: `frontend-viewing-site/{template}/lib/demo-mode.ts`

```typescript
/**
 * Demo Mode Configuration
 * Enables viewing dashboards without authentication for demo/viewing purposes
 */

export const isDemoMode = (): boolean => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}

export const DEMO_USER = {
  id: 'demo-user-00000000-0000-0000-0000-000000000000',
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User',
    avatar_url: null,
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

export const DEMO_PROFILE = {
  id: 'demo-user-00000000-0000-0000-0000-000000000000',
  email: 'demo@example.com',
  full_name: 'Demo User',
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
```

##### Task 2.2: Modify Middleware to Bypass Auth

File: `frontend-viewing-site/{template}/lib/supabase/middleware.ts`

**Current code (lines 1-10):**
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
```

**Add import at top:**
```typescript
import { isDemoMode } from '@/lib/demo-mode'
```

**Add early return after function signature (after line 4):**
```typescript
export async function updateSession(request: NextRequest) {
  // DEMO MODE: Bypass authentication for viewing purposes
  if (isDemoMode()) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })
  // ... rest of existing code
```

##### Task 2.3: Modify Dashboard Layout for Demo User

File: `frontend-viewing-site/{template}/app/(dashboard)/layout.tsx`

**Current code (lines 1-16):**
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
```

**Modify to:**
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { isDemoMode, DEMO_PROFILE } from '@/lib/demo-mode'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DEMO MODE: Use demo user instead of real authentication
  if (isDemoMode()) {
    return (
      <div className="min-h-screen bg-surface">
        <Sidebar />
        <div className="lg:pl-64">
          <Header user={DEMO_PROFILE} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    )
  }

  // PRODUCTION MODE: Real authentication
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="lg:pl-64">
        <Header user={profile || { email: user.email }} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

##### Task 2.4: Create Environment Configuration

File: `frontend-viewing-site/{template}/.env.local`

**Template-specific values:**

```bash
# ============================================
# DEMO MODE CONFIGURATION
# ============================================
NEXT_PUBLIC_DEMO_MODE=true

# ============================================
# APP CONFIGURATION
# ============================================
NEXT_PUBLIC_APP_URL=https://{subdomain}your-domain.com
NEXT_PUBLIC_APP_NAME={Display Name}

# ============================================
# SUPABASE (Dummy Values - Not Functional)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.DEMO_KEY_NOT_FUNCTIONAL
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.DEMO_SERVICE_ROLE_KEY_NOT_FUNCTIONAL

# ============================================
# STRIPE (Dummy Values - Not Functional)
# ============================================
STRIPE_SECRET_KEY=sk_test_demo_not_functional
STRIPE_WEBHOOK_SECRET=whsec_demo_not_functional
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_demo_not_functional
```

**Replace placeholders per template:**

| Template | {subdomain} | {Display Name} |
|----------|-------------|----------------|
| analytics-dashboard | analytics | Analytics Dashboard |
| productivity-tool | productivity | Productivity Tool |
| content-creator | content | Content Creator |
| digital-download | digital | Digital Download |
| utility-processor | utility | Utility Processor |

##### Task 2.5: Handle API Routes (Optional but Recommended)

Create a demo data provider for dashboard pages that make API calls.

File: `frontend-viewing-site/{template}/lib/demo-data.ts`

```typescript
/**
 * Demo Data Provider
 * Returns mock data for dashboard pages in demo mode
 */

export const getDemoAnalytics = () => ({
  totalEvents: 125847,
  activeUsers: 3421,
  conversionRate: 4.8,
  revenue: 28459,
  // Add more mock data as needed for each template
})

export const getDemoProjects = () => [
  { id: '1', name: 'Demo Project 1', status: 'active', created_at: new Date().toISOString() },
  { id: '2', name: 'Demo Project 2', status: 'completed', created_at: new Date().toISOString() },
]

// Add more demo data functions as needed per template
```

#### Verification Steps (Per Template)

After modifying each template:

1. **Verify files created:**
   ```bash
   ls -la frontend-viewing-site/{template}/lib/demo-mode.ts
   ls -la frontend-viewing-site/{template}/.env.local
   ```

2. **Verify modifications applied:**
   ```bash
   grep -n "isDemoMode" frontend-viewing-site/{template}/lib/supabase/middleware.ts
   grep -n "DEMO_PROFILE" frontend-viewing-site/{template}/app/(dashboard)/layout.tsx
   ```

3. **Check TypeScript compilation (dry run):**
   ```bash
   cd frontend-viewing-site/{template}
   npx tsc --noEmit --skipLibCheck 2>&1 | head -20
   ```

#### Verification Criteria
- [ ] `lib/demo-mode.ts` created in all 5 templates
- [ ] `lib/supabase/middleware.ts` modified with demo mode check
- [ ] `app/(dashboard)/layout.tsx` modified with demo user handling
- [ ] `.env.local` created with correct values for each template
- [ ] TypeScript compilation succeeds (no critical errors)
- [ ] Original templates at `/root/meta-project-for-mvps/templates/` still untouched

#### Outputs
- `frontend-viewing-site/docs/module-2-demo-mode-implementation.md` - Implementation report with file changes documented
- Modified files in `frontend-viewing-site/` only

#### Common Issues & Solutions

**Issue:** TypeScript errors about missing types
**Solution:** Add `skipLibCheck: true` to tsconfig.json temporarily

**Issue:** Dashboard pages crash due to Supabase calls
**Solution:** Wrap Supabase calls in `if (!isDemoMode())` checks

**Issue:** Build fails due to environment variable validation
**Solution:** Ensure all required env vars have dummy values (even if not functional)

---

### Module 3: Build and Validation (60 min - Parallelizable!)
**Agent:** 5 Opus agents in parallel (12 min each)
**Dependencies:** Module 2 complete
**Parallelizable:** **YES** - Each template can be built independently

#### Purpose
Build all 5 templates to production-ready state and validate build artifacts.

#### Parallel Execution Strategy

**Agent A:** Build analytics-dashboard
**Agent B:** Build productivity-tool
**Agent C:** Build content-creator
**Agent D:** Build digital-download
**Agent E:** Build utility-processor

Each agent executes the **Per-Template Build Process** below for their assigned template.

#### Per-Template Build Process

**Template:** `{template-name}` (e.g., analytics-dashboard)
**Working Directory:** `/root/meta-project-for-mvps/frontend-viewing-site/{template-name}`

##### Step 3.1: Pre-Build Cleanup
```bash
cd /root/meta-project-for-mvps/frontend-viewing-site/{template-name}

# Remove any existing build artifacts
rm -rf node_modules .next .turbo

echo "✓ Cleanup complete"
```

##### Step 3.2: Install Dependencies
```bash
npm install 2>&1 | tee install-output.log

# Check for errors
if [ ${PIPESTATUS[0]} -eq 0 ]; then
  echo "✓ Dependencies installed successfully"
  INSTALL_STATUS="PASS"
else
  echo "✗ Dependency installation FAILED"
  INSTALL_STATUS="FAIL"
fi
```

##### Step 3.3: TypeScript Type Check
```bash
npx tsc --noEmit 2>&1 | tee typecheck-output.log

# Count errors
TYPE_ERRORS=$(grep -c "error TS" typecheck-output.log || echo "0")

if [ "$TYPE_ERRORS" -eq 0 ]; then
  echo "✓ TypeScript check passed (0 errors)"
  TYPECHECK_STATUS="PASS"
else
  echo "⚠️ TypeScript check found $TYPE_ERRORS errors"
  TYPECHECK_STATUS="WARN"
fi
```

##### Step 3.4: Production Build
```bash
npm run build 2>&1 | tee build-output.log

# Check exit code
if [ ${PIPESTATUS[0]} -eq 0 ]; then
  echo "✓ Production build completed successfully"
  BUILD_STATUS="PASS"
else
  echo "✗ Production build FAILED"
  BUILD_STATUS="FAIL"
fi
```

##### Step 3.5: Validate Build Artifacts
```bash
# Check critical directories
if [ -d .next/standalone ]; then
  echo "✓ .next/standalone exists"
  STANDALONE_CHECK="PASS"
else
  echo "✗ .next/standalone MISSING"
  STANDALONE_CHECK="FAIL"
fi

if [ -d .next/static ]; then
  echo "✓ .next/static exists"
  STATIC_CHECK="PASS"
else
  echo "✗ .next/static MISSING"
  STATIC_CHECK="FAIL"
fi

# Calculate sizes
BUILD_SIZE=$(du -sh .next | cut -f1)
NODE_MODULES_SIZE=$(du -sh node_modules | cut -f1)

echo "Build size: $BUILD_SIZE"
echo "node_modules size: $NODE_MODULES_SIZE"
```

##### Step 3.6: Test Server Start (Dry Run)
```bash
# Start server in background
PORT=3000 npm run start > test-server.log 2>&1 &
SERVER_PID=$!

# Wait for server to initialize
sleep 10

# Test HTTP request
if curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo "✓ Test server responding on port 3000"
  SERVER_TEST="PASS"
else
  echo "✗ Test server NOT responding"
  SERVER_TEST="FAIL"
fi

# Kill test server
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo "✓ Test server stopped"
```

##### Step 3.7: Generate Build Verification Report
```bash
cat > /root/meta-project-for-mvps/frontend-viewing-site/docs/build-reports/build-verification-{template-name}.md << EOF
# Build Verification Report: {template-name}

**Date:** $(date -u +%Y-%m-%dT%H:%M:%SZ)
**Template:** {template-name}
**Path:** frontend-viewing-site/{template-name}
**Agent:** {Agent ID}

---

## Build Results Summary

| Check | Status | Notes |
|-------|--------|-------|
| Dependencies Install | $INSTALL_STATUS | - |
| TypeScript Check | $TYPECHECK_STATUS | $TYPE_ERRORS errors found |
| Production Build | $BUILD_STATUS | - |
| Standalone Artifacts | $STANDALONE_CHECK | - |
| Static Artifacts | $STATIC_CHECK | - |
| Server Start Test | $SERVER_TEST | - |

---

## Build Metrics

- **Build Size:** $BUILD_SIZE
- **node_modules Size:** $NODE_MODULES_SIZE
- **Build Duration:** {X seconds} (capture from build-output.log)
- **TypeScript Errors:** $TYPE_ERRORS

---

## Build Output Summary

\`\`\`
$(tail -50 build-output.log)
\`\`\`

---

## TypeScript Issues (if any)

\`\`\`
$(head -20 typecheck-output.log)
\`\`\`

---

## Blocking Issues

$(if [ "$BUILD_STATUS" = "FAIL" ]; then echo "❌ BLOCKER: Build failed - cannot proceed to deployment"; else echo "✅ No blocking issues"; fi)

---

## Recommendations

- $(if [ "$TYPECHECK_STATUS" = "WARN" ]; then echo "Consider fixing TypeScript errors for production readiness"; else echo "TypeScript checks passing"; fi)
- $(if [ "$SERVER_TEST" = "FAIL" ]; then echo "❌ CRITICAL: Server start test failed - investigate before deployment"; else echo "✅ Server test passed"; fi)

---

## Next Steps

$(if [ "$BUILD_STATUS" = "PASS" ] && [ "$SERVER_TEST" = "PASS" ]; then echo "✅ Ready for PM2 deployment (Module 4)"; else echo "❌ Fix build/server issues before proceeding"; fi)

EOF

echo "✓ Build verification report created"
```

#### Verification Criteria (Per Template)
- [ ] `npm install` completed successfully (exit code 0)
- [ ] `npm run build` completed successfully (exit code 0)
- [ ] `.next/standalone/` directory exists
- [ ] `.next/static/` directory exists
- [ ] Test server responds to HTTP request on port 3000
- [ ] Build verification report created in `docs/build-reports/`
- [ ] No BLOCKER issues in report

#### Quality Gate: Module 3 Completion

**STOP if ANY template has BUILD_STATUS="FAIL" or SERVER_TEST="FAIL"**

Before proceeding to Module 4:
1. Review all 5 build verification reports
2. Ensure all reports show "Ready for PM2 deployment"
3. If any template failed, fix issues and re-run Module 3 for that template only

#### Outputs (Per Template)
- `frontend-viewing-site/docs/build-reports/build-verification-{template-name}.md` - Build verification report
- `frontend-viewing-site/{template-name}/.next/` - Production build artifacts
- `frontend-viewing-site/{template-name}/node_modules/` - Dependencies
- `frontend-viewing-site/{template-name}/build-output.log` - Full build logs
- `frontend-viewing-site/{template-name}/typecheck-output.log` - TypeScript check logs

#### Skill References
- Follow patterns from `phase-6-9-build-verification` skill
- Use `verification-before-completion` for evidence-based claims

---

### Module 4: PM2 Configuration and Deployment (30 min)
**Agent:** Single Opus agent
**Dependencies:** Module 3 complete (all 5 builds successful)
**Parallelizable:** No (shared PM2 configuration)

#### Purpose
Configure PM2 process manager and start all 5 Next.js production servers.

#### Tasks

##### Task 4.1: Create PM2 Ecosystem Configuration

File: `/root/meta-project-for-mvps/frontend-viewing-site/ecosystem.config.js`

```javascript
module.exports = {
  apps: [
    {
      name: 'analytics-template',
      cwd: '/root/meta-project-for-mvps/frontend-viewing-site/analytics-dashboard',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3011,
        NODE_ENV: 'production',
      },
      error_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/analytics-error.log',
      out_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/analytics-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
    {
      name: 'productivity-template',
      cwd: '/root/meta-project-for-mvps/frontend-viewing-site/productivity-tool',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3012,
        NODE_ENV: 'production',
      },
      error_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/productivity-error.log',
      out_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/productivity-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
    {
      name: 'content-template',
      cwd: '/root/meta-project-for-mvps/frontend-viewing-site/content-creator',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3013,
        NODE_ENV: 'production',
      },
      error_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/content-error.log',
      out_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/content-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
    {
      name: 'digital-template',
      cwd: '/root/meta-project-for-mvps/frontend-viewing-site/digital-download',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3014,
        NODE_ENV: 'production',
      },
      error_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/digital-error.log',
      out_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/digital-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
    {
      name: 'utility-template',
      cwd: '/root/meta-project-for-mvps/frontend-viewing-site/utility-processor',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3015,
        NODE_ENV: 'production',
      },
      error_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/utility-error.log',
      out_file: '/root/meta-project-for-mvps/frontend-viewing-site/logs/utility-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
  ],
}
```

##### Task 4.2: Validate Ecosystem Configuration
```bash
cd /root/meta-project-for-mvps/frontend-viewing-site

# Syntax check (Node.js will parse the file)
node -c ecosystem.config.js

if [ $? -eq 0 ]; then
  echo "✓ ecosystem.config.js syntax valid"
else
  echo "✗ ecosystem.config.js syntax ERROR"
  exit 1
fi

# Ensure PM2_HOME is set for subsequent commands
export PM2_HOME=/root/.pm2-template-gallery
```

##### Task 4.3: Start PM2 Processes (Dedicated Daemon)
```bash
cd /root/meta-project-for-mvps/frontend-viewing-site

# Use dedicated PM2 home directory for template gallery
export PM2_HOME=/root/.pm2-template-gallery

# Start all apps defined in ecosystem.config.js
pm2 start ecosystem.config.js

# Wait for processes to initialize
sleep 15

# Check status (will use dedicated daemon)
pm2 list
```

**IMPORTANT:** The `PM2_HOME=/root/.pm2-template-gallery` environment variable ensures all PM2 commands use the dedicated daemon for template gallery, isolated from default PM2 and SI Project's PM2 instance.

##### Task 4.4: Verify All Processes Running
```bash
# Use dedicated PM2 daemon
export PM2_HOME=/root/.pm2-template-gallery

# Get status of each process
pm2 jlist > pm2-status.json

# Parse and check
for app in analytics-template productivity-template content-template digital-template utility-template; do
  status=$(pm2 jlist | jq -r ".[] | select(.name==\"$app\") | .pm2_env.status")

  if [ "$status" = "online" ]; then
    echo "✓ $app: ONLINE"
  else
    echo "✗ $app: $status (expected: online)"
  fi
done
```

##### Task 4.5: Test Each Port Locally
```bash
for port in 3011 3012 3013 3014 3015; do
  echo "Testing port $port..."

  if curl -f -s http://localhost:$port > /dev/null; then
    response_time=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:$port)
    echo "✓ Port $port: responding (${response_time}s)"
  else
    echo "✗ Port $port: NOT responding"
  fi
done
```

##### Task 4.6: Save PM2 Configuration
```bash
# Use dedicated PM2 daemon
export PM2_HOME=/root/.pm2-template-gallery

# Save current PM2 process list
pm2 save

# Generate startup script (for auto-restart on server reboot)
pm2 startup

# Follow the instructions printed by pm2 startup
# (Will configure systemd to auto-start template gallery processes on reboot)
```

##### Task 4.7: Create PM2 Deployment Report
```bash
# Use dedicated PM2 daemon
export PM2_HOME=/root/.pm2-template-gallery

cat > /root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-reports/module-4-pm2-deployment.md << 'EOF'
# PM2 Deployment Report

**Date:** $(date -u +%Y-%m-%dT%H:%M:%SZ)
**Module:** Module 4 - PM2 Configuration and Deployment
**PM2 Daemon:** /root/.pm2-template-gallery (Dedicated instance for template gallery)

---

## PM2 Process Status

$(PM2_HOME=/root/.pm2-template-gallery pm2 list)

---

## Port Accessibility Test

| Port | Template | Status | Response Time |
|------|----------|--------|---------------|
| 3011 | analytics-dashboard | {status} | {time}s |
| 3012 | productivity-tool | {status} | {time}s |
| 3013 | content-creator | {status} | {time}s |
| 3014 | digital-download | {status} | {time}s |
| 3015 | utility-processor | {status} | {time}s |

---

## Configuration Files

- **PM2 Config:** `/root/meta-project-for-mvps/frontend-viewing-site/ecosystem.config.js`
- **Log Directory:** `/root/meta-project-for-mvps/frontend-viewing-site/logs/`

---

## PM2 Commands Reference

### Check Status
```bash
pm2 list
pm2 status
```

### View Logs
```bash
pm2 logs analytics-template
pm2 logs --lines 50
```

### Restart Processes
```bash
pm2 restart ecosystem.config.js
pm2 restart analytics-template  # Restart single app
```

### Stop Processes
```bash
pm2 stop ecosystem.config.js
pm2 delete ecosystem.config.js  # Remove from PM2
```

---

## Next Steps

✅ Ready for Caddy configuration (Module 5)

EOF

echo "✓ PM2 deployment report created"
```

#### Verification Criteria
- [ ] `ecosystem.config.js` created with 5 app configurations
- [ ] `ecosystem.config.js` syntax valid (node -c passes)
- [ ] `pm2 list` shows 5 processes with status "online"
- [ ] All ports (3011-3015) respond to HTTP requests
- [ ] Response times < 3 seconds for all ports
- [ ] PM2 configuration saved (`pm2 save` executed)
- [ ] Startup script configured (optional but recommended)
- [ ] Deployment report created

#### Quality Gate: Module 4 Completion

**STOP if any PM2 process shows status other than "online"**

Before proceeding to Module 5:
1. All 5 processes must be "online"
2. All 5 ports must respond to curl requests
3. Check logs for any startup errors: `pm2 logs --lines 100`

#### Troubleshooting

**Issue:** Process shows "errored" or "stopped"
**Solution:**
```bash
pm2 logs {app-name} --lines 50
pm2 describe {app-name}
# Fix issue (usually .env.local or port conflict)
pm2 restart {app-name}
```

**Issue:** Port not responding
**Solution:**
```bash
netstat -tlnp | grep {port}  # Check if port is actually bound
pm2 logs {app-name}  # Check for startup errors
```

#### Outputs
- `frontend-viewing-site/ecosystem.config.js` - PM2 configuration
- PM2 processes running (visible in `pm2 list`)
- `docs/deployment-reports/module-4-pm2-deployment.md` - Deployment report
- `frontend-viewing-site/logs/*.log` - Process logs

---

### Module 5: Caddy Configuration (20 min)
**Agent:** Single Opus agent
**Dependencies:** Module 4 complete (PM2 processes running)
**Parallelizable:** No (shared Caddyfile)

#### Purpose
Configure Caddy reverse proxy to route subdomains to PM2 processes with HTTPS.

#### Tasks

##### Task 5.1: Backup Existing Caddyfile
```bash
cd /root/n8n-docker-caddy/caddy_config

# Create timestamped backup
backup_file="Caddyfile.backup-$(date +%Y%m%d-%H%M%S)"
cp Caddyfile "$backup_file"

echo "✓ Backup created: $backup_file"
ls -lh Caddyfile*
```

##### Task 5.2: Add Template Subdomain Configurations

Append to `/root/n8n-docker-caddy/caddy_config/Caddyfile`:

```caddy
# ==============================================================================
# TEMPLATE GALLERY - SaaS Frontend Templates for Viewing
# ==============================================================================

# Analytics Dashboard Template
your-domain.com {
	# Reverse proxy to PM2 process on host
	reverse_proxy host.docker.internal:3011 {
		# Forward original headers
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_up X-Forwarded-Host {host}
	}

	# Security headers
	header {
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
}

# Productivity Tool Template
your-domain.com {
	reverse_proxy host.docker.internal:3012 {
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_up X-Forwarded-Host {host}
	}

	header {
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
}

# Content Creator Template
your-domain.com {
	reverse_proxy host.docker.internal:3013 {
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_up X-Forwarded-Host {host}
	}

	header {
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
}

# Digital Download Template
your-domain.com {
	reverse_proxy host.docker.internal:3014 {
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_up X-Forwarded-Host {host}
	}

	header {
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
}

# Utility Processor Template
your-domain.com {
	reverse_proxy host.docker.internal:3015 {
		header_up Host {host}
		header_up X-Real-IP {remote_host}
		header_up X-Forwarded-For {remote_host}
		header_up X-Forwarded-Proto {scheme}
		header_up X-Forwarded-Host {host}
	}

	header {
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		-Server
	}
}
```

**IMPORTANT:** Use `host.docker.internal` instead of `localhost` or `127.0.0.1` when proxying to host ports from inside a Docker container.

##### Task 5.3: Validate Caddyfile Syntax
```bash
# Validate configuration before applying
docker exec n8n-docker-caddy-caddy-1 caddy validate --config /etc/caddy/Caddyfile

if [ $? -eq 0 ]; then
  echo "✓ Caddyfile syntax VALID"
else
  echo "✗ Caddyfile syntax ERROR - check configuration"
  exit 1
fi
```

##### Task 5.4: Reload Caddy Configuration
```bash
# Reload Caddy to apply new configuration
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile

if [ $? -eq 0 ]; then
  echo "✓ Caddy configuration reloaded successfully"
else
  echo "✗ Caddy reload FAILED"
  exit 1
fi

# Wait for SSL provisioning
echo "Waiting 30 seconds for SSL certificate provisioning..."
sleep 30
```

##### Task 5.5: Test Subdomain Accessibility
```bash
# Test each subdomain via HTTPS
for subdomain in analytics productivity content digital utility; do
  echo "Testing $your-domain.com..."

  http_code=$(curl -o /dev/null -s -w '%{http_code}' https://$your-domain.com)
  response_time=$(curl -o /dev/null -s -w '%{time_total}' https://$your-domain.com)

  if [ "$http_code" = "200" ]; then
    echo "✓ $your-domain.com: HTTP $http_code (${response_time}s)"
  else
    echo "✗ $your-domain.com: HTTP $http_code (expected: 200)"
  fi
done
```

##### Task 5.6: Verify SSL Certificates
```bash
# Check SSL certificate for one subdomain (Caddy auto-provisions for all)
echo "Checking SSL certificate for your-domain.com..."

ssl_info=$(echo | openssl s_client -connect your-domain.com:443 -servername your-domain.com 2>/dev/null | openssl x509 -noout -dates)

echo "$ssl_info"

if echo "$ssl_info" | grep -q "notAfter"; then
  echo "✓ SSL certificate valid"
else
  echo "⚠️ SSL certificate may not be provisioned yet (can take 2-3 minutes)"
fi
```

##### Task 5.7: Create Caddy Configuration Report
```bash
cat > /root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-reports/module-5-caddy-configuration.md << 'EOF'
# Caddy Configuration Report

**Date:** $(date -u +%Y-%m-%dT%H:%M:%SZ)
**Module:** Module 5 - Caddy Reverse Proxy Configuration

---

## Subdomain Accessibility Test

| Subdomain | HTTP Status | Response Time | SSL Status |
|-----------|-------------|---------------|------------|
| your-domain.com | {code} | {time}s | ✓ Valid |
| your-domain.com | {code} | {time}s | ✓ Valid |
| your-domain.com | {code} | {time}s | ✓ Valid |
| your-domain.com | {code} | {time}s | ✓ Valid |
| your-domain.com | {code} | {time}s | ✓ Valid |

---

## Configuration Files

- **Caddyfile:** `/root/n8n-docker-caddy/caddy_config/Caddyfile`
- **Backup:** `/root/n8n-docker-caddy/caddy_config/Caddyfile.backup-{timestamp}`

---

## Caddy Management Commands

### View Caddy Logs
```bash
docker logs n8n-docker-caddy-caddy-1
docker logs n8n-docker-caddy-caddy-1 --tail 50 -f
```

### Validate Configuration
```bash
docker exec n8n-docker-caddy-caddy-1 caddy validate --config /etc/caddy/Caddyfile
```

### Reload Configuration
```bash
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

### Check SSL Certificates
```bash
# View all certificates
docker exec n8n-docker-caddy-caddy-1 caddy list-certificates
```

---

## Rollback Instructions

If needed, restore previous Caddyfile:

```bash
cd /root/n8n-docker-caddy/caddy_config
cp Caddyfile.backup-{timestamp} Caddyfile
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

---

## Next Steps

✅ Ready for verification and documentation (Module 6)

EOF

echo "✓ Caddy configuration report created"
```

#### Verification Criteria
- [ ] Caddyfile backup created with timestamp
- [ ] 5 subdomain blocks added to Caddyfile
- [ ] `caddy validate` passes without errors
- [ ] `caddy reload` succeeds
- [ ] All 5 subdomains return HTTP 200
- [ ] All response times < 3 seconds
- [ ] SSL certificates valid (check with browser or openssl)
- [ ] Configuration report created

#### Quality Gate: Module 5 Completion

**STOP if any subdomain returns HTTP status other than 200**

Before proceeding to Module 6:
1. All 5 subdomains must return HTTP 200
2. SSL certificates must be valid (green padlock in browser)
3. Test from external network (not just localhost)

#### Troubleshooting

**Issue:** 502 Bad Gateway
**Solution:**
```bash
# Check if PM2 process is running
pm2 list
# Check if port is actually bound
netstat -tlnp | grep {port}
# Check Caddy logs
docker logs n8n-docker-caddy-caddy-1 --tail 50
```

**Issue:** SSL certificate not provisioning
**Solution:**
```bash
# Check DNS resolution
dig {subdomain}your-domain.com
# Check Caddy logs for ACME errors
docker logs n8n-docker-caddy-caddy-1 | grep -i acme
# Wait 2-3 minutes for Let's Encrypt challenge
```

**Issue:** Connection refused
**Solution:**
```bash
# Verify reverse_proxy target is correct
# Should be: host.docker.internal:PORT
# NOT: localhost:PORT or 127.0.0.1:PORT
```

#### Outputs
- Updated `/root/n8n-docker-caddy/caddy_config/Caddyfile`
- Backup: `/root/n8n-docker-caddy/caddy_config/Caddyfile.backup-{timestamp}`
- `docs/deployment-reports/module-5-caddy-configuration.md` - Configuration report

---

### Module 6: Verification and Documentation (30 min)
**Agent:** Single Opus agent
**Dependencies:** Module 5 complete (Caddy configured)
**Parallelizable:** No (final verification)

#### Purpose
Comprehensive end-to-end verification and create final documentation for maintenance and usage.

#### Tasks

##### Task 6.1: Create Comprehensive Verification Script

File: `/root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification.sh`

```bash
#!/bin/bash

# ============================================================================
# Template Gallery Deployment Verification Script
# ============================================================================

echo "================================================================"
echo "Template Gallery Deployment Verification"
echo "Date: $(date)"
echo "================================================================"
echo ""

# Template configuration
declare -A templates=(
  ["analytics"]="your-domain.com:3011:Analytics Dashboard"
  ["productivity"]="your-domain.com:3012:Productivity Tool"
  ["content"]="your-domain.com:3013:Content Creator"
  ["digital"]="your-domain.com:3014:Digital Download"
  ["utility"]="your-domain.com:3015:Utility Processor"
)

# Counters
PASS_COUNT=0
FAIL_COUNT=0

# Test each template
for key in "${!templates[@]}"; do
  IFS=':' read -r url port name <<< "${templates[$key]}"

  echo "────────────────────────────────────────────────────────────────"
  echo "Testing: $name"
  echo "URL: https://$url"
  echo "Port: $port"
  echo "────────────────────────────────────────────────────────────────"

  # Test 1: Local port accessibility
  if curl -f -s http://localhost:$port > /dev/null 2>&1; then
    echo "✓ Local port $port responding"
  else
    echo "✗ Local port $port NOT responding"
    ((FAIL_COUNT++))
  fi

  # Test 2: HTTPS subdomain accessibility
  http_code=$(curl -o /dev/null -s -w '%{http_code}' https://$url)
  if [ "$http_code" = "200" ]; then
    echo "✓ HTTPS $url accessible (HTTP $http_code)"
    ((PASS_COUNT++))
  else
    echo "✗ HTTPS $url returned HTTP $http_code (expected 200)"
    ((FAIL_COUNT++))
  fi

  # Test 3: Response time
  response_time=$(curl -o /dev/null -s -w '%{time_total}' https://$url)
  echo "→ Response time: ${response_time}s"

  # Test 4: SSL certificate check
  ssl_check=$(echo | openssl s_client -connect $url:443 -servername $url 2>/dev/null | grep "Verify return code: 0")
  if [ -n "$ssl_check" ]; then
    echo "✓ SSL certificate valid"
  else
    echo "⚠️ SSL certificate validation warning"
  fi

  # Test 5: Check for demo mode indicator (page contains specific content)
  page_content=$(curl -s https://$url)
  if echo "$page_content" | grep -q "<!DOCTYPE html>"; then
    echo "✓ HTML content returned"
  else
    echo "✗ Invalid HTML response"
    ((FAIL_COUNT++))
  fi

  echo ""
done

echo "================================================================"
echo "PM2 Process Status"
echo "================================================================"
pm2 list
echo ""

echo "================================================================"
echo "Disk Usage"
echo "================================================================"
du -sh /root/meta-project-for-mvps/frontend-viewing-site/*
echo ""
echo "Total: $(du -sh /root/meta-project-for-mvps/frontend-viewing-site | cut -f1)"
echo ""

echo "================================================================"
echo "Verification Summary"
echo "================================================================"
echo "Tests Passed: $PASS_COUNT"
echo "Tests Failed: $FAIL_COUNT"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
  echo "✅ ALL TESTS PASSED - Deployment successful!"
  exit 0
else
  echo "⚠️ SOME TESTS FAILED - Review errors above"
  exit 1
fi
```

##### Task 6.2: Execute Verification Script
```bash
chmod +x /root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification.sh
/root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification.sh | tee /root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification-output.txt

echo "✓ Verification script executed"
```

##### Task 6.3: Create Screenshot Capture Guide

File: `/root/meta-project-for-mvps/frontend-viewing-site/docs/screenshot-capture-guide.md`

```markdown
# Screenshot Capture Guide for Template Gallery

## Purpose
This guide provides URLs and best practices for capturing marketing screenshots of the 5 deployed SaaS templates.

---

## Template URLs for Screenshots

| Template | Landing Page URL | Dashboard URL (Demo Mode) |
|----------|------------------|---------------------------|
| **Analytics Dashboard** | https://your-domain.com | https://your-domain.com/dashboard |
| **Productivity Tool** | https://your-domain.com | https://your-domain.com/dashboard |
| **Content Creator** | https://your-domain.com | https://your-domain.com/dashboard |
| **Digital Download** | https://your-domain.com | https://your-domain.com/dashboard |
| **Utility Processor** | https://your-domain.com | https://your-domain.com/dashboard |

---

## Recommended Screenshot Dimensions

### Desktop Views
- **Full Page:** 1920x1080 (16:9 standard)
- **Ultrawide:** 2560x1440 (for hero sections)
- **MacBook Pro:** 2880x1800 (Retina display)

### Tablet Views
- **iPad Pro:** 2048x2732 (portrait)
- **iPad:** 1536x2048 (portrait)
- **Generic Tablet:** 768x1024

### Mobile Views
- **iPhone Pro Max:** 1284x2778
- **iPhone Standard:** 1170x2532
- **Generic Mobile:** 375x812

---

## Browser Recommendations

### For Best Quality
1. **Chrome** (latest) - Best DevTools, reliable rendering
2. **Firefox** (latest) - Good color accuracy
3. **Safari** (macOS) - Native macOS rendering

### DevTools Setup
```
F12 → Toggle Device Toolbar (Ctrl/Cmd + Shift + M)
→ Select device preset or custom dimensions
→ Disable cache (Network tab)
→ Set DPR to 2x or 3x for Retina screenshots
```

---

## Automated Screenshot Capture (Optional)

### Using Playwright

```bash
npm install -g playwright
npx playwright install chromium

# Create screenshot script
cat > capture-screenshots.js << 'EOF'
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const templates = [
    { name: 'analytics', url: 'https://your-domain.com' },
    { name: 'productivity', url: 'https://your-domain.com' },
    { name: 'content', url: 'https://your-domain.com' },
    { name: 'digital', url: 'https://your-domain.com' },
    { name: 'utility', url: 'https://your-domain.com' },
  ];

  for (const template of templates) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(template.url);
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `screenshots/${template.name}-landing.png`,
      fullPage: true
    });

    console.log(`✓ Captured ${template.name} landing page`);
  }

  await browser.close();
})();
EOF

# Run screenshot capture
node capture-screenshots.js
```

---

## Key Elements to Capture

### Landing Page Screenshots
- [ ] Hero section with headline and CTA
- [ ] Feature cards/grid section
- [ ] Pricing table (if visible)
- [ ] Footer with navigation
- [ ] Mobile responsive views

### Dashboard Screenshots (Demo Mode)
- [ ] Main dashboard overview
- [ ] Navigation sidebar
- [ ] Data visualization components
- [ ] Settings page (if accessible)
- [ ] Responsive tablet/mobile views

---

## Screenshot Post-Processing Tips

1. **Crop strategically** - Focus on key UI elements
2. **Add subtle shadows** - Helps screenshots "pop" in marketing materials
3. **Maintain consistent aspect ratio** - Use 16:9 for consistency
4. **Optimize file size** - Use tools like TinyPNG or ImageOptim
5. **Add browser chrome** - Use tools like Screely or Browserframe for mockups

---

## Storage Recommendations

Create a dedicated screenshots directory:

```bash
mkdir -p /root/meta-project-for-mvps/frontend-viewing-site/docs/screenshots/{analytics,productivity,content,digital,utility}
```

Naming convention:
- `{template}-landing-desktop.png`
- `{template}-landing-mobile.png`
- `{template}-dashboard-desktop.png`
- `{template}-dashboard-mobile.png`

---

## Testing Checklist Before Screenshots

- [ ] All pages load without console errors (F12 → Console)
- [ ] No broken images or 404 errors
- [ ] Typography renders correctly (no font loading issues)
- [ ] Colors match brand guidelines
- [ ] Responsive breakpoints work correctly
- [ ] Animations/transitions complete before capturing

---

## Demo Mode Notes

All templates are running in **Demo Mode** (`NEXT_PUBLIC_DEMO_MODE=true`), which means:
- ✅ Dashboard pages accessible without login
- ✅ Demo data displayed (not real user data)
- ⚠️ Some interactive features may not work (Stripe billing, Supabase features)
- ⚠️ Form submissions may not persist (no backend database)

For marketing screenshots, this is perfect - shows UI without needing real data.
```

##### Task 6.4: Create Master Deployment Documentation

File: `/root/meta-project-for-mvps/frontend-viewing-site/docs/template-gallery-deployment.md`

```markdown
# Template Gallery Deployment Documentation

**Status:** ✅ Deployed
**Deployment Date:** {DATE}
**Environment:** Production (your-domain.com)

---

## Overview

5 production-ready SaaS frontend templates deployed to dedicated subdomains for viewing and marketing screenshot capture. Templates run in **Demo Mode** to enable full dashboard access without authentication infrastructure.

---

## Deployed Templates

| # | Template | URL | Port | PM2 Name | Status |
|---|----------|-----|------|----------|--------|
| 1 | Analytics Dashboard | https://your-domain.com | 3011 | analytics-template | ✅ Online |
| 2 | Productivity Tool | https://your-domain.com | 3012 | productivity-template | ✅ Online |
| 3 | Content Creator | https://your-domain.com | 3013 | content-template | ✅ Online |
| 4 | Digital Download | https://your-domain.com | 3014 | digital-template | ✅ Online |
| 5 | Utility Processor | https://your-domain.com | 3015 | utility-template | ✅ Online |

---

## Architecture

```
User Request (HTTPS)
    ↓
Caddy Reverse Proxy (Docker)
    ↓
PM2 Process Manager (Host)
    ↓
Next.js Production Server (Demo Mode)
```

### Technology Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript 5
- **Styling:** Tailwind CSS 3
- **Process Manager:** PM2
- **Reverse Proxy:** Caddy 2 (Docker container)
- **SSL:** Let's Encrypt (auto-provisioned by Caddy)

---

## Demo Mode Configuration

All templates run with `NEXT_PUBLIC_DEMO_MODE=true`, which:
- Bypasses Supabase authentication checks
- Injects demo user context for dashboard pages
- Allows viewing full application without infrastructure setup

**Environment:** Each template has `.env.local` with demo configuration

---

## Management Commands

### PM2 Daemon Management (Dedicated Instance)

**IMPORTANT:** All PM2 commands must use the dedicated daemon:

```bash
# Set environment variable before running any PM2 commands
export PM2_HOME=/root/.pm2-template-gallery

# Or use it inline:
PM2_HOME=/root/.pm2-template-gallery pm2 list
```

**Why:** This ensures template gallery processes are managed in a separate PM2 instance (`/root/.pm2-template-gallery`) isolated from:
- Default PM2 (`/root/.pm2`)
- SI Project PM2 (`/root/.pm2-si-project`)

### Check Status
```bash
# View all running processes (in dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 list

# Check specific template
PM2_HOME=/root/.pm2-template-gallery pm2 describe analytics-template

# View resource usage
PM2_HOME=/root/.pm2-template-gallery pm2 monit
```

### View Logs
```bash
# Tail all logs (in dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 logs

# Tail specific template
PM2_HOME=/root/.pm2-template-gallery pm2 logs analytics-template

# View last 50 lines
PM2_HOME=/root/.pm2-template-gallery pm2 logs --lines 50

# Direct log files
tail -f /root/meta-project-for-mvps/frontend-viewing-site/logs/analytics-out.log
tail -f /root/meta-project-for-mvps/frontend-viewing-site/logs/analytics-error.log
```

### Restart Templates
```bash
# Restart all templates (in dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 restart ecosystem.config.js

# Restart specific template
PM2_HOME=/root/.pm2-template-gallery pm2 restart analytics-template

# Restart with zero-downtime reload
PM2_HOME=/root/.pm2-template-gallery pm2 reload analytics-template
```

### Stop Templates
```bash
# Stop all (in dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 stop ecosystem.config.js

# Stop specific template
PM2_HOME=/root/.pm2-template-gallery pm2 stop analytics-template

# Stop and remove from PM2
PM2_HOME=/root/.pm2-template-gallery pm2 delete analytics-template
```

### Update a Template
```bash
# Navigate to template
cd /root/meta-project-for-mvps/frontend-viewing-site/analytics-dashboard

# Pull changes (if using git for viewing-site)
git pull

# Reinstall dependencies (if package.json changed)
npm install

# Rebuild
npm run build

# Restart PM2 process (in dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 restart analytics-template

# Verify
curl -f https://your-domain.com
```

---

## Caddy Management

### View Caddy Logs
```bash
docker logs n8n-docker-caddy-caddy-1
docker logs n8n-docker-caddy-caddy-1 --tail 50 -f
```

### Reload Caddy Configuration
```bash
# After editing Caddyfile
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

### Validate Caddyfile
```bash
docker exec n8n-docker-caddy-caddy-1 caddy validate --config /etc/caddy/Caddyfile
```

### Check SSL Certificates
```bash
# View active certificates
docker exec n8n-docker-caddy-caddy-1 caddy list-certificates

# Check specific domain
echo | openssl s_client -connect your-domain.com:443 -servername your-domain.com 2>/dev/null | openssl x509 -noout -dates
```

---

## Troubleshooting

### Template Not Loading (502 Bad Gateway)

**Symptom:** Browser shows "502 Bad Gateway"

**Diagnosis:**
```bash
# Check if PM2 process is running
pm2 list

# Check if port is bound
netstat -tlnp | grep {port}

# Check PM2 logs
pm2 logs {template-name} --lines 50
```

**Solutions:**
1. Restart PM2 process: `pm2 restart {template-name}`
2. Check .env.local exists and has correct values
3. Verify build artifacts exist: `ls -la .next/standalone`

---

### Slow Response Times

**Symptom:** Pages load slowly (>3 seconds)

**Diagnosis:**
```bash
# Check server resource usage
pm2 monit
top

# Test response time
curl -o /dev/null -s -w 'Total: %{time_total}s\n' https://your-domain.com
```

**Solutions:**
1. Restart PM2 process to clear memory leaks
2. Check server CPU/memory usage
3. Rebuild template: `npm run build && pm2 restart {template-name}`

---

### SSL Certificate Issues

**Symptom:** Browser shows "Not Secure" or certificate warning

**Diagnosis:**
```bash
# Check Caddy logs for ACME errors
docker logs n8n-docker-caddy-caddy-1 | grep -i acme

# Verify DNS resolution
dig your-domain.com +short
```

**Solutions:**
1. Wait 2-3 minutes for Let's Encrypt certificate provisioning
2. Reload Caddy: `docker exec n8n-docker-caddy-caddy-1 caddy reload`
3. Verify DNS points to server IP

---

### Dashboard Pages Redirect to Login (Demo Mode Not Working)

**Symptom:** Visiting `/dashboard` redirects to `/login` instead of showing demo dashboard

**Diagnosis:**
```bash
# Check .env.local for demo mode flag
cat /root/meta-project-for-mvps/frontend-viewing-site/{template}/.env.local | grep DEMO_MODE

# Check middleware modifications
grep -n "isDemoMode" /root/meta-project-for-mvps/frontend-viewing-site/{template}/lib/supabase/middleware.ts
```

**Solutions:**
1. Verify `.env.local` has `NEXT_PUBLIC_DEMO_MODE=true`
2. Verify `lib/demo-mode.ts` file exists
3. Rebuild and restart: `npm run build && pm2 restart {template-name}`

---

## File Locations

| Resource | Path |
|----------|------|
| Template Source (Read-Only) | `/root/meta-project-for-mvps/templates/{template}/frontend/` |
| Deployed Templates | `/root/meta-project-for-mvps/frontend-viewing-site/{template}/` |
| PM2 Configuration | `/root/meta-project-for-mvps/frontend-viewing-site/ecosystem.config.js` |
| PM2 Logs | `/root/meta-project-for-mvps/frontend-viewing-site/logs/` |
| **PM2 Daemon (Dedicated)** | **`/root/.pm2-template-gallery`** (isolated from other PM2 instances) |
| Caddyfile | `/root/n8n-docker-caddy/caddy_config/Caddyfile` |
| Caddyfile Backups | `/root/n8n-docker-caddy/caddy_config/Caddyfile.backup-*` |
| Build Reports | `/root/meta-project-for-mvps/frontend-viewing-site/docs/build-reports/` |
| Deployment Reports | `/root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-reports/` |

---

## Rollback Plan

### Full Rollback (Remove All Templates)

```bash
# Step 1: Stop all PM2 processes
pm2 stop ecosystem.config.js
pm2 delete ecosystem.config.js

# Step 2: Restore Caddyfile
cd /root/n8n-docker-caddy/caddy_config
cp Caddyfile.backup-{timestamp} Caddyfile
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile

# Step 3: Clean deployment directory
rm -rf /root/meta-project-for-mvps/frontend-viewing-site/*

# Step 4: Verify
pm2 list  # Should show no template processes
curl https://your-domain.com  # Should fail (expected)
```

### Partial Rollback (Remove Single Template)

```bash
# Stop specific template
pm2 delete {template-name}

# Remove from Caddyfile (edit manually or restore backup)
nano /root/n8n-docker-caddy/caddy_config/Caddyfile
# Comment out or remove the template's block

# Reload Caddy
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

---

## Security Considerations

### Demo Mode Security
- ⚠️ Templates bypass authentication - **NOT suitable for production use**
- ⚠️ Demo data is static - no real user data or persistence
- ✅ Appropriate for viewing/screenshots only
- ✅ Original templates at `/templates/` remain pristine

### Production Deployment (Future)
For production deployment of templates:
1. Remove `NEXT_PUBLIC_DEMO_MODE=true`
2. Configure real Supabase project credentials
3. Set up Google OAuth credentials
4. Configure Stripe keys
5. Run database migrations
6. Enable RLS policies
7. Review `mvp-security-review` skill

---

## Maintenance Schedule

### Daily
- Monitor PM2 process status: `pm2 list`
- Check for errors in logs: `pm2 logs --lines 20`

### Weekly
- Review disk usage: `du -sh /root/meta-project-for-mvps/frontend-viewing-site`
- Restart processes to clear memory: `pm2 restart ecosystem.config.js`

### Monthly
- Update Node.js dependencies (if needed)
- Review Caddy logs for anomalies
- Backup Caddyfile: `cp Caddyfile Caddyfile.backup-$(date +%Y%m%d)`

---

## Resources

- **Template Source:** https://github.com/valtterimelkko/meta-project-for-mvps
- **PM2 Documentation:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Caddy Documentation:** https://caddyserver.com/docs/
- **Next.js Production:** https://nextjs.org/docs/deployment

---

## Deployment Timeline

- **Module 0:** Pre-flight validation (10 min)
- **Module 1:** Environment preparation (20 min)
- **Module 2:** Demo mode implementation (45 min)
- **Module 3:** Build and validation (60 min, parallelized)
- **Module 4:** PM2 deployment (30 min)
- **Module 5:** Caddy configuration (20 min)
- **Module 6:** Verification and documentation (30 min)

**Total Time:** ~3.5 hours with parallel builds

---

## Next Steps

- [ ] Capture marketing screenshots (see `screenshot-capture-guide.md`)
- [ ] Share URLs with stakeholders
- [ ] Set up monitoring (optional: PM2 Plus, UptimeRobot)
- [ ] Consider adding analytics (optional: Google Analytics, Plausible)

---

*Last Updated: {DATE}*
```

##### Task 6.5: Execute Final Verification
```bash
# Run verification script
/root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification.sh

# Capture exit code
VERIFICATION_EXIT_CODE=$?

if [ $VERIFICATION_EXIT_CODE -eq 0 ]; then
  echo "✅ DEPLOYMENT VERIFICATION PASSED"
else
  echo "⚠️ DEPLOYMENT VERIFICATION FAILED - Review errors"
fi
```

##### Task 6.6: Create Rollback Documentation

File: `/root/meta-project-for-mvps/frontend-viewing-site/docs/rollback-procedures.md`

```markdown
# Rollback Procedures

## Overview
This document provides step-by-step rollback procedures for the Template Gallery deployment.

---

## Scenario 1: Full Rollback (Remove All Templates)

**Use When:** Complete deployment failure or need to start over

### Steps

1. **Stop all PM2 processes**
   ```bash
   cd /root/meta-project-for-mvps/frontend-viewing-site
   pm2 stop ecosystem.config.js
   pm2 delete ecosystem.config.js
   pm2 save
   ```

2. **Restore Caddyfile**
   ```bash
   cd /root/n8n-docker-caddy/caddy_config

   # List available backups
   ls -lt Caddyfile.backup-*

   # Restore most recent backup
   cp Caddyfile.backup-{timestamp} Caddyfile

   # Reload Caddy
   docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
   ```

3. **Clean deployment directory**
   ```bash
   cd /root/meta-project-for-mvps/frontend-viewing-site

   # Remove all template builds (WARNING: Destructive!)
   rm -rf analytics-dashboard productivity-tool content-creator digital-download utility-processor
   rm -rf logs ecosystem.config.js
   ```

4. **Verify rollback**
   ```bash
   # Should show no template processes
   pm2 list

   # Should fail (expected)
   curl https://your-domain.com
   ```

### Post-Rollback
- Original templates at `/root/meta-project-for-mvps/templates/` remain intact
- Can re-run deployment modules from scratch

---

## Scenario 2: Partial Rollback (Remove Single Template)

**Use When:** One template is problematic, others work fine

### Steps

1. **Identify problematic template**
   ```bash
   pm2 list
   pm2 logs {template-name} --lines 50
   ```

2. **Stop and remove from PM2**
   ```bash
   pm2 stop {template-name}
   pm2 delete {template-name}
   pm2 save
   ```

3. **Edit Caddyfile**
   ```bash
   cd /root/n8n-docker-caddy/caddy_config

   # Backup first
   cp Caddyfile Caddyfile.backup-$(date +%Y%m%d-%H%M%S)

   # Edit and comment out template block
   nano Caddyfile
   # Find the template's subdomain block and comment out (or delete)
   ```

4. **Reload Caddy**
   ```bash
   docker exec n8n-docker-caddy-caddy-1 caddy validate --config /etc/caddy/Caddyfile
   docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
   ```

5. **Optionally remove template files**
   ```bash
   cd /root/meta-project-for-mvps/frontend-viewing-site
   rm -rf {template-name}
   ```

---

## Scenario 3: Rollback Caddy Only (Keep PM2 Processes)

**Use When:** Caddy configuration is problematic but PM2 processes are fine

### Steps

1. **Restore Caddyfile**
   ```bash
   cd /root/n8n-docker-caddy/caddy_config
   cp Caddyfile.backup-{timestamp} Caddyfile
   ```

2. **Validate and reload**
   ```bash
   docker exec n8n-docker-caddy-caddy-1 caddy validate --config /etc/caddy/Caddyfile
   docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
   ```

3. **Verify**
   ```bash
   # Should succeed via localhost
   curl http://localhost:3011

   # May fail via subdomain (expected if Caddy config removed)
   curl https://your-domain.com
   ```

---

## Scenario 4: Rebuild Single Template

**Use When:** Template code is corrupted but others are fine

### Steps

1. **Stop template process**
   ```bash
   pm2 stop {template-name}
   ```

2. **Clean and re-copy from source**
   ```bash
   cd /root/meta-project-for-mvps/frontend-viewing-site

   # Remove corrupted copy
   rm -rf {template-name}

   # Re-copy from original
   cp -r /root/meta-project-for-mvps/templates/{template}/frontend/* {template-name}/
   ```

3. **Re-apply demo mode modifications**
   ```bash
   # Follow Module 2 steps for this template only:
   # - Create lib/demo-mode.ts
   # - Modify lib/supabase/middleware.ts
   # - Modify app/(dashboard)/layout.tsx
   # - Create .env.local
   ```

4. **Rebuild**
   ```bash
   cd {template-name}
   rm -rf node_modules .next
   npm install
   npm run build
   ```

5. **Restart PM2**
   ```bash
   pm2 restart {template-name}
   ```

---

## Recovery Verification

After any rollback, run these checks:

```bash
# Check PM2 status
pm2 list

# Check ports
for port in 3011 3012 3013 3014 3015; do
  netstat -tlnp | grep :$port
done

# Check subdomains
for subdomain in analytics productivity content digital utility; do
  curl -I https://$your-domain.com
done
```

---

## Backup Before Rollback

**CRITICAL:** Always backup before destructive operations:

```bash
# Backup PM2 configuration
pm2 save
cp ~/.pm2/dump.pm2 ~/.pm2/dump.pm2.backup-$(date +%Y%m%d-%H%M%S)

# Backup Caddyfile
cp /root/n8n-docker-caddy/caddy_config/Caddyfile /root/n8n-docker-caddy/caddy_config/Caddyfile.backup-$(date +%Y%m%d-%H%M%S)

# Backup deployment directory (optional, large)
tar -czf /root/frontend-viewing-site-backup-$(date +%Y%m%d-%H%M%S).tar.gz /root/meta-project-for-mvps/frontend-viewing-site/
```

---

## Emergency Contacts

If rollback fails or you're unsure:
1. Review deployment documentation
2. Check logs: `pm2 logs`, `docker logs n8n-docker-caddy-caddy-1`
3. Escalate to senior developer/DevOps

---

*Keep this document accessible during maintenance operations.*
```

#### Verification Criteria
- [ ] `deployment-verification.sh` created and executable
- [ ] Verification script executed successfully (exit code 0)
- [ ] All 5 subdomains pass HTTP 200 test
- [ ] All response times < 3 seconds
- [ ] SSL certificates valid
- [ ] PM2 shows all processes "online"
- [ ] Screenshot capture guide created
- [ ] Master deployment documentation created
- [ ] Rollback procedures documented

#### Quality Gate: Module 6 Completion

**CRITICAL:** If verification script fails (exit code 1), STOP and investigate before marking deployment complete.

#### Outputs
- `docs/deployment-verification.sh` - Automated verification script
- `docs/deployment-verification-output.txt` - Verification results
- `docs/screenshot-capture-guide.md` - Screenshot guide
- `docs/template-gallery-deployment.md` - Master documentation
- `docs/rollback-procedures.md` - Rollback guide

---

## Critical Files Reference

| File | Purpose | Created In |
|------|---------|------------|
| `/root/meta-project-for-mvps/frontend-viewing-site/ecosystem.config.js` | PM2 configuration | Module 4 |
| `/root/meta-project-for-mvps/frontend-viewing-site/{template}/.env.local` | Demo mode config | Module 2 |
| `/root/meta-project-for-mvps/frontend-viewing-site/{template}/lib/demo-mode.ts` | Demo mode utility | Module 2 |
| `/root/n8n-docker-caddy/caddy_config/Caddyfile` | Caddy proxy config | Module 5 |
| `/root/meta-project-for-mvps/frontend-viewing-site/docs/template-gallery-deployment.md` | Master docs | Module 6 |

---

## Skill References for Execution

| Module | Skills to Reference |
|--------|---------------------|
| Module 0 | `verification-before-completion` (pre-flight checks) |
| Module 2 | None (custom implementation) |
| Module 3 | `phase-6-9-build-verification`, `template-validator`, `verification-before-completion` |
| Module 4 | `verification-before-completion` (PM2 process validation) |
| Module 5 | None (standard Caddy configuration) |
| Module 6 | `verification-before-completion`, `consistency-quality-check` |

**Post-Deployment:**
- `template-personalizer` - For brand customization
- `mvp-security-review` - For security audit
- `template-scaffolding` - For adding new templates

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Build failures due to TypeScript errors | Medium | High | Module 3 has retry mechanism, fallback to skipLibCheck |
| Port conflicts (3011-3015 in use) | Low | Medium | Module 0 pre-flight checks ports, adjust if needed |
| Caddy configuration syntax error | Low | High | Module 5 validates before reload, maintains backup |
| Demo mode breaks builds | Medium | High | Module 2 includes TypeScript validation, Module 3 catches build errors |
| SSL certificate delay | Low | Low | Module 5 waits 30s, certificates provision automatically |
| PM2 process crashes on startup | Medium | Medium | Module 4 includes health checks, logs capture startup errors |
| Insufficient disk space | Low | Medium | Module 0 checks disk space (need ~5GB free) |

---

## Success Metrics

### Quantitative
- **Deployment Success Rate:** 5/5 templates deployed (100%)
- **Average Build Time:** < 5 minutes per template
- **Average Response Time:** < 2 seconds per subdomain
- **Uptime Target:** 99%+ after 24 hours
- **Total Deployment Time:** < 4 hours (target: 3-3.5 hours)

### Qualitative
- [ ] All landing pages visually complete without errors
- [ ] Dashboard pages accessible in demo mode
- [ ] No console errors on landing/dashboard pages
- [ ] Screenshots suitable for marketing use
- [ ] Documentation complete and accurate
- [ ] Rollback procedures tested (conceptually)

---

## Post-Deployment Checklist

After Module 6 completes:

- [ ] Test all 5 URLs from external network (not localhost)
- [ ] Verify SSL certificates show valid (browser padlock)
- [ ] Test responsive design on mobile device
- [ ] Open browser DevTools console - verify zero errors
- [ ] Capture marketing screenshots of all templates
- [ ] Test dashboard pages load in demo mode without login
- [ ] Document any known limitations or issues
- [ ] Share access URLs with stakeholders
- [ ] Set up monitoring (optional: UptimeRobot, PM2 Plus)
- [ ] Create git commit documenting deployment
- [ ] Update project README with gallery links

---

## Appendix: Environment Variables Reference

**Required for all templates:**

```bash
# Demo Mode (CRITICAL)
NEXT_PUBLIC_DEMO_MODE=true

# App Configuration
NEXT_PUBLIC_APP_URL=https://{subdomain}your-domain.com
NEXT_PUBLIC_APP_NAME={Display Name}

# Supabase (Dummy - Not Functional)
NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.DEMO_KEY_NOT_FUNCTIONAL
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.DEMO_SERVICE_ROLE_KEY_NOT_FUNCTIONAL

# Stripe (Dummy - Not Functional)
STRIPE_SECRET_KEY=sk_test_demo_not_functional
STRIPE_WEBHOOK_SECRET=whsec_demo_not_functional
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_demo_not_functional
```

**Template-Specific Replacements:**

| Template | {subdomain} | {Display Name} |
|----------|-------------|----------------|
| analytics-dashboard | analytics | Analytics Dashboard |
| productivity-tool | productivity | Productivity Tool |
| content-creator | content | Content Creator |
| digital-download | digital | Digital Download |
| utility-processor | utility | Utility Processor |

---

## Appendix: Quick Commands

```bash
# Check all templates status (dedicated PM2 daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 list

# Restart all templates
PM2_HOME=/root/.pm2-template-gallery pm2 restart ecosystem.config.js

# View logs for specific template
PM2_HOME=/root/.pm2-template-gallery pm2 logs analytics-template

# Test all URLs
for subdomain in analytics productivity content digital utility; do
  curl -I https://$your-domain.com
done

# Check Caddy status
docker ps | grep caddy

# Reload Caddy
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile

# Monitor resources (dedicated daemon)
PM2_HOME=/root/.pm2-template-gallery pm2 monit

# Run verification
/root/meta-project-for-mvps/frontend-viewing-site/docs/deployment-verification.sh

# Check all PM2 instances on system
ps aux | grep "PM2 v" | grep -v grep
```

---

**END OF PRD**

---

## Implementation Notes

This PRD is designed for modular execution:
- **Sequential Modules:** 0 → 1 → 2 → 4 → 5 → 6
- **Parallel Opportunity:** Module 3 can be split across 5 agents
- **Total Time:** 3-4 hours with parallelization
- **Skills Referenced:** See "Skill References for Execution" section above

Each module has clear:
- Inputs (dependencies)
- Tasks (step-by-step instructions)
- Verification criteria (quality gates)
- Outputs (deliverables)

Agents can execute modules independently as long as dependencies are met.
