# AI-Powered Accessibility Chatbot - Documentation

**For Media Design Students & Educators**

## 📋 Overview

This chatbot helps users adjust website accessibility settings through natural conversation. It uses Google's Gemini AI to understand user complaints and automatically improves the page's readability.

### Key Features
- 🤖 **AI-powered conversation** using Google Gemini 2.5 Flash
- 🔄 **Rule-based fallback** when AI is unavailable
- 🎯 **Automatic accessibility adjustments** (font size, contrast, spacing)
- 💾 **Persistent settings** saved to browser
- ♿ **WCAG 2.1 compliant** interface

---

## 🎓 How It Works: Three-Layer Architecture

### Layer 1: User Interface
**What users see:**
- Chat widget (bottom-right corner)
- Message bubbles with explanations
- Quick action buttons ("Text too small", etc.)
- "Check for improvements" button

### Layer 2: Intelligence (AI + Rules)
**How the system understands:**

**Option A - AI Mode (with Google Gemini API key):**
```
User: "The text is too small"
    ↓
Gemini AI analyzes the complaint
    ↓
AI generates educational response
    ↓
System applies the change
```

**Option B - Rule-Based Mode (no API key needed):**
```
User: "The text is too small"
    ↓
System detects keyword "small" + "text"
    ↓
Matches to font size increase rule
    ↓
System applies the change
```

### Layer 3: Accessibility Engine
**What gets changed:**
- CSS custom properties (variables)
- Applied dynamically via JavaScript
- Saved to browser's localStorage

---

## 🤖 AI Configuration Guide

### 📁 Where AI Settings Live

**All AI configuration is now centralized and secured:**

```
University-page/
├── index.html              ← Main page
├── styles.css              ← Chatbot styling
├── api-key.js              ← 🔒 YOUR PRIVATE KEY (in .gitignore)
├── api-key.example.js      ← Template to copy
├── ai-config.js            ← ⭐ All AI settings (prompts, rules)
└── script.js               ← Main functionality
```

**🔒 Security Setup:**
- `api-key.js` contains your private API key
- This file is in `.gitignore` and will **NOT** be committed to Git
- `api-key.example.js` is a template for others to copy
- Safe to share your code publicly without exposing your API key

### Step 1: Create Your Private Key File

**Option A - Copy the template:**
```bash
# In the University-page folder
cp api-key.example.js api-key.js
```

**Option B - Create manually:**
Create a new file named `api-key.js` with this content:
```javascript
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

### Step 2: Get a Free API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click **"Get API Key"** → **"Create API key"**
4. Copy the key (starts with `AIzaSy...`)

### Step 3: Add Your Key to api-key.js

Open `api-key.js` and replace the placeholder:

**Before:**
```javascript
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

**After:**
```javascript
const GEMINI_API_KEY = 'AIzaSyDe1TFsf-atrNO275eAO4Vr69i4wvfVCac';  // Your real key
```

**💡 Important:** Never edit `ai-config.js` to add your key. Always use `api-key.js`.

### Step 4: Enable the API

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com)
2. Click **"Enable"** on the Generative Language API
3. Done!

### ✅ Verify Your Setup

Open your browser console and check:
- No errors about missing `GEMINI_API_KEY`
- Chatbot responds to messages
- If you see "API key not configured", check that `api-key.js` exists and is loaded before `ai-config.js` in [index.html](index.html)

### 🔐 Security Benefits

**Why separate api-key.js?**
- ✅ **Safe to share code:** Push to GitHub without exposing your key
- ✅ **Team friendly:** Each developer uses their own key
- ✅ **Easy to rotate:** Change key in one file
- ✅ **No accidents:** `.gitignore` prevents commits

### API Limits (Free Tier)
- ✅ **1,500 requests per day**
- ✅ **15 requests per minute**
- ✅ **100% free** (no credit card needed)

For a research project with low traffic, this is more than enough!

---

## 🎯 Chatbot Rules & Conversation Design

### Conversation Flow Design

#### 1. **User Complains** → **Bot Explains** → **Change Applied**

The chatbot follows this specific sequence:

```
[User] "The text is too small"
    ↓
[Bot] "I'll increase the font size to 1.2x. 
       Larger text reduces eye strain and improves 
       readability for many users."
    ↓
[500ms delay for user to read explanation]
    ↓
[Font size increases automatically]
```

**Why this order?**
- Users see **what** will change
- Users understand **why** it helps (educational)
- Change happens **after** explanation (not surprising)

#### 2. **Guardrails: What the AI Can & Cannot Do**

**✅ AI Can Do:**
- Understand natural language complaints
- Explain accessibility benefits
- Provide educational context
- Suggest multiple improvements

**❌ AI Cannot Do:**
- Access user's personal data
- Modify anything outside the website
- Remember conversations across browser sessions
- Change settings without user request

### AI Prompt Engineering

The AI receives this system prompt on every interaction:

```
You are an accessibility assistant helping users adjust a university website.

When a user reports an accessibility issue, you should:
1. Briefly explain what you'll change and WHY it helps (in 1-2 sentences)
2. Indicate you're making the change

Current settings: Font 1x, Contrast normal, Spacing 1x

Examples:
- User: "text is too small" 
  → "I'll increase the font size to 1.2x. Larger text reduces 
     eye strain and improves readability for many users."

Be concise (under 40 words). Always explain the accessibility benefit.
```

**Key Design Decisions:**

| Element | Purpose | Example |
|---------|---------|---------|
| **Role definition** | Sets AI's identity | "accessibility assistant" |
| **Current settings** | Prevents wrong suggestions | "Font 1x" → won't suggest increase again |
| **Example responses** | Guides tone & format | Shows educational + brief style |
| **Word limit** | Keeps responses crisp | "under 40 words" |
| **Educational requirement** | Teaches users | "Always explain the benefit" |

---

## 🛡️ Guardrails & Safety Mechanisms

### 1. **Conversation Steering**

**Problem:** AI might chat instead of helping.

**Solution:** Immediate action detection

```javascript
// BEFORE AI responds, system checks for keywords
detectAndApplyChanges(message) {
    if (message includes "small" or "font") {
        → Apply font increase
        → Mark as recently applied (30s cooldown)
    }
}
```

**Effect:** Even if AI fails or is slow, changes happen immediately.

### 2. **Duplicate Prevention**

**Problem:** Recommending same change repeatedly.

**Solution:** Memory system

```javascript
recentlyApplied = new Set(); // Tracks recent changes

if (fontSize was just increased) {
    → Don't recommend "increase font size" for 30 seconds
}
```

**Effect:** Users won't see "increase font" suggestion right after they clicked it.

### 3. **Rate Limit Handling**

**Problem:** Free API has 15 requests/minute limit.

**Solution:** Automatic fallback

```javascript
if (API returns 429 error) {
    → Show message: "Rate limit reached"
    → Switch to rule-based mode
    → Still provide helpful suggestions
}
```

**Effect:** Chatbot never completely fails, always helpful.

### 4. **Token Limit Management**

**Problem:** Gemini 2.5 uses "thinking tokens" that consume quota.

**Solution:** Generous token allocation

```javascript
maxOutputTokens: 500  // Allows for thinking + response
```

**Effect:** Complete responses, not cut-off mid-sentence.

### 5. **Bounds Checking**

**Problem:** Settings could go too extreme.

**Solution:** Hard limits in code

```javascript
Font size: 0.8x → 1.5x  (max 50% increase)
Line height: 1.2 → 2.0   (reasonable range)
Spacing: 0.8x → 1.5x    (prevents breaking layout)
```

**Effect:** Website remains usable even at maximum accessibility settings.

---

## 🔧 Rule-Based Fallback System

When AI is unavailable (no API key, rate limit, network error), the chatbot uses pattern matching:

### Keyword Detection Rules

| User Says | System Detects | Action Taken |
|-----------|----------------|--------------|
| "text is too small" | `small` + `text` | Increase font size |
| "hard to read" | `hard to read` | Enable high contrast |
| "too crowded" | `crowded` | Increase spacing |
| "line height" | `line` + `height` | Increase line spacing |
| "reset" | `reset` | Reset all to defaults |

### Code Example

```javascript
if (message.toLowerCase().includes('small') && 
    message.toLowerCase().includes('text')) {
    
    // Educational response (same as AI would give)
    bot.reply("I'll increase the font size to 1.2x. 
               Larger text reduces eye strain...");
    
    // Apply change after 500ms
    setTimeout(() => adjustFontSize('increase'), 500);
}
```

**Why Rule-Based Mode is Good for Research:**

✅ **Consistent:** Same input → same output (reproducible results)  
✅ **Fast:** No API latency  
✅ **Reliable:** No rate limits or network issues  
✅ **Transparent:** Clear cause-and-effect for academic analysis

---

## 📊 Accessibility Checker Feature

### "Check for Improvements" Button

This feature analyzes current settings and suggests optimizations.

#### AI-Powered Analysis

When API is available, the system analyzes the **actual page content**:

```
System analyzes the page:
1. Scans all headings (H1-H6) for proper structure
2. Checks images for alt text
3. Analyzes text/background color contrast
4. Reviews font sizes across elements
5. Inspects interactive elements (buttons, links)

System sends to Gemini:
"PAGE ANALYSIS:
 - 45 headings found, 2 H1s (should be 1)
 - 12 images: 8 with alt text, 4 missing (33%)
 - Body text: rgb(51,51,51) on rgb(255,255,255), size 16px
 - Font distribution: 16px (120 elements), 18px (45 elements)
 - Current user settings: Font 1x, Contrast normal
 
 Recommend specific improvements based on this data."

Gemini responds with REAL issues:
- "Fix heading structure (use 1 H1)" | Improves navigation for screen readers
- "Add alt text to 4 images" | Describes images to blind users
- "Increase body text to 18px" | 16px is below optimal for readability

System creates clickable buttons from these suggestions
```

**Key Difference:** Recommendations are based on **actual page issues**, not just user settings.

**What Gets Analyzed:**

1. **Heading Structure** - Checks for proper H1-H6 hierarchy
2. **Images** - Identifies missing alt text
3. **Text Contrast** - Samples color combinations
4. **Font Sizes** - Distribution across all elements  
5. **Interactive Elements** - Validates buttons and links
6. **User Settings** - Current adjustments applied

**Example Real Analysis:**
```javascript
{
  headingStructure: { total: 45, h1Count: 2 },  // Issue: 2 H1s
  imageAccessibility: { withoutAlt: 4 },        // Issue: missing alt
  fontSizeDistribution: [
    { size: '16px', count: 120 },               // Most common
    { size: '14px', count: 20 }                 // Issue: too small
  ]
}
```

Gemini receives this **real data** and provides specific, actionable recommendations.

#### Rule-Based Analysis

When API is unavailable:

```javascript
Check each setting:
  if (fontSize < 1.15 && not recently changed) {
    → Suggest "Increase font size"
  }
  if (contrast === 'normal') {
    → Suggest "Enable high contrast mode"
  }
  // etc.
```

**Smart Features:**

1. **Optimal Thresholds:**
   - Font size considered optimal at ≥1.2x
   - Line height optimal at ≥1.8
   - Spacing optimal at ≥1.2x

2. **Recent Change Tracking:**
   - Won't suggest same thing for 30 seconds
   - Prevents recommendation fatigue

3. **Completion Message:**
   - When all settings are optimal:
   - "Your accessibility settings are well optimized!"

---

## 🎨 Code Organization

### Project Files Structure

```
University-page/
├── index.html              ← Main HTML page with chatbot widget
├── styles.css              ← All styling (chatbot + website)
├── api-key.js              ← 🔒 PRIVATE API key (in .gitignore)
├── api-key.example.js      ← Template file to copy
├── ai-config.js            ← ⭐ AI CONFIGURATION (prompts, rules, settings)
├── script.js               ← Main chatbot logic & functionality
├── .gitignore              ← Prevents api-key.js from being committed
├── CHATBOT_SETUP.md        ← Quick setup guide
├── AI_DOCUMENTATION.md     ← This comprehensive guide
└── test-gemini-api.html    ← API testing tool
```

### 🔧 ai-config.js - Centralized AI Configuration

**This file contains AI settings (but NOT the private API key):**

```javascript
// ==========================================
// SECTION 1GEMINI_API_KEY,               // ← Loaded from api-key.js
// ==========================================
const AI_CONFIG = {
    apiKey: 'YOUR_KEY_HERE',              // ← Your Gemini API key
    model: 'gemini-2.5-flash',            // AI model selection
    endpoint: '...',                      // Auto-generated API URL
    
    generationConfig: {
        temperature: 0.7,                 // Creativity (0-1)
        maxOutputTokens: 500,             // Response length limit
        topK: 40,                         // Sampling diversity
        topP: 0.95,                       // Nucleus sampling
    }
};

// ==========================================
// SECTION 2: AI PROMPTS
// ==========================================
const AI_PROMPTS = {
    // Main conversation prompt (when user reports issue)
    getConversationPrompt: (settings) => `
        You are an accessibility assistant...
        Current settings: Font ${settings.fontSize}x...
        Be concise (under 40 words)...
    `,
    
    // Analysis prompt (for "Check for improvements")
    getAnalysisPrompt: (settings) => `
        Analyze current settings...
        Recommend 2-3 improvements...
    `
};

// ==========================================
// SECTION 3: RULE-BASED PATTERNS (Fallback)
// ==========================================
const RULE_PATTERNS = {
    fontSize: {
        keywords: ['font size', 'text small'],
        response: "I'll increase font size...",
        action: 'fontSize'
    },
    // ... more patterns
};

// ==========================================
// SECTION 4: OPTIMAL SETTINGS (Thresholds)
// ==========================================
const OPTIMAL_SETTINGS = {
    fontSize: {
        min: 1.15,      // Below this → recommend increase
        optimal: 1.2,   // Target value
        max: 1.5        // Upper bound
    }
    // ... more settings
};

// ==========================================
// SECTION 5: GUARDRAILS (Safety Mechanisms)
// ==========================================
const GUARDRAILS = {
    recentChangeTimeout: 30000,     // 30s cooldown
    explanationDelay: 500,          // 0.5s before applying
    rateLimitMessage: "⏱️ Rate limit..."
};

// ==========================================
// SECTION 6: ERROR MESSAGES
// ==========================================
const ERROR_MESSAGES = {
    noApiKey: "⚠️ API key not configured...",
    rateLimit: "⏱️ Rate limit reached...",
    networkError: "Connection trouble..."
};
```

**Why This Matters:**
- ✅ **Easy to find:** All AI settings in ONE file
- ✅ **Quick changes:** Modify prompts without hunting through code
- ✅ **Clear structure:** Each section has a specific purpose
- ✅ **Learning-friendly:** Students can study AI logic separately
- ✅ **No more magic numbers:** All thresholds defined clearly

### 📝 script.js - Main Chatbot Logic

**Now focused on functionality, using ai-config.js for all settings:**

```javascript
class AccessibilityChatbot {
    
    constructor() {
        // Uses AI_CONFIG from ai-config.js
        this.apiKey = AI_CONFIG.apiKey;
        this.apiEndpoint = AI_CONFIG.endpoint;
        
        // Current accessibility settings
        this.currentSettings = {
            fontSize: 1,
            lineHeight: 1.6,
            contrast: 'normal',
            spacing: 1
        };
    }
    
    // Main methods that USE the configuration:
    
    async getAIResponse(userMessage) {
        // Uses AI_PROMPTS.getConversationPrompt()
        const prompt = AI_PROMPTS.getConversationPrompt(this.currentSettings);
        
        // Uses AI_CONFIG.generationConfig
        const requestBody = {
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: AI_CONFIG.generationConfig
        };
        
        // Makes API call...
    }
    
    handleRuleBasedResponse(message) {
        // Uses RULE_PATTERNS from ai-config.js
        for (const [key, rule] of Object.entries(RULE_PATTERNS)) {
            if (message includes rule.keywords) {
                this.addMessage(rule.response, 'bot');
                // Apply change after GUARDRAILS.explanationDelay
            }
        }
    }
    
    getRuleBasedRecommendationsData() {
        // Uses OPTIMAL_SETTINGS from ai-config.js
        if (this.fontSize < OPTIMAL_SETTINGS.fontSize.min) {
            suggestions.push({
                text: 'Increase font size',
                reason: 'Reduces eye strain'
            });
        }
    }
}
```

**Key Sections in script.js:**
1. **UI Elements** - DOM references, event listeners
2. **AI Integration** - Calls Gemini API using AI_CONFIG
3. **Rule-Based Logic** - Uses RULE_PATTERNS for fallback
4. **Accessibility Engine** - Applies CSS changes
5. **Settings Persistence** - localStorage save/load

---

## 🔄 How Configuration Is Used

**Example Flow:**

```
1. User: "text is too small"
   ↓
2. script.js → detectAndApplyChanges()
   ↓ checks RULE_PATTERNS
3. Match found: fontSize pattern
   ↓ uses rule.response
4. Display: "I'll increase the font size..."
   ↓ wait GUARDRAILS.explanationDelay (500ms)
5. Apply font size change
   ↓ add to recentlyApplied Set
6. setTimeout(remove, GUARDRAILS.recentChangeTimeout)
   ↓ 30 seconds later
7. Clear from recentlyApplied (can recommend again)
```

**Everything configurable is in ai-config.js!**

**Now focused on functionality, not configuration:**

```javascript
class AccessibilityChatbot {
    
    constructor() {
        // ==========================================
        // CONFIGURATION FROM ai-config.js
        // ==========================================
        this.apiKey = AI_CONFIG.apiKey;           // ← Uses ai-config.js
        this.apiEndpoint = AI_CONFIG.endpoint;     // ← Uses ai-config.js

// Conversation History
this.conversationHistory = [];

// Recent Changes Tracker
this.recentlyApplied = new Set();

// Accessibility Settings
this.currentSettings = {
    fontSize: 1,        // 1 = 100%, 1.2 = 120%
    lineHeight: 1.6,    // CSS line-height value
    letterSpacing: 0,   // Extra spacing in pixels
    contrast: 'normal', // 'normal' or 'high'
    spacing: 1          // Element spacing multiplier
};
```

---

## 📈 Tracking & Analytics Opportunities

### For Research Purposes

You could add tracking to analyze:

1. **Most Common Complaints**
   ```javascript
   // Log every user message
   console.log('User complaint:', message);
   ```

2. **Most Applied Changes**
   ```javascript
   // Log every adjustment
   console.log('Applied:', 'fontSize', 'to', newValue);
   ```

3. **AI vs Rule-Based Usage**
   ```javascript
   // Track which mode is used more
   if (usingAI) analytics.log('AI_MODE');
   else analytics.log('RULE_MODE');
   ```

4. **Accessibility Improvement Patterns**
   ```javascript
   // Track the sequence of changes
   userJourney = ['fontSize', 'contrast', 'spacing'];
   ```

**Note:** No tracking is currently implemented. This respects user privacy but could be added for academic research with proper consent.

---

## 🚀 Deployment Considerations

### For Student Projects

**Easy Option: GitHub Pages** (Already works!)
- Just push to GitHub
- Enable Pages in repository settings
- URL: `yourusername.github.io/repository-name`

**⚠️ Important for Production:**

If this were a real production website (not just a research project):

1. **Never expose API keys in frontend code**
   - Use a backend proxy (Node.js/Python server)
   - Or serverless functions (Vercel/Netlify)

2. **Why it's OK for your research:**
   - Non-public university project
   - Low traffic
   - Can regenerate key if needed
   - Can set domain restrictions in Google Cloud

---

## 🎯 Educational Outcomes

### What Students Learn

From implementing/studying this chatbot:

1. **AI Integration Basics**
   - API authentication
   - Prompt engineering
   - Error handling

2. **Accessibility Principles**
   - WCAG guidelines in practice
   - Why each setting helps users
   - Progressive enhancement

3. **User Experience Design**
   - Conversational interfaces
   - Immediate feedback
   - Educational messaging

4. **Frontend Architecture**
   - JavaScript classes
   - Event handling
   - State management
   - LocalStorage for persistence

5. **Graceful Degradation**
   - AI fallback to rules
   - Still functional without API
   - Progressive enhancement

---

## 🐛 Troubleshooting

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| "⚠️ API key not configured" | No key in code | Add API key to `script.js` line 363 |
| "⏱️ Rate limit reached" | Too many requests | Wait 60 seconds, then try again |
| "404 model not found" | Wrong model name | Use `gemini-2.5-flash` |
| Changes don't persist | LocalStorage disabled | Enable cookies/storage in browser |
| No AI responses | API not enabled | Enable Generative Language API in Google Cloud |

### Testing Checklist

**AI Mode:**
- [ ] API key added to code
- [ ] Generative Language API enabled
- [ ] Test message: "text is too small"
- [ ] Response appears within 2-3 seconds
- [ ] Font size increases after 500ms

**Rule-Based Mode:**
- [ ] Remove/comment out API key
- [ ] Test message: "text is too small"
- [ ] Response appears immediately
- [ ] Font size increases after 500ms

**Persistence:**
- [ ] Adjust settings
- [ ] Refresh page (F5)
- [ ] Settings should remain changed
- [ ] Click reset button
- [ ] Settings return to defaults

---

## 📚 Further Reading

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project](https://www.a11yproject.com/)

### AI & Prompt Engineering
- [Google AI Studio](https://ai.google.dev/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📝 Summary

This accessibility chatbot demonstrates:

✅ **Practical AI application** in web accessibility  
✅ **User-centered design** with educational explanations  
✅ **Robust architecture** with AI + rule-based fallback  
✅ **Research-ready** with consistent, reproducible behavior  
✅ **Cost-effective** using free-tier APIs  

**Perfect for:** Media design students studying human-computer interaction, accessibility, and conversational UIs.

---

**Questions?** Check the code comments in `script.js` or refer to `CHATBOT_SETUP.md` for setup instructions.

**Last Updated:** January 2026
