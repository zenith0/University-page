# Accessibility Chatbot - Setup Guide

## Overview

An AI-powered accessibility assistant has been integrated into your university website. The chatbot helps users adjust accessibility settings in real-time based on their needs.

## Features

✅ **Dynamic Font Size Adjustment** - Increases/decreases text size based on user feedback
✅ **High Contrast Mode** - Enhances text visibility for better readability
✅ **Spacing Controls** - Adjusts line height and spacing for comfortable reading
✅ **AI-Powered Responses** - Uses Google Gemini Flash for intelligent conversations
✅ **Rule-Based Fallback** - Works without API key using pattern matching
✅ **Persistent Settings** - Saves user preferences in localStorage

## Files Modified

1. **index.html** - Added chatbot widget HTML structure
2. **styles.css** - Added chatbot styling and accessibility CSS variables
3. **script.js** - Implemented chatbot logic and AI integration

## How to Enable AI Responses (Optional)

The chatbot works out-of-the-box with rule-based responses. To enable AI-powered conversations:

### Step 1: Create Your Private API Key File

**Copy the template:**
```bash
cp api-key.example.js api-key.js
```

**Or create manually:**
Create a new file named `api-key.js` in the same folder with:
```javascript
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

⚠️ **Security:** This file is in `.gitignore` and won't be committed to Git.

### Step 2: Get a Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" → "Create API key"
4. Copy your API key

### Step 3: Add Your Key to api-key.js

Open `api-key.js` and paste your key:

```javascript
const GEMINI_API_KEY = 'AIzaSyDe1TFsf-atrNO275eAO4Vr69i4wvfVCac'; // Your actual key
```

**💡 Important:** Never edit `ai-config.js` to add your key. Always use `api-key.js`.

**⚠️ Security Note**: For a production website, never expose API keys in frontend code. Use a backend proxy (serverless function) instead. For university research projects with limited access, this approach is acceptable. The separate `api-key.js` file at least prevents accidental commits to version control.

### Step 4: Set Up Domain Restrictions (Recommended)

To protect your API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "Credentials"
3. Click on your API key
4. Under "Application restrictions" → "HTTP referrers"
5. Add your domain (e.g., `yourusername.github.io/*`)

## Usage Examples

Users can interact with the chatbot by:

### Quick Actions (Suggestion Buttons)
- Click "Text too small" → Increases font size
- Click "Low contrast" → Enables high contrast mode
- Click "More spacing" → Increases line and letter spacing

### Natural Language Input
- "The text is too small to read"
- "I need more contrast"
- "Can you make the spacing bigger?"
- "Reset everything to default"

## How It Works

### 1. Rule-Based Processing (No API Key Needed)
The chatbot detects keywords in user messages:
- **Font size**: "small", "tiny", "font", "text size"
- **Contrast**: "contrast", "hard to read", "faint"
- **Spacing**: "spacing", "crowded", "cramped"
- **Reset**: "reset", "default", "normal"

### 2. AI-Powered Processing (With API Key)
When configured with Gemini API:
- Understands natural language more flexibly
- Asks clarifying questions
- Provides context-aware responses
- Learns from conversation history

### 3. Accessibility Adjustments
The chatbot modifies CSS custom properties:
```css
--font-scale: 1 → 1.5 (up to 50% larger)
--line-height: 1.6 → 2.0
--letter-spacing: 0 → 3px
--spacing-scale: 1 → 1.5
```

### 4. Persistent Settings
All adjustments are saved to `localStorage` and persist across page reloads.

## API Usage & Costs

**Google Gemini Flash Free Tier:**
- ✅ 1,500 requests/day
- ✅ 15 requests/minute
- ✅ Completely free (no credit card needed)
- ✅ Perfect for university research projects

**Estimated Usage for Your Project:**
- Low traffic research project: ~10-50 requests/day
- Well within free tier limits
- **Total cost: $0**

## Customization

### Changing Chatbot Position
In `styles.css`, modify:
```css
.chatbot-widget {
    bottom: 20px;  /* Change vertical position */
    right: 20px;   /* Change horizontal position */
}
```

### Adjusting Color Scheme
Chatbot uses existing CSS variables from your theme:
- `--primary-color` for main accents
- `--secondary-color` for gradients
- `--accent-color` for highlights

### Modifying Accessibility Limits
In `script.js`, adjust maximum values:
```javascript
this.currentSettings = {
    fontSize: 1,        // Max: 1.5 (150%)
    lineHeight: 1.6,    // Max: 2.0
    letterSpacing: 0,   // Max: 3px
    spacing: 1          // Max: 1.5
};
```

## Testing the Chatbot

### Without API Key (Rule-Based)
1. Open your website in a browser
2. Click the blue chat button (bottom-right)
3. Try these messages:
   - "The text is too small"
   - "I need more contrast"
   - "Can you increase spacing?"
   - "Reset to default"

### With API Key (AI-Powered)
1. Add your Gemini API key to `script.js`
2. Open browser console (F12) to check for errors
3. Try natural conversations:
   - "I'm having trouble reading this"
   - "Can you help me see better?"
   - Complex requests like "The headings are fine but the paragraphs are too small"

## Deployment Options

### GitHub Pages (Free)
```bash
# In your repository settings
Settings → Pages → Source: main branch → Save
```
Your site will be at: `https://yourusername.github.io/repository-name`

### Vercel (Free, More Secure for API Keys)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
For production, move API key to Vercel environment variables.

## Troubleshooting

### Chatbot doesn't appear
- Check browser console (F12) for JavaScript errors
- Ensure `script.js` is loaded after the HTML content
- Verify all IDs match: `chatbotWidget`, `chatbotToggle`, etc.

### AI responses not working
- Check if API key is correctly set in `script.js`
- Open browser console and look for API errors
- Verify Gemini API key is active in Google Cloud Console
- Check network tab (F12) for failed requests

### Accessibility changes not applying
- Open browser inspector and check if CSS variables are set on `:root`
- Verify localStorage is enabled in browser
- Check if high-contrast class is added to `<body>`

### Rate limiting issues
- Gemini free tier: 15 requests/minute
- If exceeded, wait 1 minute and try again
- For production, implement request throttling

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (responsive design)

## Accessibility Compliance

The chatbot itself follows WCAG 2.1 AA standards:
- Keyboard navigable (Tab, Enter, Esc)
- ARIA labels on all interactive elements
- Focus indicators visible
- Color contrast ratios meet AA standards
- Responsive for mobile devices

## Future Enhancements

Consider adding:
- Voice input/output using Web Speech API
- More granular controls (font family, color schemes)
- Preset accessibility profiles
- Export/import settings
- Analytics for accessibility adjustments (for research)

## Support

For issues or questions:
1. Check browser console for errors
2. Review this documentation
3. Test with rule-based mode first (no API key)
4. Verify all files are correctly uploaded

## License & Credits

This chatbot implementation is based on the architecture discussion from the Claude AI research conversation. It's designed specifically for university accessibility research projects.

---

**🎓 Built for Excellence University - Accessibility Research Project**
