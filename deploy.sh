#!/bin/bash

# ========================================
# GitHub Pages Deployment Script
# ========================================

echo "🚀 Deploying University Accessibility Page to GitHub Pages"
echo ""

# Check if api-key.js exists and warn user
if [ -f "api-key.js" ]; then
    echo "✅ api-key.js found (will be ignored by git)"
else
    echo "⚠️  api-key.js not found - users will need to enter their own API key"
fi

echo ""
echo "📋 Files to be committed:"
git status --short

echo ""
read -p "Continue with deployment? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "📝 Adding files to git..."
git add .gitignore
git add index.html
git add script.js
git add styles.css
git add ai-config.js
git add test-gemini-api.html
git add accessibility-test.html
git add assets/
git add docs/
git add *.md

echo ""
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date +%Y-%m-%d)"

echo ""
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📍 Your site will be available at:"
echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f1).github.io/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f2)/"
echo ""
echo "⏱️  GitHub Pages may take 1-2 minutes to build and deploy"
echo ""
echo "🔐 Next steps:"
echo "   1. Enable GitHub Pages in repository settings"
echo "   2. Restrict your API key to your GitHub Pages domain"
echo "   3. See DEPLOYMENT.md for detailed instructions"
