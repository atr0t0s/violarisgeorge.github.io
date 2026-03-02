---
layout: default
title: Ask
---

<section class="ask-page">
  <div class="ask-header">
    <h1>Ask me anything</h1>
    <p class="ask-tagline">AI-powered answers about my work, projects, and background. Powered by Cloudflare Workers AI.</p>
  </div>

  <div class="ask-chat" id="ask-chat">
    <div class="ask-messages" id="ask-messages">
      <div class="ask-msg ask-msg--ai">
        <span class="ask-msg-label">AI</span>
        <div class="ask-msg-body">Hey — ask me anything about George's work, projects, or background. I know about Zeig.ai, Spectre.ai, Vio, ObsiTUI, Smallwork, and his engineering career.</div>
      </div>
    </div>
    <form class="ask-input" id="ask-form">
      <input type="text" id="ask-input" placeholder="What does George work on?" autocomplete="off">
      <button type="submit" id="ask-submit">Send</button>
    </form>
  </div>
</section>

<script src="{{ '/assets/js/ask.js' | relative_url }}" defer></script>
