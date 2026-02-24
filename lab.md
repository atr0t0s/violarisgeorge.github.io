---
layout: default
title: Lab
---

## Lab

Architecture decisions from production systems. No proprietary code -- just the problem, the options, what I picked, and what happened.

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
