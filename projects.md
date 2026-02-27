---
layout: default
title: Projects
---

# Projects

What I'm building — personal open source, and products at Hatchworks VC.

## Open Source

<div class="featured-grid">
  <a href="https://smallwork.violaris.org" class="featured-card">
    <span class="featured-icon">&#9656;</span>
    <h3>Smallwork</h3>
    <p>A small footprint full-stack AI framework for PHP. Multi-provider AI gateway, vector search, and RAG built in.</p>
    <span class="blog-tag">Framework</span>
  </a>
  <a href="https://github.com/atr0t0s/vio" class="featured-card">
    <span class="featured-icon">&#9656;</span>
    <h3>Vio</h3>
    <p>An AI-agent-first frontend framework. ~1,200 lines of TypeScript, no dependencies.</p>
    <span class="blog-tag">Framework</span>
  </a>
  <a href="https://github.com/atr0t0s/obsitui" class="featured-card">
    <span class="featured-icon">&#9656;</span>
    <h3>ObsiTUI</h3>
    <p>Terminal client for Obsidian with vim modal editing and AI-powered RAG search. 301 tests.</p>
    <span class="blog-tag">Tools</span>
  </a>
</div>

## At Hatchworks VC

<div class="featured-grid">
  <a href="{{ '/projects.html' | relative_url }}#spectre" class="featured-card">
    <span class="featured-icon">&#9670;</span>
    <h3>Spectre.ai</h3>
    <p>A memory layer for AI agents. Persistent recall across sessions with plugins for Claude Code and OpenCode.</p>
    <span class="blog-tag">AI</span>
  </a>
  <a href="{{ '/projects.html' | relative_url }}#zeig" class="featured-card">
    <span class="featured-icon">&#9670;</span>
    <h3>Zeig.ai</h3>
    <p>Financial analysis through conversation using multiple LLMs and vision AI.</p>
    <span class="blog-tag">AI</span> <span class="blog-tag">Finance</span>
  </a>
</div>

---

<div id="spectre" class="project-card" markdown="1">

### Spectre.ai

A memory layer that gives AI agents persistent recall across sessions. Spectre ships with plugins for Claude Code and OpenCode today, with more on the way.

**The problem:** AI agents forget everything between sessions. Vector databases alone don't work because semantic similarity doesn't understand importance or recency.

**The approach:** Hybrid storage — Postgres for structured metadata and scopes, vector search for semantic recall, with three explicit memory types: user-specific, session-specific, and shared pools.

</div>

---

<div id="zeig" class="project-card" markdown="1">

### Zeig.ai

Financial analysis through conversation using multiple LLMs and vision AI.

**The problem:** Financial analysis tools are either too simple (chatbots that can't do real math) or too complex (Bloomberg terminals with a learning cliff).

**The approach:** Multi-model pipeline — TypeScript API layer for real-time WebSockets and type safety, Python backend for LLM orchestration and the ML toolkit, connected via gRPC. Vision AI for chart analysis.

</div>

---

<div class="project-card" markdown="1">

### [Smallwork](https://smallwork.violaris.org)

A small footprint full-stack AI framework for PHP. Build AI-powered web applications with a unified multi-provider gateway, server-rendered templates, vector search, and enterprise features — without the overhead of a large framework.

I kept running into the same problem on PHP projects: bolt on an HTTP client for OpenAI, write a normalizer, add another wrapper for Anthropic, then realize embeddings need a vector database, and suddenly half the codebase is glue. Smallwork puts the AI gateway, embeddings, semantic search, and RAG into the framework layer so application code stays focused on the application.

**What it does:**

- Unified AI gateway across OpenAI, Anthropic, and Grok — switch providers per request with one parameter
- AI middleware pipeline — content moderation, intent classification, and auto-summarization that slot into the request lifecycle
- Vector search with Qdrant and pgvector backends, plus a full RAG pipeline
- Server-rendered Blade-like templates with HTMX helpers for interactive UIs without JavaScript
- JWT, API keys, RBAC, query builder, migrations, CLI scaffolding

PHP 8.2+. MIT licensed.

[Lab article](lab-smallwork-php-ai-framework.html) &#183; [Website](https://smallwork.violaris.org) &#183; [GitHub](https://github.com/atr0t0s/smallwork)

</div>

---

<div class="project-card" markdown="1">

### [Vio](https://github.com/atr0t0s/vio)

An AI-agent-first frontend framework. Components are pure JSON data structures. State is immutable. Every mutation is observable.

I got tired of watching LLMs generate broken JSX, violate hook ordering rules, and struggle with implicit context. So I built a framework where the entire component model is plain objects, renders are deterministic pure functions, and every operation is available through an imperative API that an agent can call directly.

**What it does:**

- JSON-native component model — no JSX, no templates, no custom DSL
- Virtual DOM with diff/patch for minimal DOM mutations
- Two-level state: component-local state and a global store with pure reducer actions
- Full programmatic control surface — setState, dispatch, getComponentTree, batch operations
- Observable event bus that logs every mutation with full before/after state snapshots

~1200 lines of TypeScript. No external dependencies.

[Lab article](lab-vio-ai-first-framework.html) &#183; [MCP tooling](lab-vio-mcp-tooling.html) &#183; [Website](https://vio.violaris.org) &#183; [GitHub](https://github.com/atr0t0s/vio)

</div>

---

<div class="project-card" markdown="1">

### [ObsiTUI](https://github.com/atr0t0s/obsitui)

A terminal client for Obsidian with real vim modal editing.

I spend my day in the terminal and my knowledge base lived in Obsidian's Electron app. Every note lookup meant alt-tabbing, grabbing the mouse, switching contexts. So I built a terminal client that reads your existing .obsidian config and works where you already are.

**What it does:**

- Vim modal editing — not a plugin that approximates it, actual modal editing with normal/insert/visual modes
- AI-powered RAG search using raw fetch() calls to LLM APIs. Works with Anthropic, OpenAI, or fully local via Ollama
- Pure functional editor where every operation returns a new immutable state
- Reads your existing .obsidian config. No migration, no sync, no lock-in

301 tests. TypeScript.

[Lab article](lab-obsitui-vim-editor.html) &#183; [GitHub](https://github.com/atr0t0s/obsitui)

</div>
