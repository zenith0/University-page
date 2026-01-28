// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)';
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0 && navMenu && mobileMenuToggle) {
    navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0)';
    });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0) {
    function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    }

    window.addEventListener('scroll', activateNavLink);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '#apply') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animated counter for stats
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            animateCounter(statNumber);
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Testimonials carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const carouselDots = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (testimonialCards.length > 0 && carouselDots && prevBtn && nextBtn) {
    let currentTestimonial = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 6000);

    // Pause auto-rotate on hover
    const testimonialSection = document.querySelector('.testimonials-carousel');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialSection.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 6000);
        });
    }
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    });
}

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in effect to various elements
const fadeElements = document.querySelectorAll('.program-card, .research-card, .campus-card, .feature-item');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Interactive button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Accessibility: Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Print current year in footer (if needed)
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = `© ${currentYear} Excellence University. All rights reserved.`;
}

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions (only if sections exist)
if (sections.length > 0 && typeof activateNavLink === 'function') {
    const debouncedActivateNavLink = debounce(activateNavLink, 100);
    window.removeEventListener('scroll', activateNavLink);
    window.addEventListener('scroll', debouncedActivateNavLink);
}

console.log('Excellence University Website - All scripts loaded successfully');

// Apply test lab violations on page load
applyTestLabViolations();

// ========================================
// Apply Test Lab Violations (if coming from test lab)
// ========================================
function applyTestLabViolations() {
    const testSettings = localStorage.getItem('testLabSettings');
    if (testSettings) {
        const settings = JSON.parse(testSettings);
        console.log('🧪 Applying test lab violations to main site:', settings);
        
        // Mark that violations are active
        document.body.setAttribute('data-test-violations', 'true');
        
        // Apply font size violation via CSS variable
        if (settings.fontSize && settings.fontSize < 16) {
            const scale = settings.fontSize / 16;
            document.documentElement.style.setProperty('--test-font-size', settings.fontSize + 'px');
            document.documentElement.style.setProperty('--font-scale', scale);
            document.body.classList.add('test-small-font');
        }
        
        // Apply contrast violation
        if (settings.contrast && settings.contrast < 1) {
            document.documentElement.style.setProperty('--test-contrast', settings.contrast);
            document.body.classList.add('test-low-contrast');
        }
        
        // Apply spacing violation
        if (settings.spacing === 'tight') {
            document.documentElement.style.setProperty('--test-line-height', '1.2');
            document.documentElement.style.setProperty('--test-spacing', '5px');
            document.body.classList.add('test-tight-spacing');
        }
        
        // Apply button size violation
        if (settings.buttonSize === 'tiny') {
            document.body.classList.add('test-tiny-buttons');
        }
        
        // Apply alt text violation
        if (settings.hasAltText === false) {
            document.querySelectorAll('img:not(.chatbot-widget img)').forEach(img => {
                img.setAttribute('data-original-alt', img.alt || '');
                img.removeAttribute('alt');
            });
        }
    }
}

// Apply violations on page load
window.addEventListener('DOMContentLoaded', applyTestLabViolations);

// ========================================
// Accessibility Chatbot
// ========================================

class AccessibilityChatbot {
    constructor() {
        // ==========================================
        // CONFIGURATION FROM ai-config.js
        // ==========================================
        // All AI settings, prompts, and rules are in ai-config.js
        // Try to load API key from: 1) localStorage, 2) AI_CONFIG, 3) empty
        this.apiKey = localStorage.getItem('geminiApiKey') || AI_CONFIG.apiKey;
        this.apiEndpoint = AI_CONFIG.endpoint;
        this.conversationHistory = [];
        this.appliedImprovements = []; // Track all applied improvements (never offer twice)
        this.currentRecommendations = []; // Latest recommendations from AI
        this.manualTasks = []; // Collect manual implementation tasks
        this.analysisRunning = false; // guard against re-entrant analysis
        this.recentlyApplied = new Set(); // Track recent changes to prevent duplicate applications
        
        // Current accessibility settings
        this.currentSettings = {
            fontSize: 1,
            lineHeight: 1.6,
            letterSpacing: 0,
            contrast: 'normal',
            spacing: 1
        };
        
        if (this.initElements()) {
            this.attachEventListeners();
            this.loadSettings();
            // Set initial label for the analyze/check button
            if (this.checkBtn) {
                this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6"></path><path d="M12 16v6"></path></svg> Start AI Mode';
            }
        }
    }
    
    initElements() {
        this.widget = document.getElementById('chatbotWidget');
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.close = document.getElementById('chatbotClose');
        this.reset = document.getElementById('chatbotReset');
        this.checkBtn = document.getElementById('chatbotCheckBtn');
        this.messages = document.getElementById('chatbotMessages');
        this.typing = document.getElementById('chatbotTyping');
        this.badge = document.getElementById('chatbotBadge');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSendBtn');
        this.backBtn = document.getElementById('chatbotBackBtn');
        this.footerBackBtn = document.getElementById('chatbotFooterBackBtn');
        this.inputWrapper = document.querySelector('.chatbot-input-wrapper');
        
        // Check if all required elements exist
        if (!this.widget || !this.toggle || !this.window || !this.close || !this.checkBtn || !this.messages) {
            console.warn('Chatbot elements not found on this page');
            return false;
        }
        return true;
    }
    
    attachEventListeners() {
        if (!this.toggle || !this.close || !this.reset || !this.checkBtn) return;

        this.toggle.addEventListener('click', () => this.openChat());
        this.close.addEventListener('click', () => this.closeChat());
        this.reset.addEventListener('click', () => this.handleResetClick());
        this.checkBtn.addEventListener('click', () => this.analyzeAccessibility());

        // Chat input/send handlers (allow quick user commands)
        if (this.sendBtn && this.input) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Back button to return to chat when in AI mode
        if (this.backBtn) {
            this.backBtn.addEventListener('click', () => this.exitAIMode());
        }
        if (this.footerBackBtn) {
            this.footerBackBtn.addEventListener('click', () => {
                this.exitAIMode();
            });
        }
    }
    
    openChat() {
        this.window.classList.add('active');
        this.toggle.style.display = 'none';
        this.badge.style.display = 'none';
        // Enable input when opening chat unless AI mode is active
        if (this.input) this.input.disabled = !!this.aiModeActive;
        if (this.sendBtn) this.sendBtn.disabled = !!this.aiModeActive;
    }
    
    closeChat() {
        this.window.classList.remove('active');
        this.toggle.style.display = 'flex';
    }
    
    handleResetClick() {
        this.resetSettings();
        this.appliedImprovements = []; // Clear applied improvements
        this.currentRecommendations = []; // Clear recommendations
        this.manualTasks = []; // Clear manual tasks
        this.addMessage("🔄 All accessibility settings have been reset. Applied improvements cleared. Click 'Analyze Page' to get new recommendations.", 'bot');
    }
    
    async analyzeAccessibility() {
        if (this.analysisRunning) {
            console.log('🔁 Analysis already running, skipping re-entry');
            return;
        }
        this.analysisRunning = true;
        console.log('🔍 Starting WCAG accessibility analysis...');
        // Enter AI/analysis mode: disable free-text chat input while guided problem flow runs
        this.aiModeActive = true;
        // Hide input row and show footer back button while in AI mode
        if (this.inputWrapper) this.inputWrapper.style.display = 'none';
        if (this.footerBackBtn) this.footerBackBtn.style.display = 'inline-block';
        if (this.backBtn) this.backBtn.style.display = 'inline-flex';
        
        // Disable button during analysis
        this.checkBtn.disabled = true;
        this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg> Analyzing...';
        
        // Show typing indicator
        this.typing.style.display = 'flex';
        this.scrollToBottom();
        
        if (!this.apiKey) {
            console.warn('⚠️ No API key - using fallback recommendations');
            this.typing.style.display = 'none';
            this.checkBtn.disabled = false;
            this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Next Recommendation';
            this.showFallbackRecommendations();
            return;
        }
        
        try {
            // Analyze page content
            const pageAnalysis = await this.analyzePageContent();
            console.log('📊 Page analysis complete:', pageAnalysis);
            
            // DEBUG: Log font size analysis specifically
            console.log('🔍 Font size analysis:', pageAnalysis.fontSizeDistribution);
            console.log('🔍 Small text found:', pageAnalysis.fontSizeDistribution.hasSmallText);
            console.log('🔍 Small text samples:', pageAnalysis.fontSizeDistribution.smallTextSamples);
            console.log('🔍 Contrast analysis:', pageAnalysis.textSamples.map(s => `${s.element}: opacity=${s.opacity}, lowContrast=${s.hasLowContrast}`));
            
            // Get AI recommendations excluding already applied improvements
            const recommendationsFromAI = await this.getWCAGRecommendations(pageAnalysis);

            // If axe produced violations, convert them into recommendations and merge
            let recommendations = [];
            if (pageAnalysis.axe && pageAnalysis.axe.violations && pageAnalysis.axe.violations.length > 0) {
                console.log('🔎 Converting axe results to recommendations');
                const axeRecs = this.parseAxeResultsToRecommendations(pageAnalysis.axe);
                // Merge and dedupe axe-based and AI recommendations, filter already applied
                const merged = [];
                const seen = new Set();
                const pushIfNew = (r) => {
                    if (!r || !r.fullText) return;
                    if (this.appliedImprovements && this.appliedImprovements.includes(r.fullText)) return;
                    if (seen.has(r.fullText)) return;
                    seen.add(r.fullText);
                    merged.push(r);
                };
                axeRecs.forEach(pushIfNew);
                recommendationsFromAI.forEach(pushIfNew);
                recommendations = merged.slice(0, 30); // cap list
            } else {
                // Filter AI recommendations against appliedImprovements and dedupe
                const merged = [];
                const seen = new Set();
                recommendationsFromAI.forEach(r => {
                    if (!r || !r.fullText) return;
                    if (this.appliedImprovements && this.appliedImprovements.includes(r.fullText)) return;
                    if (seen.has(r.fullText)) return;
                    seen.add(r.fullText);
                    merged.push(r);
                });
                recommendations = merged.slice(0, 30);
            }
            
            this.typing.style.display = 'none';
            this.checkBtn.disabled = false;
            this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Next Recommendation';
            
            if (recommendations.length === 0) {
                // No more improvements available
                this.addMessage("🎉 <strong>Excellent!</strong> No more accessibility improvements available. This page meets WCAG 2.1 AA standards with current settings.", 'bot');
            } else {
                // Show actionable recommendations first
                const actionableRecs = recommendations.filter(r => this.isActionable(r.action));
                const manualRecs = recommendations.filter(r => !this.isActionable(r.action));
                
                // Store manual tasks for later
                this.manualTasks.push(...manualRecs);
                
                if (actionableRecs.length > 0) {
                    // Show actionable recommendations as buttons
                    this.showRecommendations(actionableRecs);
                } else {
                    // Only manual tasks, show summary immediately
                    this.showManualTasksSummary();
                }
            }
        } catch (error) {
            console.error('❌ Analysis error:', error);
            this.typing.style.display = 'none';
            this.checkBtn.disabled = false;
            this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Next Recommendation';
            
            // Fallback to simple recommendations
            this.showFallbackRecommendations();
        } finally {
            this.analysisRunning = false;
        }
    }

    // Exit AI mode and restore chat input
    exitAIMode() {
        this.aiModeActive = false;
        if (this.inputWrapper) this.inputWrapper.style.display = 'flex';
        if (this.footerBackBtn) this.footerBackBtn.style.display = 'none';
        if (this.backBtn) this.backBtn.style.display = 'none';
        if (this.input) this.input.disabled = false;
        if (this.sendBtn) this.sendBtn.disabled = false;
        this.addMessage('🔙 Back to chat mode. You can type commands now.', 'bot');
    }
    
    async analyzePageContent() {
        // Analyze actual page content for accessibility issues
        const analysis = {
            // Color contrast analysis
            textSamples: this.getTextContrastSamples(),
            
            // Heading structure
            headingStructure: this.analyzeHeadings(),
            
            // Image alt texts
            imageAccessibility: this.analyzeImages(),
            
            // Interactive elements
            interactiveElements: this.analyzeInteractiveElements(),
            
            // Current user settings
            userSettings: this.currentSettings,
            
            // Font sizes across page
            fontSizeDistribution: this.analyzeFontSizes()
        };
        
        // Run axe-core if available and include the results
        if (window.axe) {
            try {
                analysis.axe = await this.runAxe();
                console.log('🔎 axe results:', analysis.axe);
            } catch (err) {
                console.warn('axe.run failed:', err);
                analysis.axe = null;
            }
        } else {
            analysis.axe = null;
        }
        
        return analysis;
    }

    // Run axe-core programmatic scan and return simplified results
    async runAxe() {
        if (!window.axe) throw new Error('axe-core not loaded');
        // Run with default context (entire document)
        const results = await window.axe.run(document, {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa']
            }
        });

        // Simplify violations to key fields
        const simplified = (results.violations || []).map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            nodes: v.nodes.map(n => ({
                target: n.target,
                html: n.html.substring(0, 200),
                failureSummary: n.failureSummary
            }))
        }));

        return { violations: simplified, timestamp: Date.now() };
    }

    // Convert axe results into simple recommendation objects
    parseAxeResultsToRecommendations(axeResults) {
        if (!axeResults || !axeResults.violations) return [];

        const mapImpactToPriority = (impact) => {
            if (!impact) return '🟡';
            if (impact === 'critical' || impact === 'serious') return '🔴';
            if (impact === 'moderate') return '🟡';
            return '🟢';
        };

        // Aggregate violations by rule id to avoid creating one recommendation per node
        const recs = [];
        axeResults.violations.forEach(v => {
            const priority = mapImpactToPriority(v.impact);
            // Collect unique selectors for this violation
            const selectors = [];
            v.nodes.forEach(node => {
                const sel = (node.target && node.target[0]) || null;
                if (!sel) return;
                // Skip selectors referencing the chatbot widget to avoid self-targeting loops
                if (sel.toLowerCase().includes('chatbot')) return;
                try {
                    const els = document.querySelectorAll(sel);
                    if (els && els.length > 0) {
                        const allInsideChatbot = Array.from(els).every(e => !!e.closest && !!e.closest('.chatbot-widget'));
                        if (allInsideChatbot) return;
                    }
                } catch (e) {
                    // ignore invalid selectors
                }
                if (!selectors.includes(sel)) selectors.push(sel);
            });

            // If selectors were found, summarize them; otherwise create a page-level recommendation
            const totalInstances = v.nodes ? v.nodes.length : 0;
            const sample = selectors.slice(0, 3).join(', ');
            let actionPrefix = '';
            const idLower = (v.id || '').toLowerCase();
            const helpLower = (v.help || '').toLowerCase();
            if (idLower.includes('color') || helpLower.includes('contrast')) actionPrefix = 'Increase contrast - ';
            else if (idLower.includes('image') || helpLower.includes('alt') || helpLower.includes('image')) actionPrefix = 'Add alt text - ';
            else if (idLower.includes('heading') || helpLower.includes('heading')) actionPrefix = 'Fix heading structure - ';
            else if (helpLower.includes('font') || helpLower.includes('text size')) actionPrefix = 'Increase font size - ';

            const action = selectors.length > 0
                ? `${actionPrefix}${v.help} on ${selectors.length} elements (e.g. ${sample})`
                : `${actionPrefix}${v.help} on the page (${totalInstances} instances)`;

            const explanation = v.description || v.help;
            const fullText = `${priority} ${v.id} ${v.help}`;

            recs.push({
                priority,
                action,
                explanation,
                fullText,
                nodes: selectors.slice(0, 8) // keep up to 8 selectors for inline fixes
            });
        });

        // Deduplicate by fullText and filter out already applied improvements
        const uniq = [];
        const seen = new Set();
        recs.forEach(r => {
            if (this.appliedImprovements && this.appliedImprovements.includes(r.fullText)) return;
            if (!seen.has(r.fullText)) {
                seen.add(r.fullText);
                uniq.push(r);
            }
        });
        return uniq.slice(0, 30); // cap to 30 recommendations to avoid runaway lists
    }

    // Apply a recommendation that originated from axe by mutating the DOM inline
    applyAxeFix(rec) {
        if (!rec || !rec.nodes || rec.nodes.length === 0) return false;

        let appliedAny = false;

        rec.nodes.forEach(sel => {
            try {
                const elements = document.querySelectorAll(sel);
                elements.forEach(el => {
                    // For common cases, attempt safe, reversible inline fixes
                    const tag = el.tagName.toLowerCase();

                    // If it's an image missing alt text, add a placeholder alt
                    if (tag === 'img' && !el.getAttribute('alt')) {
                        el.setAttribute('alt', 'Image description (add meaningful alt)');
                        appliedAny = true;
                        return;
                    }

                    // For contrast-related suggestions: increase font weight and slightly increase size
                    const text = el.textContent || '';
                    if (text.trim().length > 0) {
                        // Increase font-size inline by ~18% (safe bump)
                        const cs = window.getComputedStyle(el);
                        const currentSize = parseFloat(cs.fontSize) || 16;
                        el.style.fontSize = Math.round(currentSize * 1.18) + 'px';
                        // Increase weight if it's not already bold
                        const fontWeight = parseInt(cs.fontWeight) || 400;
                        if (fontWeight < 600) el.style.fontWeight = '600';
                        // Ensure text stays readable on semi-transparent backgrounds
                        el.style.color = cs.color; // keep same color but enforce inline so blending calc changes
                        appliedAny = true;
                        return;
                    }

                    // Fallback: add an outline to visually identify the element for manual fixing
                    el.style.outline = '2px dashed #ffb400';
                    el.style.outlineOffset = '2px';
                    appliedAny = true;
                });
            } catch (e) {
                console.warn('applyAxeFix failed for selector', sel, e);
            }
        });

        if (appliedAny && rec.fullText) this.appliedImprovements.push(rec.fullText);
        return appliedAny;
    }
    
    analyzePageAccessibility() {
        // Analyze actual page content for accessibility issues
        const analysis = {
            // Color contrast analysis
            textSamples: this.getTextContrastSamples(),
            
            // Heading structure
            headingStructure: this.analyzeHeadings(),
            
            // Image alt texts
            imageAccessibility: this.analyzeImages(),
            
            // Interactive elements
            interactiveElements: this.analyzeInteractiveElements(),
            
            // Current user settings
            userSettings: this.currentSettings,
            
            // Font sizes across page
            fontSizeDistribution: this.analyzeFontSizes()
        };
        
        return analysis;
    }
    
    getTextContrastSamples() {
        const samples = [];
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, li');
        const checked = new Set();

        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const bgColor = this._resolveEffectiveBackground(el);
            const textColor = style.color;
            const opacity = parseFloat(style.opacity || 1);
            const key = `${textColor}-${bgColor}-${opacity}`;

            if (!checked.has(key) && samples.length < 5) {
                checked.add(key);

                // compute effective contrast ratio (considers cumulative opacity and blending)
                const ratio = this._effectiveContrast(el, textColor, bgColor);

                samples.push({
                    element: el.tagName.toLowerCase(),
                    color: textColor,
                    background: bgColor,
                    fontSize: style.fontSize,
                    opacity: opacity,
                    contrastRatio: ratio,
                    hasLowContrast: (ratio !== null && ratio < 4.5) || this._computeCumulativeOpacity(el) < 0.8
                });
            }
        });

        return samples;
    }

    // Helper: find effective background color by walking up the DOM until non-transparent background
    _resolveEffectiveBackground(el) {
        let node = el;
        while (node && node !== document.documentElement) {
            const bg = window.getComputedStyle(node).backgroundColor;
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
            node = node.parentElement;
        }
        // fallback to body background
        return window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)';
    }

    // Parse rgb/rgba/hex into [r,g,b] 0-255 or return null
    _parseColor(colorStr) {
        if (!colorStr) return null;
        colorStr = colorStr.trim();
        // rgb(a)
        const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (rgbMatch) return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
        // hex
        const hexMatch = colorStr.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hexMatch) {
            let hex = hexMatch[1];
            if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
            return [parseInt(hex.substr(0,2),16), parseInt(hex.substr(2,2),16), parseInt(hex.substr(4,2),16)];
        }
        return null;
    }

    // Relative luminance per WCAG
    _relativeLuminance(rgb) {
        if (!rgb) return null;
        const srgb = rgb.map(v => v / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
        return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    _contrastRatio(fg, bg) {
        const c1 = this._parseColor(fg);
        const c2 = this._parseColor(bg);
        if (!c1 || !c2) return null;
        const L1 = this._relativeLuminance(c1);
        const L2 = this._relativeLuminance(c2);
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    // Compute cumulative opacity from element up to body (multiplicative)
    _computeCumulativeOpacity(el) {
        let node = el;
        let op = 1;
        while (node && node !== document.documentElement) {
            const o = parseFloat(window.getComputedStyle(node).opacity);
            if (!isNaN(o)) op *= o;
            node = node.parentElement;
        }
        // include root/body opacity
        const bodyOp = parseFloat(window.getComputedStyle(document.body).opacity);
        if (!isNaN(bodyOp)) op *= bodyOp;
        return op;
    }

    // Blend two RGB arrays [r,g,b] by alpha (0-1): result = fg*alpha + bg*(1-alpha)
    _blendColors(fgRgb, bgRgb, alpha) {
        return [
            Math.round(fgRgb[0] * alpha + bgRgb[0] * (1 - alpha)),
            Math.round(fgRgb[1] * alpha + bgRgb[1] * (1 - alpha)),
            Math.round(fgRgb[2] * alpha + bgRgb[2] * (1 - alpha))
        ];
    }

    // Compute effective contrast considering cumulative opacity (blend foreground with background if needed)
    _effectiveContrast(el, fgColor, bgColor) {
        const fg = this._parseColor(fgColor);
        const bg = this._parseColor(bgColor);
        if (!fg || !bg) return null;

        const cumOp = this._computeCumulativeOpacity(el);
        let effectiveFg = fg;
        if (cumOp < 1) {
            // blend foreground towards background by opacity
            effectiveFg = this._blendColors(fg, bg, cumOp);
        }

        const Lfg = this._relativeLuminance(effectiveFg);
        const Lbg = this._relativeLuminance(bg);
        if (Lfg === null || Lbg === null) return null;
        const lighter = Math.max(Lfg, Lbg);
        const darker = Math.min(Lfg, Lbg);
        return (lighter + 0.05) / (darker + 0.05);
    }
    
    analyzeHeadings() {
        const headings = [];
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
            headings.push({
                level: h.tagName,
                text: h.textContent.substring(0, 50)
            });
        });
        return {
            total: headings.length,
            h1Count: document.querySelectorAll('h1').length,
            structure: headings.slice(0, 10)
        };
    }
    
    analyzeImages() {
        const images = document.querySelectorAll('img');
        let withAlt = 0;
        let withoutAlt = 0;
        
        images.forEach(img => {
            if (img.alt && img.alt.trim()) withAlt++;
            else withoutAlt++;
        });
        
        return {
            total: images.length,
            withAlt,
            withoutAlt,
            missingAltPercentage: images.length > 0 ? Math.round((withoutAlt / images.length) * 100) : 0
        };
    }
    
    analyzeInteractiveElements() {
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');
        
        let interactiveIssues = [];
        
        buttons.forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                interactiveIssues.push('Button without accessible text');
            }
        });
        
        links.forEach(link => {
            if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
                interactiveIssues.push('Link without accessible text');
            }
        });
        
        return {
            buttons: buttons.length,
            links: links.length,
            issues: interactiveIssues.slice(0, 3)
        };
    }
    
    analyzeFontSizes() {
        const sizes = new Map();
        const smallTextElements = [];
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, button');
        
        elements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const size = computedStyle.fontSize;
            const sizeInPx = parseFloat(size);
            
            sizes.set(size, (sizes.get(size) || 0) + 1);
            
            // Flag text smaller than 14px (WCAG minimum for body text)
            if (sizeInPx < 14 && !el.closest('.chatbot-widget')) {
                smallTextElements.push({
                    tag: el.tagName.toLowerCase(),
                    size: size,
                    text: el.textContent.substring(0, 50)
                });
            }
        });
        
        const sizeArray = Array.from(sizes.entries())
            .sort((a, b) => parseInt(b[1]) - parseInt(a[1]))
            .slice(0, 5)
            .map(([size, count]) => ({ size, count }));
        
        return {
            distribution: sizeArray,
            smallTextCount: smallTextElements.length,
            smallTextSamples: smallTextElements.slice(0, 3),
            hasSmallText: smallTextElements.length > 0
        };
    }


    async getAccessibilityRecommendations() {
        // Analyze the actual page
        const pageAnalysis = this.analyzePageAccessibility();
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 PAGE ANALYSIS COMPLETE');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📑 Headings:', pageAnalysis.headingStructure);
        console.log('🖼️  Images:', pageAnalysis.imageAccessibility);
        console.log('🎨 Color samples:', pageAnalysis.textSamples);
        console.log('🔘 Interactive:', pageAnalysis.interactiveElements);
        console.log('📏 Font sizes:', pageAnalysis.fontSizeDistribution);
        console.log('⚙️  User settings:', pageAnalysis.userSettings);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Use prompt from ai-config.js with real page data
        const prompt = AI_PROMPTS.getAnalysisPrompt(this.currentSettings, pageAnalysis);
        
        console.log('📤 SENDING TO GEMINI:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(prompt);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const requestBody = {
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            generationConfig: AI_CONFIG.generationConfig
        };
        
        console.log('🚀 Making API call to:', `${this.apiEndpoint}?key=${this.apiKey.substring(0, 20)}...`);
        console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        
        console.log('📥 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API error response:', errorData);
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Full accessibility check response:', data);
        
        // Check if response is valid
        if (!data.candidates || !data.candidates[0]) {
            console.error('No candidates in response:', data);
            throw new Error('No response candidates from API');
        }
        
        if (!data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            console.error('Invalid response structure:', data.candidates[0]);
            throw new Error('Invalid response structure');
        }
        
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📨 AI RESPONSE RECEIVED:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(aiResponse);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Parse the response
        const parsed = this.parseRecommendations(aiResponse);
        console.log('✅ Parsed recommendations:', parsed);
        return parsed;
    }
    
    parseRecommendations(aiResponse) {
        const suggestions = [];
        const lines = aiResponse.split('\n');
        
        for (const line of lines) {
            // Look for lines with format: - "phrase" | reason
            const match = line.match(/[•\-*]\s*[""](.+?)[""](?:\s*\||\s*-)\s*(.+)/);
            if (match) {
                suggestions.push({
                    text: match[1].trim(),
                    reason: match[2].trim()
                });
            }
        }
        
        // Fallback if parsing fails
        if (suggestions.length === 0) {
            return this.getRuleBasedRecommendationsData();
        }
        
        const message = `I've analyzed the current accessibility settings. Here are my top recommendations:`;
        return { message, suggestions };
    }
    
    provideRuleBasedRecommendations() {
        const data = this.getRuleBasedRecommendationsData();
        this.addMessageWithSuggestions(data.message, data.suggestions);
    }
    
    getRuleBasedRecommendationsData() {
        const suggestions = [];
        
        // Check each setting using thresholds from OPTIMAL_SETTINGS in ai-config.js
        if (this.currentSettings.fontSize < OPTIMAL_SETTINGS.fontSize.min && !this.recentlyApplied.has('fontSize')) {
            suggestions.push({
                text: 'Increase font size',
                reason: 'Reduces eye strain and improves readability'
            });
        }
        
        if (this.currentSettings.contrast === 'normal' && !this.recentlyApplied.has('contrast')) {
            suggestions.push({
                text: 'Enable high contrast mode',
                reason: 'Makes text more visible for users with vision impairments'
            });
        }
        
        if (this.currentSettings.lineHeight < OPTIMAL_SETTINGS.lineHeight.min && !this.recentlyApplied.has('lineHeight')) {
            suggestions.push({
                text: 'Increase text line height',
                reason: 'Improves reading flow and helps track lines'
            });
        }
        
        if (this.currentSettings.spacing < OPTIMAL_SETTINGS.spacing.min && !this.recentlyApplied.has('spacing')) {
            suggestions.push({
                text: 'Add more space between sections',
                reason: 'Reduces visual clutter and improves scannability'
            });
        }
        
        if (suggestions.length === 0) {
            return {
                message: 'Your accessibility settings are well optimized! All settings are at or near recommended levels.',
                suggestions: []
            };
        }
        
        const message = `I've checked the current accessibility settings. Here's what I recommend:`;
        return { message, suggestions: suggestions.slice(0, 3) }; // Max 3 suggestions
    }
    
    addMessageWithSuggestions(text, suggestions) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <circle cx="12" cy="17" r="1"></circle>
           </svg>`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        // Add suggestions as buttons
        if (suggestions && suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'message-suggestions';
            
            suggestions.forEach(suggestion => {
                const btn = document.createElement('button');
                btn.className = 'suggestion-btn';
                btn.setAttribute('data-suggestion', suggestion.text);
                btn.textContent = suggestion.text;
                if (suggestion.reason) {
                    btn.setAttribute('title', suggestion.reason);
                }
                suggestionsDiv.appendChild(btn);
            });
            
            content.appendChild(suggestionsDiv);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    async getWCAGRecommendations(pageAnalysis) {
        console.log('🔍 Getting WCAG recommendations (excluding already applied)');
        console.log('📊 Applied improvements:', this.appliedImprovements);
        
        // Use prompt from ai-config.js with real page data  
        const prompt = AI_PROMPTS.getAnalysisPrompt(this.currentSettings, pageAnalysis);
        
        // Add constraint to not repeat already applied improvements
        const enhancedPrompt = prompt + `\n\nIMPORTANT: Do NOT recommend any of these already-applied improvements:\n${this.appliedImprovements.map(imp => `- ${imp}`).join('\n')}\n\nOnly suggest NEW improvements not yet applied.`;
        
        console.log('📤 Sending to Gemini:', enhancedPrompt.substring(0, 500) + '...');

        const requestBody = {
            contents: [{
                role: 'user',
                parts: [{ text: enhancedPrompt }]
            }],
            generationConfig: AI_CONFIG.generationConfig
        };
        
        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📥 API response:', data);
        
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]) {
            throw new Error('Invalid API response');
        }
        
        const aiResponse = data.candidates[0].content.parts[0].text;
        console.log('📨 AI response:', aiResponse);
        
        // Parse recommendations with priority levels
        return this.parseWCAGRecommendations(aiResponse);
    }
    
    parseWCAGRecommendations(aiResponse) {
        const recommendations = [];
        const lines = aiResponse.split('\n');
        
        for (const line of lines) {
            // Match format: 🔴 Action | Explanation OR just '🔴 Action'
            let match = line.match(/(🔴|🟡|🟢)\s*(.+?)\s*\|\s*(.+)/);
            if (match) {
                const priority = match[1];
                const action = match[2].trim();
                const explanation = match[3].trim();
                recommendations.push({ priority, action, explanation, fullText: `${priority} ${action}` });
                continue;
            }

            match = line.match(/(🔴|🟡|🟢)\s*(.+)/);
            if (match) {
                const priority = match[1];
                const action = match[2].trim();
                const explanation = '';
                recommendations.push({ priority, action, explanation, fullText: `${priority} ${action}` });
            }
        }
        
        console.log('✅ Parsed recommendations:', recommendations);
        return recommendations;
    }
    
    showRecommendations(recommendations) {
        console.log('📋 Showing recommendations:', recommendations);
        // Replace current recommendations with the new, deduped list
        this.currentRecommendations = recommendations || [];
        // Sort recommendations by priority: 🔴 > 🟡 > 🟢
        const priorityOrder = { '🔴': 3, '🟡': 2, '🟢': 1 };
        recommendations.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));

        // Create message with educational intro and a compact summary header
        const counts = recommendations.reduce((acc, r) => {
            if (r.priority === '🔴') acc.critical++;
            else if (r.priority === '🟡') acc.important++;
            else if (r.priority === '🟢') acc.enhancement++;
            return acc;
        }, { critical: 0, important: 0, enhancement: 0 });

        let message = `<p><strong>✓ Analysis Complete!</strong> I found <strong>${recommendations.length}</strong> accessibility recommendation${recommendations.length !== 1 ? 's' : ''}:</p>`;
        message += `<p class="rec-summary">Summary: ${counts.critical} Critical, ${counts.important} Important, ${counts.enhancement} Enhancements</p>`;

        // Add each recommendation with WHERE and WHY
        const items = recommendations.map((rec, index) => {
            const priorityLabel = rec.priority === '🔴' ? 'Critical' : rec.priority === '🟡' ? 'Important' : 'Enhancement';
            
            // Parse action to extract what and where
            const actionParts = this.parseRecommendationAction(rec.action);
            
            return `
                <div class="recommendation-item" data-index="${index}">
                    <div class="recommendation-header">
                        <span class="priority-badge">${rec.priority} ${priorityLabel}</span>
                    </div>
                    <p class="recommendation-what"><strong>What:</strong> ${actionParts.what}</p>
                    ${actionParts.where ? `<p class="recommendation-where"><strong>Where:</strong> ${actionParts.where}</p>` : ''}
                    <p class="recommendation-why"><strong>Why:</strong> ${rec.explanation}</p>
                    <button class="apply-btn" data-index="${index}" data-action="${rec.action}">
                        ✓ Apply This Change
                    </button>
                </div>
            `;
        }).join('');
        
        // (Bulk-apply button removed — apply-all flow disabled in UI)
        message += '<div class="recommendations-list">' + items + '</div>';
        
        this.addMessage(message, 'bot');
        
        // Attach click handlers
        setTimeout(() => {
            document.querySelectorAll('.apply-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    const action = e.target.getAttribute('data-action');
                    this.applyRecommendation(index, action);
                });
            });
            // Bulk apply removed — no .apply-all-btn in UI
        }, 100);
    }
    
    parseRecommendationAction(action) {
        // Parse action to extract WHAT needs to change and WHERE on the page
        const lowerAction = action.toLowerCase();
        let what = action;
        let where = '';
        
        // Detect page locations
        if (lowerAction.includes('image')) {
            const match = action.match(/(\d+)\s*images?/);
            if (match) {
                where = `Throughout the page (${match[1]} images affected)`;
                what = action;
            } else {
                where = 'All images across the site';
            }
        } else if (lowerAction.includes('heading')) {
            where = 'Page structure (navigation and content organization)';
        } else if (lowerAction.includes('text') || lowerAction.includes('font')) {
            where = 'All text content on the page';
        } else if (lowerAction.includes('contrast')) {
            where = 'Overall page color scheme';
        } else if (lowerAction.includes('spacing')) {
            where = 'All sections and content blocks';
        } else if (lowerAction.includes('button') || lowerAction.includes('link')) {
            where = 'Interactive elements (buttons and links)';
        }
        
        return { what, where };
    }
    
    applyRecommendation(index, action) {
        console.log(`✅ Applying recommendation ${index}: ${action}`);
        
        const rec = this.currentRecommendations[index];
        if (!rec) {
            console.error('Recommendation not found:', index);
            return;
        }
        
        // Mark as applied
        // We'll mark as applied after a successful inline fix
        
        // If this recommendation came from axe and targets nodes, prefer node-level fixer
        let applied = false;
        if (rec.nodes && rec.nodes.length > 0) {
            try {
                applied = this.applyAxeFix(rec);
            } catch (e) {
                console.warn('applyAxeFix error', e);
                applied = false;
            }
        }

        // Determine what to apply based on action keywords (fallback)
        const lowerAction = action.toLowerCase();
        
        if (lowerAction.includes('text') && (lowerAction.includes('read') || lowerAction.includes('size') || lowerAction.includes('easier'))) {
            console.log('🔧 Increasing font size...');
            this.adjustFontSize('increase');
            applied = true;
        } else if (lowerAction.includes('contrast')) {
            console.log('🔧 Enabling high contrast...');
            this.adjustContrast('high');
            applied = true;
        } else if (lowerAction.includes('spacing') || lowerAction.includes('space')) {
            console.log('🔧 Increasing spacing...');
            this.adjustSpacing('increase');
            applied = true;
        } else if (lowerAction.includes('line height') || lowerAction.includes('line-height')) {
            console.log('🔧 Increasing line height...');
            this.adjustLineHeight('increase');
            applied = true;
        }
        
        if (applied) {
            // Mark as applied (avoid duplicate suggestions later)
            if (rec.fullText) this.appliedImprovements.push(rec.fullText);

            // Remove from current recommendations
            this.currentRecommendations.splice(index, 1);

            // Show confirmation
            this.addMessage(`✅ <strong>Applied:</strong> ${rec.action}<br><small>This improvement is now active for your browser session. Settings saved.</small>`, 'bot');

            // Show remaining actionable recommendations (if any)
            const actionableRecs = this.currentRecommendations.filter(r => this.isActionable(r.action));
            if (actionableRecs.length > 0) {
                setTimeout(() => {
                    this.addMessage(`<p><strong>Remaining actionable recommendations (${actionableRecs.length}):</strong></p>`, 'bot');
                    this.showRecommendations(actionableRecs);
                }, 500);
            } else {
                // No more actionable items. If there are manual tasks, show them; otherwise show a single final message.
                setTimeout(() => {
                    if (this.manualTasks.length > 0) {
                        this.showManualTasksSummary();
                    } else {
                        this.addMessage('✅ All automatic improvements have been applied. Click "Re-run Analysis" to verify changes or to look for further issues.', 'bot');
                        // update button label to indicate a new analysis can be run
                        if (this.checkBtn) this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Re-run Analysis';
                    }
                }, 500);
            }
        } else {
            // Collect manual task instead of showing immediately
            this.manualTasks.push(rec);
            this.currentRecommendations.splice(index, 1);
            
            // Continue with remaining actionable recommendations
            const actionableRecs = this.currentRecommendations.filter(r => this.isActionable(r.action));
            if (actionableRecs.length > 0) {
                this.showRecommendations(actionableRecs);
            } else {
                // No more actionable items, show manual tasks summary
                this.showManualTasksSummary();
            }
        }
    }

    // Apply a single recommendation object programmatically. Returns true if an automatic fix was applied.
    applyRec(rec) {
        if (!rec || !rec.action) return false;
        const action = rec.action;
        const lowerAction = action.toLowerCase();
        let applied = false;

        if ((lowerAction.includes('text') && (lowerAction.includes('read') || lowerAction.includes('size') || lowerAction.includes('easier'))) ||
            (lowerAction.includes('font') && lowerAction.includes('size')) ||
            (lowerAction.includes('increase') && lowerAction.includes('size')) ||
            (lowerAction.includes('make') && lowerAction.includes('read'))) {
            this.adjustFontSize('increase');
            applied = true;
        } else if (lowerAction.includes('contrast') || lowerAction.includes('color contrast') || lowerAction.includes('high contrast')) {
            this.adjustContrast('high');
            applied = true;
        } else if (lowerAction.includes('spacing') || lowerAction.includes('space')) {
            this.adjustSpacing('increase');
            applied = true;
        } else if (lowerAction.includes('line height') || lowerAction.includes('line-height')) {
            this.adjustLineHeight('increase');
            applied = true;
        }

        if (applied) {
            // mark as applied to avoid repeats
            if (rec.fullText) this.appliedImprovements.push(rec.fullText);
        }

        return applied;
    }

    // Apply all actionable recommendations currently stored in `this.currentRecommendations`
    applyAllActionable() {
        if (!this.currentRecommendations || this.currentRecommendations.length === 0) return;

        const actionable = this.currentRecommendations.filter(r => this.isActionable(r.action));
        if (actionable.length === 0) {
            this.addMessage('No actionable recommendations to apply.', 'bot');
            return;
        }

        let appliedCount = 0;
        // Use a copy to avoid mutation issues
        const copy = actionable.slice();
        copy.forEach(rec => {
            const applied = this.applyRec(rec);
            if (applied) appliedCount++;
            // remove from currentRecommendations
            const idx = this.currentRecommendations.findIndex(r => r.fullText === rec.fullText && r.action === rec.action);
            if (idx !== -1) this.currentRecommendations.splice(idx, 1);
        });

        this.addMessage(`✅ Applied ${appliedCount} automatic improvement${appliedCount !== 1 ? 's' : ''}.`, 'bot');

        // After applying, either show remaining actionable recommendations or manual summary
        const remainingActionable = this.currentRecommendations.filter(r => this.isActionable(r.action));
        if (remainingActionable.length > 0) {
            setTimeout(() => this.showRecommendations(remainingActionable), 400);
        } else {
            // No remaining actionable items
            setTimeout(() => {
                if (this.manualTasks.length > 0) {
                    this.showManualTasksSummary();
                } else {
                    this.addMessage('✅ All automatic improvements have been applied. Click "Re-run Analysis" to verify changes or to continue.', 'bot');
                    if (this.checkBtn) this.checkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Re-run Analysis';
                }
            }, 400);
        }
    }

    isActionable(action) {
        const lowerAction = action.toLowerCase();
        return (lowerAction.includes('text') && (lowerAction.includes('read') || lowerAction.includes('size') || lowerAction.includes('easier'))) ||
               (lowerAction.includes('font') && lowerAction.includes('size')) ||
               lowerAction.includes('contrast') ||
               lowerAction.includes('spacing') || lowerAction.includes('space') ||
               lowerAction.includes('line height') || lowerAction.includes('line-height') ||
               lowerAction.includes('make') && lowerAction.includes('read') ||
               lowerAction.includes('increase') && lowerAction.includes('size');
    }

    showManualTasksSummary() {
        if (this.manualTasks.length === 0) {
            this.addMessage('✅ All automatic improvements applied. Click "Re-run Analysis" to verify changes or to find remaining issues that require manual work.', 'bot');
            return;
        }

        let message = `📝 <strong>Manual Implementation Needed</strong><br>The following ${this.manualTasks.length} improvement${this.manualTasks.length > 1 ? 's require' : ' requires'} developer action:<br><br>`;
        
        this.manualTasks.forEach((task, i) => {
            message += `${i + 1}. <strong>${task.action}</strong><br><small>${task.explanation}</small><br><br>`;
        });
        
        message += `<small>✅ All automatic improvements have been applied. Once these manual tasks are completed, this page will be fully WCAG 2.1 AA compliant.</small>`;
        
        this.addMessage(message, 'bot');
        this.manualTasks = []; // Clear manual tasks
    }

    showFallbackRecommendations() {
        console.log('📋 Showing fallback recommendations');
        
        const fallbackRecs = [
            {
                priority: '🟡',
                action: 'Make text easier to read',
                explanation: 'WCAG 1.4.4: Increases font size by 20% for better readability',
                fullText: '🟡 Make text easier to read'
            },
            {
                priority: '🟡',
                action: 'Increase contrast',
                explanation: 'WCAG 1.4.3: High contrast mode helps users with low vision',
                fullText: '🟡 Increase contrast'
            },
            {
                priority: '🟢',
                action: 'Add more spacing',
                explanation: 'WCAG 1.4.12: More space makes content easier to scan',
                fullText: '🟢 Add more spacing'
            }
        ];
        
        this.showRecommendations(fallbackRecs);
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Display user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator - let AI respond first
        this.typing.style.display = 'flex';
        this.scrollToBottom();
        
        // Check if API key is set
        if (!this.apiKey) {
            this.typing.style.display = 'none';
            
            // Offer to set API key
            const keyPrompt = document.createElement('div');
            keyPrompt.style.cssText = 'background:#fff3cd;padding:15px;border-radius:8px;margin:10px 0;border:1px solid #ffc107;';
            keyPrompt.innerHTML = `
                <div style="margin-bottom:10px;color:#856404;font-weight:bold;">🔑 API Key Required</div>
                <div style="margin-bottom:10px;color:#856404;font-size:14px;">Enter your Google Gemini API key to enable AI responses:</div>
                <input type="password" id="apiKeyInput" placeholder="AIzaSy..." style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;margin-bottom:8px;font-family:monospace;">
                <button onclick="chatbot.setApiKey()" style="background:#1a5490;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;width:100%;">Save API Key</button>
                <div style="margin-top:8px;font-size:12px;color:#856404;">
                    Get a free key: <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color:#1a5490;">Google AI Studio</a>
                </div>
            `;
            this.messages.appendChild(keyPrompt);
            this.scrollToBottom();
            
            // Still provide rule-based response
            this.handleRuleBasedResponse(message);
            return;
        }
        
        try {
            const response = await this.getAIResponse(message);
            this.typing.style.display = 'none';
            this.addMessage(response, 'bot');
            
            // After AI explains, apply the changes based on BOTH user message and AI response
            setTimeout(() => {
                this.detectAndApplyChanges(message, response);
            }, 500); // Small delay so user sees the explanation first
        } catch (error) {
            console.error('AI Error:', error);
            console.error('Error details:', error.message);
            this.typing.style.display = 'none';
            
            // Don't show error message - just handle the request using rules
            // The rule-based response will be more helpful than an error message
            console.log('🔄 Using rule-based fallback (AI unavailable)');
            this.handleRuleBasedResponse(message);
        }
    }
    
    async getAIResponse(userMessage) {
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });
        
        // Use system prompt from ai-config.js
        const systemPrompt = AI_PROMPTS.getConversationPrompt(this.currentSettings);

        const requestBody = {
            contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                ...this.conversationHistory
            ],
            generationConfig: AI_CONFIG.generationConfig
        };
        
        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Full API response:', data);
        
        // Check if response is valid
        if (!data.candidates || !data.candidates[0]) {
            console.error('No candidates in response:', data);
            throw new Error('No response candidates from API');
        }
        
        // Check if response was blocked
        if (data.candidates[0].finishReason === 'SAFETY' || data.candidates[0].finishReason === 'RECITATION') {
            console.warn('Response blocked:', data.candidates[0].finishReason);
            throw new Error('Response blocked by safety filters');
        }
        
        if (!data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            console.error('Invalid response structure:', data.candidates[0]);
            throw new Error('Invalid response structure');
        }
        
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Check if response was cut off
        if (data.candidates[0].finishReason === 'MAX_TOKENS') {
            console.warn('Response was truncated due to token limit');
        }
        
        console.log('AI Response:', aiResponse);
        
        this.conversationHistory.push({
            role: 'model',
            parts: [{ text: aiResponse }]
        });
        
        return aiResponse;
    }
    
    handleRuleBasedResponse(message) {
        const messageLower = message.toLowerCase();
        
        console.log('🔍 Checking rule patterns for:', messageLower);
        
        // Check each pattern from RULE_PATTERNS in ai-config.js
        for (const [key, rule] of Object.entries(RULE_PATTERNS)) {
            // Check if any keyword matches
            for (const keyword of rule.keywords) {
                if (messageLower.includes(keyword.toLowerCase())) {
                    console.log(`✅ Matched pattern "${key}" with keyword "${keyword}"`);
                    
                    // Display educational response
                    this.addMessage(rule.response, 'bot');
                    
                    // Apply the change after delay
                    setTimeout(() => {
                        console.log(`⚡ Applying change: ${rule.action}`);
                        switch(rule.action) {
                            case 'fontSize':
                                this.adjustFontSize('increase');
                                break;
                            case 'contrast':
                                this.adjustContrast('high');
                                break;
                            case 'lineHeight':
                                this.adjustLineHeight('increase');
                                break;
                            case 'spacing':
                                this.adjustSpacing('increase');
                                break;
                            case 'reset':
                                this.resetSettings();
                                break;
                        }
                    }, GUARDRAILS.explanationDelay);
                    return true; // Successfully handled
                }
            }
        }
        
        // General help if no pattern matched
        console.log('❌ No pattern matched - showing help');
        this.addMessage(
            "I can help you adjust:\n• Font size (try: 'text is too small')\n• Contrast (try: 'low contrast')\n• Line height (try: 'increase text line height')\n• Element spacing (try: 'more spacing')\n\nWhat would you like to adjust?",
            'bot'
        );
        return false;
    }
    
    detectAndApplyChanges(userMessage, aiResponse = '') {
        const messageLower = userMessage.toLowerCase();
        const responseLower = aiResponse.toLowerCase();
        
        // Combine both user message and AI response for better detection
        const combinedText = messageLower + ' ' + responseLower;
        
        // Font size - check user message for readability issues AND AI response for intent
        if ((messageLower.includes('cant read') || messageLower.includes('can\'t read') || 
             messageLower.includes('cannot read') || messageLower.includes('hard to read') ||
             messageLower.includes('too small') || messageLower.includes('text is small') ||
             combinedText.includes('font') && combinedText.includes('size')) ||
            (combinedText.includes('text') && (combinedText.includes('small') || combinedText.includes('big') || combinedText.includes('larger'))) ||
            combinedText.includes('increase font') ||
            responseLower.includes('increase the font size') ||
            responseLower.includes('making the change')) {
            console.log('🔤 Applying font size increase');
            this.adjustFontSize('increase');
            this.recentlyApplied.add('fontSize');
            setTimeout(() => this.recentlyApplied.delete('fontSize'), GUARDRAILS.recentChangeTimeout);
            return true;
        }
        
        // Contrast
        if (combinedText.includes('contrast') || 
            combinedText.includes('enable high contrast') ||
            (messageLower.includes('hard to see') && responseLower.includes('contrast'))) {
            console.log('🎨 Applying contrast adjustment');
            this.adjustContrast('high');
            this.recentlyApplied.add('contrast');
            setTimeout(() => this.recentlyApplied.delete('contrast'), GUARDRAILS.recentChangeTimeout);
            return true;
        }
        
        // Line height (between lines of text)
        if ((combinedText.includes('line') && combinedText.includes('height')) ||
            combinedText.includes('text line height') ||
            (combinedText.includes('line') && combinedText.includes('spacing') && !combinedText.includes('element'))) {
            console.log('📏 Applying line height adjustment');
            this.adjustLineHeight('increase');
            this.recentlyApplied.add('lineHeight');
            setTimeout(() => this.recentlyApplied.delete('lineHeight'), GUARDRAILS.recentChangeTimeout);
            return true;
        }
        
        // Element spacing (between sections/elements)
        if ((combinedText.includes('space') && combinedText.includes('section')) ||
            (combinedText.includes('element') && combinedText.includes('spacing')) ||
            combinedText.includes('add more space between sections') ||
            combinedText.includes('more spacing')) {
            console.log('↔️ Applying element spacing adjustment');
            this.adjustSpacing('increase');
            this.recentlyApplied.add('spacing');
            setTimeout(() => this.recentlyApplied.delete('spacing'), GUARDRAILS.recentChangeTimeout);
            return true;
        }
        
        // General spacing/crowding (apply element spacing)
        if (combinedText.includes('crowded') || combinedText.includes('cramped') || 
            combinedText.includes('tight') || combinedText.includes('squished')) {
            console.log('↔️ Applying spacing for crowding');
            this.adjustSpacing('increase');
            this.recentlyApplied.add('spacing');
            setTimeout(() => this.recentlyApplied.delete('spacing'), GUARDRAILS.recentChangeTimeout);
            return true;
        }
        
        // Reset
        if (combinedText.includes('reset') || combinedText.includes('default') ||
            combinedText.includes('normal') || combinedText.includes('original') ||
            combinedText.includes('undo')) {
            console.log('🔄 Resetting settings');
            this.resetSettings();
            this.recentlyApplied.clear();
            return true;
        }
        
        return false;
    }
    
    parseAndApplyAccessibilityChanges(userMessage, aiResponse) {
        const messageLower = userMessage.toLowerCase();
        const responseLower = aiResponse.toLowerCase();
        
        // Check if AI suggested font size change
        if ((messageLower.includes('font') || messageLower.includes('text') || 
             messageLower.includes('small') || messageLower.includes('big')) &&
            (responseLower.includes('increase') || responseLower.includes('larger') ||
             responseLower.includes('bigger'))) {
            this.adjustFontSize('increase');
        }
        
        // Check if AI suggested contrast change
        if ((messageLower.includes('contrast') || messageLower.includes('hard to read')) &&
            (responseLower.includes('contrast') || responseLower.includes('darker'))) {
            this.adjustContrast('high');
        }
        
        // Check if AI suggested spacing change
        if ((messageLower.includes('spac') || messageLower.includes('crowd')) &&
            (responseLower.includes('spac') || responseLower.includes('room'))) {
            this.adjustSpacing('increase');
        }
    }
    
    adjustFontSize(action) {
        if (action === 'increase') {
            this.currentSettings.fontSize = Math.min(this.currentSettings.fontSize + 0.1, 1.5);
        } else if (action === 'decrease') {
            this.currentSettings.fontSize = Math.max(this.currentSettings.fontSize - 0.1, 0.8);
        }
        
        // Remove test violation class
        document.body.classList.remove('test-small-font');
        
        // Clear test lab violation from localStorage
        const testSettings = localStorage.getItem('testLabSettings');
        if (testSettings) {
            const settings = JSON.parse(testSettings);
            if (settings.fontSize && settings.fontSize < 16) {
                settings.fontSize = 16;
                localStorage.setItem('testLabSettings', JSON.stringify(settings));
            }
        }
        
        // Set CSS variable for proper font size
        document.documentElement.style.setProperty('--font-scale', this.currentSettings.fontSize);
        document.documentElement.style.setProperty('--test-font-size', '');
        
        this.saveSettings();
    }
    
    adjustLineHeight(action) {
        if (action === 'increase') {
            this.currentSettings.lineHeight = Math.min(this.currentSettings.lineHeight + 0.1, 2.0);
        } else if (action === 'decrease') {
            this.currentSettings.lineHeight = Math.max(this.currentSettings.lineHeight - 0.1, 1.2);
        }
        document.documentElement.style.setProperty('--line-height', this.currentSettings.lineHeight);
        this.saveSettings();
    }
    
    adjustLetterSpacing(action) {
        if (action === 'increase') {
            this.currentSettings.letterSpacing = Math.min(this.currentSettings.letterSpacing + 0.5, 3);
        } else if (action === 'decrease') {
            this.currentSettings.letterSpacing = Math.max(this.currentSettings.letterSpacing - 0.5, 0);
        }
        document.documentElement.style.setProperty('--letter-spacing', this.currentSettings.letterSpacing);
        this.saveSettings();
    }
    
    adjustContrast(mode) {
        // Remove test violation
        document.body.classList.remove('test-low-contrast');
        document.documentElement.style.setProperty('--test-contrast', '');
        
        if (mode === 'high') {
            document.body.classList.add('high-contrast');
            this.currentSettings.contrast = 'high';
        } else {
            document.body.classList.remove('high-contrast');
            this.currentSettings.contrast = 'normal';
        }
        this.saveSettings();
    }
    
    adjustSpacing(action) {
        if (action === 'increase') {
            this.currentSettings.spacing = Math.min(this.currentSettings.spacing + 0.1, 1.5);
        } else if (action === 'decrease') {
            this.currentSettings.spacing = Math.max(this.currentSettings.spacing - 0.1, 0.8);
        }
        
        // Remove test violation
        document.body.classList.remove('test-tight-spacing');
        document.documentElement.style.setProperty('--test-spacing', '');
        document.documentElement.style.setProperty('--test-line-height', '');
        
        document.documentElement.style.setProperty('--spacing-scale', this.currentSettings.spacing);
        this.saveSettings();
    }
    
    resetSettings() {
        this.currentSettings = {
            fontSize: 1,
            lineHeight: 1.6,
            letterSpacing: 0,
            contrast: 'normal',
            spacing: 1
        };
        
        document.documentElement.style.setProperty('--font-scale', 1);
        document.documentElement.style.setProperty('--line-height', 1.6);
        document.documentElement.style.setProperty('--letter-spacing', 0);
        document.documentElement.style.setProperty('--spacing-scale', 1);
        document.body.classList.remove('high-contrast');
        
        this.saveSettings();
    }
    
    saveSettings() {
        localStorage.setItem('accessibility-settings', JSON.stringify(this.currentSettings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
            this.currentSettings = JSON.parse(saved);
            document.documentElement.style.setProperty('--font-scale', this.currentSettings.fontSize);
            document.documentElement.style.setProperty('--line-height', this.currentSettings.lineHeight);
            document.documentElement.style.setProperty('--letter-spacing', this.currentSettings.letterSpacing);
            document.documentElement.style.setProperty('--spacing-scale', this.currentSettings.spacing);
            
            if (this.currentSettings.contrast === 'high') {
                document.body.classList.add('high-contrast');
            }
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' 
            ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <circle cx="12" cy="17" r="1"></circle>
               </svg>`
            : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
               </svg>`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    setApiKey() {
        const input = document.getElementById('apiKeyInput');
        const key = input?.value.trim();
        
        if (!key) {
            alert('Please enter an API key');
            return;
        }
        
        if (!key.startsWith('AIzaSy')) {
            alert('Invalid API key format. Gemini API keys start with "AIzaSy"');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('geminiApiKey', key);
        this.apiKey = key;
        
        // Show success message
        this.addMessage('✅ API key saved! You can now use AI-powered responses. Try asking for accessibility improvements.', 'bot');
        
        // Remove the key prompt
        const keyPrompt = input.closest('div[style*="background:#fff3cd"]');
        if (keyPrompt) keyPrompt.remove();
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new AccessibilityChatbot();
    window.accessibilityChatbot = window.chatbot; // Keep old reference for compatibility
    console.log('Accessibility Chatbot initialized');
    console.log('To enable AI responses, add your Gemini API key to the AccessibilityChatbot class');
});
