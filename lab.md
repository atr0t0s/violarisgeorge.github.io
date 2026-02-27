---
layout: default
title: Lab
---

## Lab

Architecture decisions from production systems. No proprietary code -- just the problem, the options, what I picked, and what happened.

---

<div class="lab-entry" markdown="1">

### [Building a full-stack AI framework for PHP](lab-smallwork-php-ai-framework.html)

How I built a PHP framework with a multi-provider AI gateway, AI middleware pipeline, vector search, and RAG — all integrated into the routing, auth, and database layers instead of bolted on as afterthoughts.

</div>

---

<div class="lab-entry" markdown="1">

### [From framework API to agent tools with MCP](lab-vio-mcp-tooling.html)

How I built an MCP server that gives AI agents runtime control over a live Vio application. Traces a single tool call from stdio through a WebSocket bridge into the browser and back.

</div>

---

<div class="lab-entry" markdown="1">

### [Building a frontend framework for AI agents](lab-vio-ai-first-framework.html)

How I built a frontend framework where components are JSON, state is immutable, and every mutation is observable. Why existing frameworks fight AI agents, and what happens when you design for programmatic control from the start.

</div>

---

<div class="lab-entry" markdown="1">

### [Building a vim editor as a pure state machine](lab-obsitui-vim-editor.html)

How I implemented a vim-style editor in 867 lines of TypeScript using pure functions and immutable state. Every operation -- motions, operators, undo, dot repeat -- is a state machine transition with no side effects.

</div>

---

<div class="lab-entry" markdown="1">

### [Orchestrating multi-model AI pipelines](lab-multi-model-pipelines.html)

How I use one LLM as an orchestrator that plans which tools to invoke, runs them in parallel, and synthesizes results through streaming. Why different models handle different jobs, and why rigid function-calling schemas weren't flexible enough.

</div>

---

<div class="lab-entry" markdown="1">

### [Designing a memory layer for AI agents](lab-agent-memory.html)

Vector search alone doesn't work for agent memory. Semantic similarity doesn't understand importance or recency. This is how I built a hybrid storage system with per-agent isolation, importance scoring, and background summarization -- and what's still unsolved.

</div>

---

<div class="lab-entry" markdown="1">

### [From reinforcement learning to LLM tool-calling](lab-rl-to-llm.html)

I built a PPO trading agent and shelved it. LLM tool-calling shipped the same features in a fraction of the time. Here's when each approach makes sense.

</div>
