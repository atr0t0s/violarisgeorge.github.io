---
layout: default
title: Projects
---

## Projects

---

<div class="project-card" markdown="1">

### [ObsiTUI](https://github.com/atr0t0s/obsitui)

A terminal client for Obsidian with real vim modal editing.

I spend my day in the terminal and my knowledge base lived in Obsidian's Electron app. Every note lookup meant alt-tabbing, grabbing the mouse, switching contexts. So I built a terminal client that reads your existing .obsidian config and works where you already are.

**What it does:**

- Vim modal editing -- not a plugin that approximates it, actual modal editing with normal/insert/visual modes
- AI-powered RAG search using raw fetch() calls to LLM APIs instead of heavyweight SDKs. Works with Anthropic, OpenAI, or fully local via Ollama
- Pure functional editor where every operation returns a new immutable state
- Reads your existing .obsidian config. No migration, no sync, no lock-in

301 tests. TypeScript.

[GitHub](https://github.com/atr0t0s/obsitui)

</div>
