# Portfolio Website for Vulnerabilities

## Objective
Create a premium, organized website to showcase security vulnerabilities found by the user, featuring smooth animations and easy content management.

## Tech Stack
- HTML5, CSS3 (Vanilla), JavaScript
- Google Fonts (Outfit or Inter)
- Lucide Icons (via CDN)
- GSAP for animations

## Key Features
1. **Entrance Animation**: 
   - A sequence where "3 brushes" (`gif.png`) move across the screen and disappear.
   - Smooth transition into the main content.
2. **Dashboard Layout**:
   - Left sidebar or top navigation with the logo (`logo.png`).
   - Main content area with a grid of vulnerability cards.
3. **Vulnerability Detail View**:
   - Integrated PDF viewer that matches the site's aesthetic.
   - Information about the vulnerability (title, technique).
4. **Simple Data Management**:
   - A `data.json` file to store vulnerability metadata (name, file path).

## Visual Style
- **Dark Mode**: High contrast with vibrant accents (e.g., cyber green or deep purple).
- **Glassmorphism**: Frosted glass effects for cards and sidebars.
- **Animations**: Subtle hover effects and smooth page transitions.

## Implementation Steps
1. Create `index.html` with basic structure.
2. Create `style.css` with premium design tokens.
3. Create `script.js` for dynamic content loading and GSAP animations.
4. Create `vulnerabilities.json` for easy management.
5. Implement the entrance animation using the provided assets.
