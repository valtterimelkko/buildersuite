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
   export PM2_HOME=/root/.pm2-template-gallery
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
   export PM2_HOME=/root/.pm2-template-gallery
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
   export PM2_HOME=/root/.pm2-template-gallery
   pm2 list
   pm2 logs {template-name} --lines 50
   ```

2. **Stop and remove from PM2**
   ```bash
   export PM2_HOME=/root/.pm2-template-gallery
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
   export PM2_HOME=/root/.pm2-template-gallery
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
   export PM2_HOME=/root/.pm2-template-gallery
   pm2 restart {template-name}
   ```

---

## Recovery Verification

After any rollback, run these checks:

```bash
# Check PM2 status
export PM2_HOME=/root/.pm2-template-gallery
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
export PM2_HOME=/root/.pm2-template-gallery
pm2 save
cp /root/.pm2-template-gallery/dump.pm2 /root/.pm2-template-gallery/dump.pm2.backup-$(date +%Y%m%d-%H%M%S)

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
