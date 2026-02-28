# Caddy Configuration Report

**Date:** 2026-02-05T17:02:00Z
**Module:** Module 5 - Caddy Reverse Proxy Configuration

---

## Subdomain Accessibility Test

| Subdomain | HTTP Status | Response Time | SSL Status |
|-----------|-------------|---------------|------------|
| your-domain.com | 200 | 0.037s | ✓ Valid (TLSv1.3) |
| your-domain.com | 200 | 0.122s | ✓ Valid (TLSv1.3) |
| your-domain.com | 200 | 0.076s | ✓ Valid (TLSv1.3) |
| your-domain.com | 200 | 0.114s | ✓ Valid (TLSv1.3) |
| your-domain.com | 200 | 0.076s | ✓ Valid (TLSv1.3) |

---

## Configuration Files

- **Caddyfile:** `/root/n8n-docker-caddy/caddy_config/Caddyfile`
- **Backup:** `/root/n8n-docker-caddy/caddy_config/Caddyfile.backup-20260205-164202`

---

## Challenges & Solutions

### Challenge 1: Firewall Blocking Docker Container Access
**Problem:** Caddy container (running in Docker) could not connect to host ports 3011-3015, resulting in HTTP 502 errors.

**Root Cause:** UFW firewall only allowed specific ports, and ports 3011-3015 were not in the allowed list.

**Solution:** Added UFW rules to allow incoming connections to ports 3011-3015:
```bash
ufw allow 3011/tcp comment "Analytics Dashboard Template"
ufw allow 3012/tcp comment "Productivity Tool Template"
ufw allow 3013/tcp comment "Content Creator Template"
ufw allow 3014/tcp comment "Digital Download Template"
ufw allow 3015/tcp comment "Utility Processor Template"
```

### Challenge 2: Next.js Binding to IPv6 Only
**Problem:** Next.js servers were binding to IPv6 only (`:::port`).

**Solution:** Added `HOSTNAME: '0.0.0.0'` to the PM2 ecosystem configuration environment variables to ensure proper binding.

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

# Check specific domain
echo | openssl s_client -connect your-domain.com:443 -servername your-domain.com 2>/dev/null | openssl x509 -noout -dates
```

---

## Rollback Instructions

If needed, restore previous Caddyfile:

```bash
cd /root/n8n-docker-caddy/caddy_config
cp Caddyfile.backup-20260205-164202 Caddyfile
docker exec n8n-docker-caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

---

## Next Steps

✅ Ready for verification and documentation (Module 6)

All 5 subdomains are now accessible via HTTPS with valid SSL certificates.
