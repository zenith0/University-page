# Deploying to GitHub Pages

## Important Security Note ⚠️

**The Gemini API key cannot be fully secured in a client-side application.** Anyone who visits your deployed site can inspect the network requests and see the API key. This is a limitation of client-side JavaScript.

### Recommended Solutions:

1. **For Production**: Create a backend server that handles API requests
2. **For Testing/Demo**: Use API key restrictions to limit abuse

## API Key Security Setup

### 1. Restrict Your API Key (Important!)

Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

1. Find your API key
2. Click "Edit API key"
3. Under **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add your GitHub Pages URL: `https://yourusername.github.io/University-page/*`
   - Add localhost for testing: `http://localhost/*`
4. Under **API restrictions**:
   - Select "Restrict key"
   - Enable only: "Generative Language API"
5. Click "Save"

This limits where the API key can be used from and which APIs it can access.

### 2. Set Usage Quotas

In Google Cloud Console:
1. Go to "Quotas & System Limits"
2. Set daily request limits to prevent abuse
3. Enable billing alerts

## Deployment Steps

### Option 1: Deploy Current Version (Users Bring Their Own API Key)

This is the most secure option - users enter their own API key.

```bash
# 1. Remove your API key from ai-config.js
# Edit ai-config.js and change:
const AI_CONFIG = {
    apiKey: '', // Users will enter their own key

# 2. Add all files to git
git add .

# 3. Commit changes
git commit -m "Prepare for GitHub Pages deployment"

# 4. Push to GitHub
git push origin main

# 5. Enable GitHub Pages
# Go to your repository on GitHub
# Settings → Pages
# Source: Deploy from branch: main → / (root)
# Click Save
```

Your site will be available at: `https://yourusername.github.io/University-page/`

### Option 2: Deploy With Your API Key (Not Recommended)

⚠️ **Only use this for personal demos with restricted API keys!**

```bash
# Make sure api-key.js is in .gitignore (it already is)
git add .gitignore
git add test-gemini-api.html
git add ai-config.js
git add index.html script.js styles.css
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## After Deployment

### Test Your Site

1. Visit `https://yourusername.github.io/University-page/`
2. Open browser console (F12)
3. Try the chatbot
4. Check for any errors

### Monitor API Usage

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Go to "APIs & Services" → "Dashboard"
3. Monitor your Generative Language API usage
4. Set up billing alerts

## Files Structure

```
University-page/
├── index.html              # Main page (deployed)
├── script.js              # Main script (deployed)
├── styles.css             # Styles (deployed)
├── ai-config.js           # AI configuration (deployed)
├── api-key.js             # Your private key (NOT deployed - in .gitignore)
├── test-gemini-api.html   # Test page (deployed, but no key hardcoded)
└── .gitignore             # Protects api-key.js
```

## Updating Your Deployed Site

```bash
# Make changes to your files
git add .
git commit -m "Update description"
git push origin main
```

GitHub Pages will automatically rebuild (may take 1-2 minutes).

## Troubleshooting

### API Key Not Working After Deployment

1. Check that HTTP referrer restriction includes your GitHub Pages URL
2. Check browser console for CORS or API errors
3. Verify the API key is set in ai-config.js (or user entered it)

### 404 Errors on GitHub Pages

- Wait 1-2 minutes after enabling Pages
- Check that index.html is in the root directory
- Verify branch is set correctly in Pages settings

### API Rate Limiting

- Check your quota limits in Google Cloud Console
- Consider implementing request caching
- Add delays between requests
