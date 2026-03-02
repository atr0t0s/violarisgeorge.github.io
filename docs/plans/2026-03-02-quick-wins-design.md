# Quick Wins Design

## Features

### 1. Reading Time on Lab Articles
- Calculate in `article.html` using Liquid: `content | number_of_words` / 200 wpm
- Display as meta line below `<h1>`: `8 min read`
- Styled with muted text, small font

### 2. Auto-Generated Table of Contents
- Pure JS in `article.html` — scans h2/h3 headings
- Sticky sidebar on desktop (right side), collapses to inline on mobile
- Adds anchor IDs to headings, highlights current section on scroll
- Only shows if article has 3+ headings

### 3. Copy Button on Code Blocks
- JS script adds "Copy" button to every `<pre><code>` block
- Positioned top-right of code block
- Shows "Copied!" feedback briefly
- Styled to match theme (dark/light aware)

### 4. Site-Wide OG Image
- Add default `og:image` in `_config.yml` for `jekyll-seo-tag`
- Add `twitter:card` and `twitter:image` meta tags
- Create a simple branded OG image (1200x630)

### 5. Timestamps on Lab Articles
- Add `date:` frontmatter to all 7 lab articles
- Display in article meta line: `Mar 2, 2026 · 8 min read`
- Show dates in `lab.md` listing too

### 6. Timestamps on Blog Posts
- Add date spans to each entry in `blog.md`
- Subtle muted text below/beside titles
