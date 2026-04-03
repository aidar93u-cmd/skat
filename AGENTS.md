# AGENTS.md - SKAT Website

This is a static HTML/CSS/JS website project. No build system, test framework, or linter is configured.

## Project Structure

```
skat/
├── index.html, index1.html, index2.html    # Main pages
├── product1.html, catalog1.html             # Product/catalog pages
├── contacts1.html, contacts2.html           # Contact pages
├── js/
│   ├── script.js           # Main application JavaScript
│   ├── jquery-3.7.1.min.js # jQuery (minified)
│   ├── swiper-bundle.min.js# Swiper slider library
│   ├── aos.js              # Animate On Scroll library
│   └── jquery.inputmask.bundle.js
├── styles/
│   ├── styles.css          # Main stylesheet
│   ├── aos.css             # AOS animations
│   └── swiper-bundle.min.css
├── images/                 # SVG icons, PNG images, hero images
└── fonts/                  # WOFF font files
```

## Build / Development Commands

This project has no build system. For development:

- **Live Server**: Use a local server (e.g., VS Code Live Server extension, `npx serve`, or Python `python -m http.server`)
- **No linting**: No JavaScript/CSS linters configured
- **No tests**: No test framework present

To add a build system later, add package.json with:
```bash
npm init -y
npm install --save-dev eslint prettier stylelint
```

Then add scripts to package.json:
```json
{
  "scripts": {
    "lint": "eslint js/",
    "lint:fix": "eslint js/ --fix",
    "lint:css": "stylelint styles/*.css",
    "format": "prettier --write \"js/**\" \"styles/**\" \"*.html\""
  }
}
```

To run a single test (if testing is added):
```bash
npm test -- --testPathPattern=filename
```

## Code Style Guidelines

### General

- This is a vanilla JavaScript + CSS project using jQuery and Swiper
- Keep JavaScript minimal - prefer CSS solutions when possible
- Use semantic HTML5 elements
- All text content should be in Russian (the website is in Russian language)
- Variable/function names in code should be in English

### JavaScript (script.js)

- Use `const` and `let` - avoid `var`
- Use meaningful variable names in English (camelCase)
- Use function declarations or arrow functions consistently
- Wrap code in `DOMContentLoaded` event listener
- Check for library existence before initializing (e.g., `if (typeof Swiper === 'undefined') return`)
- Use early returns to avoid nested conditionals

```javascript
// Good
function initCatalogSwiper() {
  const element = document.querySelector('.swiper')
  if (!element) return
  // ...
}

// Bad
function initCatalogSwiper() {
  if (typeof Swiper !== 'undefined') {
    const element = document.querySelector('.swiper')
    if (element) {
      // nested code...
    }
  }
}
```

### CSS (styles/styles.css)

- Use BEM-like naming: `block__element--modifier`
- Keep responsive styles in same file using media queries
- Use CSS custom properties for colors/fonts where appropriate
- Order styles: base → layout → components → utilities

```css
/* Example BEM */
.button {}
.button--primary {}
.button__icon {}
```

### HTML

- Use proper semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Include `alt` attributes on images
- Use `aria-label` for icon buttons without text
- Set proper `lang` attribute on `<html>` element (use `lang="ru"` for Russian content)

### Error Handling

- Wrap DOM queries in null checks
- Check for undefined libraries before using them
- Use try/catch for any potentially failing operations
- Always verify elements exist before manipulating them

### File Organization

- Main JavaScript: `js/script.js`
- Main CSS: `styles/styles.css`
- All HTML pages in root directory
- Keep vendor/minified libraries in their respective folders

### Accessibility

- All interactive elements must be keyboard accessible
- Use appropriate ARIA attributes
- Ensure sufficient color contrast
- Provide alt text for all meaningful images

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Functions | camelCase, verb prefix | `initCatalogSwiper()`, `handleSubmit()` |
| Variables | camelCase, descriptive | `currentSlide`, `isMenuOpen` |
| CSS Classes | BEM naming | `header__logo`, `button--primary` |
| Constants | UPPER_SNAKE_CASE | `MAX_SLIDES`, `DEFAULT_DELAY` |
| Event handlers | on prefix | `onSubmit()`, `onClick()` |

### Import Patterns

This project doesn't use modules. Libraries are loaded via `<script>` tags in HTML:

```html
<!-- External libraries (CDN or local) -->
<script src="https://unpkg.com/swiper@11/swiper-bundle.min.js"></script>

<!-- Application code (last) -->
<script src="js/script.js"></script>
```

### Common Pitfalls to Avoid

1. **Don't use jQuery unless necessary** - Prefer vanilla JS for new code
2. **Don't forget null checks** - Always verify DOM elements exist
3. **Don't hardcode colors** - Use CSS custom properties when available
4. **Don't skip alt text** - Every image needs meaningful alt attribute
5. **Don't mix naming styles** - Keep CSS classes BEM-compliant
