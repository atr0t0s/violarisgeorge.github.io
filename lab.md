---
layout: default
title: Lab
---

## Lab

Architecture decisions from production systems. No proprietary code -- just the problem, the options, what I picked, and what happened.

---

<div id="lab-list">

<div class="lab-entry">
<h3><a href="/lab/smallwork-php-ai-framework">Building a full-stack AI framework for PHP</a></h3>
<span class="lab-date">Feb 27, 2026</span>
<p>How I built a PHP framework with a multi-provider AI gateway, AI middleware pipeline, vector search, and RAG — all integrated into the routing, auth, and database layers instead of bolted on as afterthoughts.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/vio-mcp-tooling">From framework API to agent tools with MCP</a></h3>
<span class="lab-date">Feb 26, 2026</span>
<p>How I built an MCP server that gives AI agents runtime control over a live Vio application. Traces a single tool call from stdio through a WebSocket bridge into the browser and back.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/vio-ai-first-framework">Building a frontend framework for AI agents</a></h3>
<span class="lab-date">Feb 25, 2026</span>
<p>How I built a frontend framework where components are JSON, state is immutable, and every mutation is observable. Why existing frameworks fight AI agents, and what happens when you design for programmatic control from the start.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/obsitui-vim-editor">Building a vim editor as a pure state machine</a></h3>
<span class="lab-date">Feb 24, 2026</span>
<p>How I implemented a vim-style editor in 867 lines of TypeScript using pure functions and immutable state. Every operation -- motions, operators, undo, dot repeat -- is a state machine transition with no side effects.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/multi-model-pipelines">Orchestrating multi-model AI pipelines</a></h3>
<span class="lab-date">Feb 24, 2026</span>
<p>How I use one LLM as an orchestrator that plans which tools to invoke, runs them in parallel, and synthesizes results through streaming. Why different models handle different jobs, and why rigid function-calling schemas weren't flexible enough.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/agent-memory">Designing a memory layer for AI agents</a></h3>
<span class="lab-date">Feb 24, 2026</span>
<p>Vector search alone doesn't work for agent memory. Semantic similarity doesn't understand importance or recency. This is how I built a hybrid storage system with per-agent isolation, importance scoring, and background summarization -- and what's still unsolved.</p>
</div>

<div class="lab-entry">
<h3><a href="/lab/rl-to-llm">From reinforcement learning to LLM tool-calling</a></h3>
<span class="lab-date">Feb 24, 2026</span>
<p>I built a PPO trading agent and shelved it. LLM tool-calling shipped the same features in a fraction of the time. Here's when each approach makes sense.</p>
</div>

</div>

<div id="lab-pagination" class="notes-pagination"></div>

<script src="/assets/js/pagination.js"></script>
<script>
  initPagination({
    container: '#lab-list',
    entry: '.lab-entry',
    pagination: '#lab-pagination',
    perPage: 5
  });
</script>
