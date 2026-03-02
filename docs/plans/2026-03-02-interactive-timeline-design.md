# Interactive Timeline CV Design

Replace static CV with an interactive timeline. Scroll-reveal animations, expand/collapse details, downloadable PDF.

## Sections
1. Header — name, title, location, links, "Download CV" button
2. Summary — one paragraph
3. Timeline — vertical line, scroll-reveal entries, click to expand details
4. Earlier roles — compact one-liners
5. Writing & Publications
6. Education
7. Skills — tag pills

## Interactions
- Scroll reveal via existing `[data-reveal]` + IntersectionObserver
- Expand/collapse on click (CSS height transition)
- Download PDF button
