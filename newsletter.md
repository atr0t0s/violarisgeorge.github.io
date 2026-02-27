---
layout: default
title: Newsletter
---

<section class="newsletter-page">
  <div class="newsletter-hero">
    <h1>The Violaris Newsletter</h1>
    <p class="newsletter-tagline">Industry insights, technical deep dives, and lessons from building AI products — delivered to your inbox.</p>
  </div>

  <div class="newsletter-pitch">
    <h2>What you'll get</h2>
    <ul>
      <li><strong>Industry insights & news</strong> — What's moving in AI, infrastructure, and developer tooling, with commentary from someone actually shipping products in the space.</li>
      <li><strong>Technical deep dives</strong> — Architecture decisions, debugging war stories, and the kind of detail you won't find in a press release. Same voice as <a href="https://blog.violaris.org">the blog</a>.</li>
      <li><strong>Building in public</strong> — Updates on Zeig.ai, Spectre.ai, and other projects as they evolve.</li>
    </ul>
  </div>

  <div class="newsletter-form-section">
    <h2>Subscribe</h2>
    <form id="newsletter-form" class="newsletter-form">
      <input type="email" id="newsletter-email" placeholder="you@example.com" required>
      <button type="submit">Subscribe</button>
    </form>
    <p id="newsletter-msg" class="newsletter-msg"></p>
  </div>
</section>

<script>
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('newsletter-email').value;
  var msg = document.getElementById('newsletter-msg');
  var btn = this.querySelector('button');

  btn.disabled = true;
  btn.textContent = 'Subscribing...';
  msg.textContent = '';
  msg.className = 'newsletter-msg';

  fetch('https://api.violaris.org/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data.success) {
      msg.textContent = 'You\'re in. Watch your inbox.';
      msg.className = 'newsletter-msg newsletter-msg--success';
      document.getElementById('newsletter-email').value = '';
    } else {
      msg.textContent = data.error || 'Something went wrong. Try again.';
      msg.className = 'newsletter-msg newsletter-msg--error';
    }
  })
  .catch(function() {
    msg.textContent = 'Could not reach the server. Try again later.';
    msg.className = 'newsletter-msg newsletter-msg--error';
  })
  .finally(function() {
    btn.disabled = false;
    btn.textContent = 'Subscribe';
  });
});
</script>
