---
layout: default
title: Resources
---

<section class="resources-page">

  <header class="resources-header">
    <h1>Resources</h1>
    <p class="resources-tagline">A curated library I maintain for myself and anyone else who finds it useful. Heavy on AI, LLMs, crypto, security, and the places where software meets finance.</p>
    <p class="resources-count"><span id="resource-count">{{ site.data.resources | size }}</span> resources</p>
  </header>

  <div class="resources-controls">
    <input type="text" id="resource-search" class="resource-search" placeholder="Search resources..." autocomplete="off" />

    <div class="resource-filters">
      <div class="filter-group">
        <span class="filter-label">Category</span>
        <div class="filter-pills" id="category-filters">
          <button class="filter-pill" data-filter="all">All</button>
          <button class="filter-pill" data-filter="ai-llms">AI &amp; LLMs</button>
          <button class="filter-pill" data-filter="ai-agents">AI Agents</button>
          <button class="filter-pill" data-filter="ai-finance">AI &amp; Finance</button>
          <button class="filter-pill" data-filter="software-engineering">Software Engineering</button>
          <button class="filter-pill" data-filter="devops">DevOps</button>
          <button class="filter-pill" data-filter="databases">Databases</button>
          <button class="filter-pill" data-filter="frontend">Frontend</button>
          <button class="filter-pill" data-filter="security">Security</button>
          <button class="filter-pill" data-filter="career">Career</button>
          <button class="filter-pill" data-filter="books-podcasts">Books &amp; Podcasts</button>
          <button class="filter-pill" data-filter="blockchain">Blockchain</button>
        </div>
      </div>

      <div class="filter-group">
        <span class="filter-label">Type</span>
        <div class="filter-pills" id="type-filters">
          <button class="filter-pill filter-pill--type" data-filter="all">All</button>
          <button class="filter-pill filter-pill--type" data-filter="paper">Paper</button>
          <button class="filter-pill filter-pill--type" data-filter="tool">Tool</button>
          <button class="filter-pill filter-pill--type" data-filter="book">Book</button>
          <button class="filter-pill filter-pill--type" data-filter="blog">Blog</button>
          <button class="filter-pill filter-pill--type" data-filter="course">Course</button>
          <button class="filter-pill filter-pill--type" data-filter="video">Video</button>
          <button class="filter-pill filter-pill--type" data-filter="podcast">Podcast</button>
          <button class="filter-pill filter-pill--type" data-filter="reference">Reference</button>
          <button class="filter-pill filter-pill--type" data-filter="community">Community</button>
        </div>
      </div>
    </div>
  </div>

  <div class="resources-grid" id="resources-grid">
    {% for resource in site.data.resources %}
    <a href="{{ resource.url }}" target="_blank" rel="noopener noreferrer"
       class="resource-card{% if resource.curated %} resource-card--curated{% endif %}"
       data-category="{{ resource.category }}"
       data-type="{{ resource.type }}">
      {% if resource.curated %}<span class="curated-badge" title="Curated pick">&#9733;</span>{% endif %}
      <h3 class="resource-card__title">{{ resource.title }}</h3>
      <p class="resource-card__desc">{{ resource.description }}</p>
      <div class="resource-card__tags">
        <span class="resource-tag resource-tag--category">{% case resource.category %}{% when 'ai-llms' %}AI & LLMs{% when 'ai-agents' %}AI Agents{% when 'ai-finance' %}AI & Finance{% when 'software-engineering' %}Software Engineering{% when 'devops' %}DevOps{% when 'databases' %}Databases{% when 'frontend' %}Frontend{% when 'security' %}Security{% when 'career' %}Career{% when 'books-podcasts' %}Books & Podcasts{% when 'blockchain' %}Blockchain{% else %}{{ resource.category }}{% endcase %}</span>
        <span class="resource-tag resource-tag--type">{{ resource.type }}</span>
      </div>
    </a>
    {% endfor %}
  </div>

  <div class="resources-empty" id="resources-empty" style="display: none;">
    <p>No resources match your filters.</p>
  </div>

</section>

<script src="{{ '/assets/js/resources.js' | relative_url }}"></script>
