// ========================================
// AI CONFIGURATION & PROMPT TEMPLATES
// ========================================
// This file contains all AI-related configuration for the accessibility chatbot.
// Separated for easy visibility and modification.
//
// ⚠️ API KEY SETUP REQUIRED:
// 1. Copy api-key.example.js to api-key.js
// 2. Add your Gemini API key to api-key.js
// 3. The key will be loaded automatically (api-key.js is in .gitignore)
//
// This file (ai-config.js) contains prompts, rules, and settings.
// Your private API key lives in api-key.js (not committed to Git).

/**
 * GEMINI API CONFIGURATION
 * 
 * Free Tier Limits:
 * - 1,500 requests per day
 * - 15 requests per minute
 * - 100% free (no credit card needed)
 * 
 * Setup Instructions:
 * 1. Copy api-key.example.js to api-key.js
 * 2. Get API key from: https://makersuite.google.com/app/apikey
 * 3. Enable API: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
 * 4. Add your key to api-key.js (NOT this file)
 * 
 * ⚠️ SECURITY: api-key.js is in .gitignore and won't be committed to Git
 */

const AI_CONFIG = {
    // ==========================================
    // API KEY (loaded from api-key.js)
    // ==========================================
    // For GitHub Pages deployment: Leave empty and users enter their own key
    // For local development: Key loaded from api-key.js (in .gitignore)
    apiKey: typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : '',  // ← From api-key.js (local only)
    
    // ==========================================
    // MODEL CONFIGURATION
    // ==========================================
    // Using gemini-2.5-flash with billing enabled:
    // - Cost: Very affordable with paid tier
    // - Speed: Fast, reliable
    // - Limits: High RPM and daily quota with billing
    // - Available: Confirmed in your billing dashboard
    model: 'gemini-2.5-flash',
    
    // API endpoint (constructed from model name)
    get endpoint() {
        return `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent`;
    },
    
    // ==========================================
    // GENERATION PARAMETERS
    // ==========================================
    generationConfig: {
        temperature: 0.7,           // 0-1: creativity (0.7 = balanced)
        maxOutputTokens: 500,       // Max response length (includes "thinking" tokens)
        topK: 40,                   // Sampling diversity
        topP: 0.95,                 // Nucleus sampling threshold
    },
    
    // ==========================================
    // RESPONSE CONSTRAINTS
    // ==========================================
    constraints: {
        maxWords: 40,               // Keep responses crisp
        requireEducational: true,   // Must explain "why" the change helps
        requireActionable: true,    // Must indicate what will be changed
    }
};

/**
 * AI SYSTEM PROMPTS
 * 
 * These prompts guide the AI's behavior and response format.
 * They are sent with every request to maintain consistent personality.
 */

const AI_PROMPTS = {
    
    // ==========================================
    // MAIN CONVERSATION PROMPT
    // ==========================================
    // Used when user reports an accessibility issue
    getConversationPrompt: (currentSettings) => `You are an accessibility assistant helping users adjust a university website.

When a user reports an accessibility issue, you should:
1. Briefly explain what you'll change and WHY it helps (in 1-2 sentences)
2. Indicate you're making the change

Current settings: Font ${currentSettings.fontSize}x, Contrast ${currentSettings.contrast}, Spacing ${currentSettings.spacing}x

Examples:
- User: "text is too small" → "I'll increase the font size to 1.2x. Larger text reduces eye strain and improves readability for many users."
- User: "low contrast" → "I'll enable high contrast mode. This makes text stand out more clearly from the background, which is especially helpful for users with vision impairments."
- User: "needs more spacing" → "I'll increase the spacing to 1.2x. More space between elements makes content easier to scan and reduces visual clutter."

Be concise (under 40 words). Always explain the accessibility benefit.`,

    // ==========================================
    // ACCESSIBILITY ANALYSIS PROMPT
    // ==========================================
    // Used for "Check for improvements" feature with real page analysis
    getAnalysisPrompt: (currentSettings, pageAnalysis) => {
        // Concise WCAG analysis prompt prioritizing actionable tasks
        if (pageAnalysis) {
            const hasLowContrast = pageAnalysis.textSamples.some(s => s.hasLowContrast);
            return `You are a WCAG expert. Provide accessibility improvements, prioritizing ACTIONABLE tasks first.

DETECTED ISSUES:
• ${pageAnalysis.imageAccessibility.withoutAlt} images missing alt text
• ${pageAnalysis.fontSizeDistribution.hasSmallText ? pageAnalysis.fontSizeDistribution.smallTextCount + ' elements with small text' : 'Text sizes OK'}
• ${hasLowContrast ? 'Low contrast detected' : 'Contrast OK'}
• ${pageAnalysis.headingStructure.h1Count} H1 headings (should be exactly 1)

PRIORITIZE: Font size, contrast, spacing (actionable) over alt text, headings (manual)

FORMAT EXACTLY:
🔴 Action | Explanation
🟡 Action | Explanation
🟢 Action | Explanation

EXAMPLE:
🔴 Make text easier to read | ${pageAnalysis.fontSizeDistribution.smallTextCount || 0} elements have text smaller than 14px minimum
🟡 Enable high contrast mode | Improves visibility for users with vision impairments`;
        }
        
        // Fallback to settings-only analysis if no page data
        return `Analyze the current accessibility settings and recommend improvements:

Current Settings:
- Font size scale: ${currentSettings.fontSize}x (default is 1x, range 0.8-1.5x)
- Line height: ${currentSettings.lineHeight} (default is 1.6, range 1.2-2.0)
- Letter spacing: ${currentSettings.letterSpacing}px (default is 0px, range 0-3px)
- Contrast mode: ${currentSettings.contrast} (options: normal, high)
- Spacing scale: ${currentSettings.spacing}x (default is 1x, range 0.8-1.5x)

Task: Identify 2-3 improvements that would most benefit accessibility. For each improvement, provide:
1. A short user-friendly phrase (5-7 words max) that will be a clickable button
2. Why it helps

Format your response EXACTLY like this example:
RECOMMENDATIONS:
- "Increase font to 1.3x" | Reduces eye strain for longer reading
- "Enable high contrast mode" | Improves readability for vision impairments
- "Add more line spacing" | Makes text easier to track and scan

Keep each reason under 15 words. Only recommend changes that aren't already at optimal levels.`;
    }
};

/**
 * RULE-BASED FALLBACK CONFIGURATION
 * 
 * When AI is unavailable, the system uses keyword matching.
 * These rules ensure the chatbot remains helpful even without API access.
 */

const RULE_PATTERNS = {
    
    // ==========================================
    // KEYWORD DETECTION PATTERNS
    // ==========================================
    
    fontSize: {
        keywords: ['font size', 'text small', 'text tiny', 'increase font', 'bigger text', 'larger text', 'too small', 'text is small', 'small text'],
        response: "I'll increase the font size to 1.2x. Larger text reduces eye strain and improves readability for many users.",
        action: 'fontSize',
        educational: 'Larger text reduces eye strain and improves readability'
    },
    
    contrast: {
        keywords: ['contrast', 'hard to read', 'faint', 'enable high contrast'],
        response: "I'll enable high contrast mode. This makes text stand out more clearly from the background, especially helpful for users with vision impairments.",
        action: 'contrast',
        educational: 'High contrast improves visibility for users with vision impairments'
    },
    
    lineHeight: {
        keywords: ['line height', 'text line height', 'space between lines'],
        response: "I'll increase the line height. Better spacing between lines improves reading flow and helps users track text across lines.",
        action: 'lineHeight',
        educational: 'Better line height improves reading flow and text tracking'
    },
    
    spacing: {
        keywords: ['more space', 'section spacing', 'element spacing', 'crowded', 'cramped', 'more spacing'],
        response: "I'll increase the spacing to 1.2x. More space between elements makes content easier to scan and reduces visual clutter.",
        action: 'spacing',
        educational: 'More spacing reduces visual clutter and improves scannability'
    },
    
    reset: {
        keywords: ['reset', 'default', 'original', 'undo'],
        response: "I'll reset all accessibility settings to their defaults. You can always adjust them again if needed.",
        action: 'reset',
        educational: 'Resets all customizations to original website design'
    }
};

/**
 * ACCESSIBILITY THRESHOLDS
 * 
 * These define "optimal" values for each setting.
 * Used by the "Check for improvements" feature.
 */

const OPTIMAL_SETTINGS = {
    fontSize: {
        min: 1.15,          // Below this → recommend increase
        optimal: 1.2,       // Target value
        max: 1.5,           // Upper bound
        unit: 'x'
    },
    
    lineHeight: {
        min: 1.75,          // Below this → recommend increase
        optimal: 1.8,       // Target value
        max: 2.0,           // Upper bound
        unit: ''
    },
    
    letterSpacing: {
        min: 0,
        optimal: 1,
        max: 3,
        unit: 'px'
    },
    
    spacing: {
        min: 1.15,          // Below this → recommend increase
        optimal: 1.2,       // Target value
        max: 1.5,           // Upper bound
        unit: 'x'
    },
    
    contrast: {
        optimal: 'high',    // Recommended for accessibility
        default: 'normal'
    }
};

/**
 * GUARDRAILS CONFIGURATION
 * 
 * Safety mechanisms to prevent misuse and ensure good UX.
 */

const GUARDRAILS = {
    
    // Prevent same recommendation appearing repeatedly
    recentChangeTimeout: 30000,     // 30 seconds cooldown
    
    // Delay before applying changes (so user can read explanation)
    explanationDelay: 500,          // 500ms = 0.5 seconds
    
    // Error handling
    maxRetries: 2,                  // Retry failed API calls twice
    retryDelay: 1000,               // Wait 1s between retries
    
    // Rate limiting awareness
    rateLimitMessage: "⏱️ Rate limit reached (15 requests/minute). Please wait 60 seconds before checking again.",
    
    // Maximum conversation history (to prevent huge API payloads)
    maxHistoryMessages: 10,         // Keep last 10 messages
};

/**
 * ERROR MESSAGES
 * 
 * User-friendly messages for different error scenarios.
 */

const ERROR_MESSAGES = {
    noApiKey: "⚠️ API key not configured. Please add your Google Gemini API key in script.js. For now, I'll use rule-based responses.",
    
    rateLimit: "⏱️ Rate limit reached (15 requests/minute on free tier). Please wait a minute before trying again. Using rule-based responses for now.",
    
    networkError: "I'm having trouble connecting to the AI service. Let me help you with basic accessibility adjustments using rule-based responses.",
    
    apiKeyInvalid: "⚠️ API key issue detected. Please check that your Gemini API key is valid and has the Generative Language API enabled. Using rule-based responses for now.",
    
    corsError: "⚠️ CORS error detected. The Gemini API doesn't support direct browser calls from localhost by default. Consider using a backend proxy or use rule-based mode. Using rule-based responses for now."
};

// ==========================================
// EXPORT FOR USE IN MAIN SCRIPT
// ==========================================
// In a module system, you would export these.
// For simple HTML/JS, these are global variables.

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AI_CONFIG,
        AI_PROMPTS,
        RULE_PATTERNS,
        OPTIMAL_SETTINGS,
        GUARDRAILS,
        ERROR_MESSAGES
    };
}
