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
