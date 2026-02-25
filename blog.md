---
layout: default
title: Insights
---

# Insights

Writing about what I'm building and what breaks along the way. All posts live on [my blog](https://blog.violaris.org).

## Featured

<div class="featured-grid">
  <a href="https://blog.violaris.org/1-500-lines-one-commit-fc7afc3fa6d5" class="featured-card">
    <span class="featured-icon">&#9998;</span>
    <h3>1,500 Lines, One Commit</h3>
    <p>I built a full custom charting system, then deleted 1,923 lines when TradingView's widget turned out to be simpler and better.</p>
  </a>
  <a href="https://blog.violaris.org/what-we-learned-building-agent-memory-at-scale-10c1eeec81a4" class="featured-card">
    <span class="featured-icon">&#9670;</span>
    <h3>Agent Memory at Scale</h3>
    <p>Vector databases alone broke immediately. What worked: Postgres + Qdrant + Redis with three explicit memory types.</p>
  </a>
  <a href="https://blog.violaris.org/the-model-that-never-made-a-trade-2d44289d116a" class="featured-card">
    <span class="featured-icon">&#9656;</span>
    <h3>The Model That Never Made a Trade</h3>
    <p>I wrote a PPO reinforcement learning trading agent, then shelved it when LLMs with tool-calling shipped the same week.</p>
  </a>
</div>

## All Posts

---

### [1,500 Lines, One Commit](https://blog.violaris.org/1-500-lines-one-commit-fc7afc3fa6d5) <span class="blog-tag">Tools</span>

I built a full custom charting system for my AI financial analysis platform -- drawing tools, per-asset persistence, keyboard shortcuts, context providers, Bollinger Band colors. Weeks of work. Then I looked at TradingView's embeddable widget and deleted 1,923 lines in one commit. The deletion turned out to be the most productive commit on the project: it forced me to rethink how the AI sees chart data, and the answer (capture what the user actually sees, send it to a vision model) was simpler and better than what I'd been building toward.

---

### [Building Real-Time AI Financial Analysis: Why We Use TypeScript AND Python](https://blog.violaris.org/building-real-time-ai-financial-analysis-why-we-use-typescript-and-python-and-when-each-shines-412a1bae2eed) <span class="blog-tag">Architecture</span>

We rebuilt our financial analysis platform twice before getting the architecture right. First attempt was Python for everything -- worked until frontend developers couldn't touch the backend and we were catching type errors in production. Second attempt was TypeScript for everything -- felt great until the AI/ML ecosystem gaps started costing us weeks. The version that finally scaled splits TypeScript (API layer, real-time WebSockets, type safety at user boundaries) from Python (LLM orchestration, pandas, TA-Lib, the entire ML toolkit), connected via gRPC. PRs per day went up 4x and compute costs dropped 30%.

---

### [The Model That Never Made a Trade](https://blog.violaris.org/the-model-that-never-made-a-trade-2d44289d116a) <span class="blog-tag">AI</span>

I wrote a PPO reinforcement learning trading agent -- defined the gymnasium environment, set up the observation space, imported PyTorch and stable-baselines3. Then I shelved it. Training an RL agent on financial data is a real research project: simulated trading infrastructure, careful reward shaping so the model doesn't learn to just never trade, and compute to iterate. Meanwhile, LLMs with tool-calling shipped the same week -- no training data, 2GB lighter Docker image, useful analysis out of the box.

---

### [The EU Doesn't Kill Innovation. The US Regulatory Mess Might.](https://blog.violaris.org/the-eu-doesnt-kill-innovation-the-us-regulatory-mess-might-8ba87d53d1c1) <span class="blog-tag">Opinion</span>

The "Europe is a graveyard for tech" story is mostly wrong. I've shipped products across AI, fintech, and crypto on both sides of the Atlantic. The EU's MiCA gives crypto builders one license framework across 27 countries. The US has 50 separate state licensing regimes and a habit of regulating by lawsuit -- you find out the rules after someone sues you.

---

### [Software Is Not Dead -- It's Evolving](https://blog.violaris.org/software-is-not-dead-its-evolving-e3dd683ded2f) <span class="blog-tag">Opinion</span>

Mark Cuban said "software is dead" because AI will customize everything. He's wrong about the conclusion, even if the direction is right. AI systems run inside containers, API gateways, databases, logging pipelines -- all traditional software engineering. The real shift isn't the death of software; it's the move from static SaaS to adaptive systems.

---

### [ObsiTUI: Why I Built a Terminal UI for Obsidian](https://blog.violaris.org/obsitui-why-i-built-a-terminal-ui-for-obsidian-7f1ebc2fcd15) <span class="blog-tag">Tools</span>

I spend my day in the terminal and my knowledge base lived in Obsidian's Electron app. Every note lookup meant alt-tabbing, grabbing the mouse, switching mental contexts -- 30-60 seconds each time, dozens of times a day. So I built ObsiTUI: a terminal client for Obsidian with real vim modal editing, AI-powered RAG search, and a pure functional editor where every operation returns a new immutable state. It has 301 tests.

---

### [What We Learned Building Agent Memory at Scale](https://blog.violaris.org/what-we-learned-building-agent-memory-at-scale-10c1eeec81a4) <span class="blog-tag">AI</span>

Our AI agents couldn't remember anything useful across sessions. We tried vector databases alone -- broke immediately because semantic similarity doesn't understand importance or recency. What worked: a hybrid of Postgres, Qdrant, and Redis, with three explicit memory types -- user-specific, session-specific, and shared pools that let agents learn from each other.

---

### [AI-Powered DevOps Orchestration](https://blog.violaris.org/ai-powered-devops-orchestration-a-practical-approach-to-seamless-scaling-a5d79b39cc56) <span class="blog-tag">Architecture</span>

Traditional autoscaling is crude -- CPU hits 70%, spin up more servers, half of them idle while you pay for them. We're replacing threshold-based scaling with ML models that predict traffic spikes before they happen. Prophet and TensorFlow on Prometheus metrics, triggered from Bitbucket Pipelines.

---

### [Boosting Our Financial AI Project with LangChain](https://blog.violaris.org/boosting-our-financial-ai-project-with-langchain-streamlined-development-and-model-testing-9f036bdece0c) <span class="blog-tag">AI</span>

LangChain let us stop rewriting code every time we wanted to test a different LLM. We swap between GPT-4, Claude, Llama, and Grok with minimal code changes, testing each on specific financial tasks -- market summaries, chatbot responses, portfolio optimization.

---

### [Unleashing AI Trading Potential with MCP](https://blog.violaris.org/unleashing-ai-trading-potential-with-model-context-protocol-mcp-ce3bcf96ed3c) <span class="blog-tag">AI</span>

LLMs are good at reasoning about markets but bad at accessing live data. Anthropic's Model Context Protocol fixes this with a standard way to connect models to external tools -- one server per data source, one client per AI app, communicating over JSON-RPC.

---

### [From Code to Assets: Revolutionizing Trading with AI](https://blog.violaris.org/from-code-to-assets-revolutionizing-trading-with-ai-and-llms-81bbd3954253) <span class="blog-tag">AI</span>

Where we started. At Hatchworks VC, our team moved from experimental ML models to agentic AI systems for trading. We fine-tune LLMs on unstructured data for real-time market sentiment, and we're building custom RL models for portfolio optimization in volatile markets.
