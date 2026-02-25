---
layout: default
title: Projects
---

## Projects

---

<div class="project-card" markdown="1">

### [Vio](https://github.com/atr0t0s/vio)

An AI-agent-first frontend framework. Components are pure JSON data structures. State is immutable. Every mutation is observable.

I got tired of watching LLMs generate broken JSX, violate hook ordering rules, and struggle with implicit context. So I built a framework where the entire component model is plain objects, renders are deterministic pure functions, and every operation is available through an imperative API that an agent can call directly.

**What it does:**

- JSON-native component model -- no JSX, no templates, no custom DSL. Any consumer that can produce a valid object literal can produce a valid Vio component
- Virtual DOM with diff/patch for minimal DOM mutations
- Two-level state: component-local state and a global store with pure reducer actions
- Full programmatic control surface -- setState, dispatch, getComponentTree, batch operations, all available as function calls
- Observable event bus that logs every mutation with full before/after state snapshots

~1200 lines of TypeScript. No external dependencies.

[Lab article](lab-vio-ai-first-framework.html) &#183; [GitHub](https://github.com/atr0t0s/vio)

</div>

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
