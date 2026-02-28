# ⚠️ Process Configuration Moved

The `ecosystem.config.js` file for this project has been moved to the centralized repository:

**New Location**: `/root/systemd-services-repo/pm2-configs/si-project/ecosystem.config.js`

**Why**: All process management configuration is now centralized for:
- Version control
- Visibility across services
- Easier troubleshooting
- Consistent deployment

**For Agents**: When working with PM2 processes, use the centralized config:
```bash
export PM2_HOME=/root/.pm2-si-project
pm2 start /root/systemd-services-repo/pm2-configs/si-project/ecosystem.config.js
```
