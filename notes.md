---
layout: default
title: Notes
---

<section class="notes-page">

  <header class="notes-header">
    <h1>Notes</h1>
    <p class="notes-tagline">Short thoughts, things to remember, ideas to explore.</p>
  </header>

  <div class="notes-filters">
    <div class="filter-pills" id="notes-filters">
      <button class="filter-pill active" data-filter="all">All</button>
      {% assign all_tags = "" | split: "" %}
      {% for note in site.notes %}
        {% for tag in note.tags %}
          {% unless all_tags contains tag %}
            {% assign all_tags = all_tags | push: tag %}
          {% endunless %}
        {% endfor %}
      {% endfor %}
      {% assign all_tags = all_tags | sort %}
      {% for tag in all_tags %}
      <button class="filter-pill" data-filter="{{ tag }}">{{ tag }}</button>
      {% endfor %}
    </div>
  </div>

  <div class="notes-grid" id="notes-grid">
    {% assign sorted_notes = site.notes | sort: "date" | reverse %}
    {% for note in sorted_notes %}
    <article class="note-card" data-tags="{{ note.tags | join: ' ' }}">
      <div class="note-tags">
        {% for tag in note.tags %}
        <span class="note-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      <div class="note-body">
        {{ note.content }}
      </div>
      <time class="note-date" datetime="{{ note.date | date_to_xmlschema }}">{{ note.date | date: "%b %-d, %Y" }}</time>
    </article>
    {% endfor %}
  </div>

  <nav class="notes-pagination" id="notes-pagination" aria-label="Notes pagination"></nav>

  <p class="notes-empty" id="notes-empty" style="display:none">No notes match that filter.</p>

</section>

<script src="{{ '/assets/js/notes.js?v=2' | relative_url }}" defer></script>
