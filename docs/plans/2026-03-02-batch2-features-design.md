# Batch 2 Features Design

## 1. "Uses" page
New `uses.md`, `layout: default`. Categories in `<details>` accordions: Editor & Terminal, Hardware, Apps & Productivity, Languages & Frameworks.

## 2. "Now" page
New `now.md`, `layout: default`. Sections: Working on, Reading, Thinking about. "Last updated" date at top.

## 3. Animated page transitions
View Transitions API in `default.html`. Fade out old page, fade in new. Progressive enhancement. ~15 lines JS.

## 4. Proper branded OG image
Replace placeholder. Dark bg, Space Grotesk title, cyan accent. 1200x630 via wkhtmltoimage.

## 5. Project demo embeds
Add `.demo-embed` containers in case study pages. Responsive aspect ratio. Placeholder structure for GIFs/videos.

## 6. Interactive network graph (landing canvas)
Replace abstract canvas with project+skill network graph. Nodes float, respond to mouse, connections highlight. Pure canvas API in `canvas.js`.

## 7. AI chatbot (/ask page)
New `ask.md` with chat UI. Calls Cloudflare Worker proxy → Cloudflare Workers AI. System prompt with site context. Worker is ~20 lines, deployed separately.
