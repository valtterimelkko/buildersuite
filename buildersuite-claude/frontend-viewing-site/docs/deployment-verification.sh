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
export PM2_HOME=/root/.pm2-template-gallery
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
