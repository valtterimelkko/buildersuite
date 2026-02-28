# Template Gallery Deployment Documentation

**Status:** ✅ Deployed
**Deployment Date:** 2026-02-05
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

*Last Updated: 2026-02-05*
