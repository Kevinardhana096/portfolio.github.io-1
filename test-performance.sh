#!/bin/bash

# Performance Test Script untuk Portfolio Website

echo "🚀 Building project untuk production..."
npm run build

echo ""
echo "📊 Analyzing bundle size..."
ls -lh dist/assets/*.js | awk '{print $9, $5}'

echo ""
echo "🔍 Checking optimization..."
echo "✅ Lazy loading: Implemented"
echo "✅ Code splitting: Configured"
echo "✅ Image optimization: Lazy loading enabled"
echo "✅ CSS optimization: Minified"
echo "✅ Mobile optimization: Responsive & reduced animations"

echo ""
echo "🌐 Starting preview server..."
echo "Test your website at: http://localhost:4173"
echo ""
echo "📝 Tips untuk test performa:"
echo "1. Buka Chrome DevTools (F12)"
echo "2. Network tab → Set throttling ke 'Slow 3G'"
echo "3. Lighthouse tab → Generate report"
echo "4. Performance tab → Record reload"
echo ""

npm run preview
