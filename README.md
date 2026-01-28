# Excellence University Website

A modern, responsive university website featuring a clean, minimal design with interactive elements and AI-powered accessibility chatbot.

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd University-page
```

### 2. Set up API key (for AI chatbot - optional)
```bash
# Copy the template
cp api-key.example.js api-key.js

# Edit api-key.js and add your Gemini API key
# Get free key from: https://makersuite.google.com/app/apikey
```

**Note:** The chatbot works without an API key using rule-based responses. AI is optional.

### 3. Open in browser
```bash
# Just open index.html in your browser, or use a local server:
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

## 🔐 Security Notice

- `api-key.js` contains your private API key
- This file is in `.gitignore` and **won't be committed to Git**
- Never commit API keys to version control
- Use `api-key.example.js` as a template for team members

## Features

### 🎨 Design Elements
- **Modern & Minimal**: Clean design with professional color scheme
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, parallax scrolling, and interactive transitions
- **Custom SVG Assets**: Unique logo and placeholder images included

### 📱 Components Included

1. **Navigation Bar**
   - Fixed header with scroll effect
   - Responsive mobile menu with hamburger toggle
   - Active link highlighting based on scroll position

2. **Hero Section**
   - Full-screen banner with gradient overlay
   - Call-to-action buttons
   - Animated scroll indicator

3. **Statistics Section**
   - Animated counters that trigger on scroll
   - Key university metrics display

4. **About Section**
   - University history and mission
   - Feature highlights with icons
   - Campus image showcase

5. **Programs Section**
   - Grid of academic programs
   - Interactive hover effects
   - Quick links to detailed program pages

6. **Research Section**
   - Featured research projects
   - Category badges
   - Image galleries with descriptions

7. **Campus Life Section**
   - Photo grid with overlay effects
   - Student activities showcase
   - Hover interactions

8. **Testimonials Carousel**
   - Auto-rotating testimonials
   - Manual navigation controls
   - Keyboard accessibility (arrow keys)
   - Pause on hover

9. **Contact Section**
   - Contact information cards
   - Functional contact form
   - Form validation

10. **Footer**
    - Multi-column layout
    - Quick links and resources
    - Social media links
    - Copyright information

### 🚀 Interactive Features

- **Mobile Menu Toggle**: Animated hamburger menu for mobile devices
- **Smooth Scrolling**: Anchor links scroll smoothly to sections
- **Scroll-to-Top Button**: Appears after scrolling down
- **Animated Statistics**: Numbers count up when scrolling into view
- **Parallax Effect**: Hero section has subtle parallax scrolling
- **Form Submission**: Contact form with validation and success message
- **Hover Effects**: Interactive buttons and cards with ripple effects
- **Lazy Loading**: Images load as they enter viewport

## File Structure

```
University page/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Images and icons
    ├── logo.svg        # University logo
    ├── campus-main.jpg # Main campus image
    ├── research-1.jpg  # AI research image
    ├── research-2.jpg  # Climate research image
    ├── research-3.jpg  # Medical research image
    ├── campus-1.jpg    # Student activities
    ├── campus-2.jpg    # Sports facilities
    ├── campus-3.jpg    # Library
    ├── campus-4.jpg    # Housing
    ├── student-1.jpg   # Testimonial avatar
    ├── student-2.jpg   # Testimonial avatar
    └── student-3.jpg   # Testimonial avatar
```

## How to Use

1. **Open the Website**
   - Simply open `index.html` in any modern web browser
   - Or right-click and select "Open with Live Server" in VS Code

2. **Navigate**
   - Click navigation links to jump to sections
   - Use the mobile menu on smaller screens
   - Scroll naturally to explore content

3. **Customize**
   - Edit `index.html` to change content
   - Modify `styles.css` to adjust colors and styling
   - Update `script.js` to change interactive behavior
   - Replace images in the `assets/` folder with real photos

## Deployment to GitHub Pages

If you want to publish this static site to GitHub Pages, follow these steps:

1. Create a repository on GitHub and push this project to the `main` branch.
2. This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` which
   publishes the repository root to the `gh-pages` branch on each push to `main`.
3. Important security note about the Gemini API key:
   - Do NOT commit `api-key.js` to the repo — it is already listed in `.gitignore`.
   - For production, avoid embedding the Gemini API key into the client. Instead host a
     small server or serverless proxy that keeps the key in an environment variable and
     forwards requests from the client. This keeps the key secret.
   - If you still want the site to call Gemini directly (not recommended), you can make
     GitHub Actions create an `api-key.js` at build time from a repository secret, but
     that will expose the key in the published site. See `.github/workflows/deploy.yml` for
     an example commented step — only use it if you accept the security risk.

4. After pushing to `main`, GitHub Actions will run and deploy the site to the `gh-pages` branch.
   Enable GitHub Pages in the repository settings and select the `gh-pages` branch as source if needed.

## Color Scheme

- **Primary**: #1a5490 (Deep Blue)
- **Secondary**: #2c7cc1 (Light Blue)
- **Accent**: #f39c12 (Gold)
- **Dark**: #1a1a1a
- **Light**: #f8f9fa

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast text
- Focus indicators on interactive elements
 - Documentation: [WCAG detection & fixes](docs/WCAG_DETECTION.md) — explains how problems are detected and how CSS fixes are applied

## Performance Optimizations

- Debounced scroll events
- Intersection Observer for animations
- CSS transitions instead of JavaScript animations
- Efficient DOM manipulation

## Customization Tips

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1a5490;
    --secondary-color: #2c7cc1;
    --accent-color: #f39c12;
    /* ... */
}
```

### Replace Images
- Place your images in the `assets/` folder
- Update the `src` attributes in `index.html`
- Recommended image sizes:
  - Logo: 200x200px
  - Hero/Campus: 1200x800px
  - Research: 800x600px
  - Avatars: 200x200px

### Modify Content
- Edit text directly in `index.html`
- Add or remove sections as needed
- Update links to match your structure

## Future Enhancements

Consider adding:
- Backend integration for contact form
- Blog or news section
- Student/faculty portals
- Event calendar
- Virtual campus tour
- Online application system
- Search functionality
- Multi-language support

## Support

For questions or issues:
- Email: info@excellenceuniversity.edu
- Phone: +1 (555) 123-4567

---

© 2026 Excellence University. All rights reserved.
