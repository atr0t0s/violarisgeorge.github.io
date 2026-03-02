---
layout: default
title: AI News
---

# AI News

Latest artificial intelligence news, updated hourly.

<div id="news-container">
  <div class="news-grid" id="news-grid"></div>
  <div class="news-loading" id="news-loading">
    <div class="news-skeleton"></div>
    <div class="news-skeleton"></div>
    <div class="news-skeleton"></div>
    <div class="news-skeleton"></div>
    <div class="news-skeleton"></div>
    <div class="news-skeleton"></div>
  </div>
  <div class="news-empty" id="news-empty" style="display:none">No articles yet. Check back soon.</div>
  <div class="news-error" id="news-error" style="display:none">Could not load articles. Please try again later.</div>
  <button class="news-load-more" id="news-load-more" style="display:none">Load more</button>
</div>

<script src="{{ '/assets/js/news.js' | relative_url }}" defer></script>
