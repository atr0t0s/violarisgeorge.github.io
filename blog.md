---
layout: default
title: Blog
---

## Articles & Writing

Writing about what I'm building and what breaks along the way. All posts live on [Medium](https://medium.com/@gvio).

---

### [Building Real-Time AI Financial Analysis: Why We Use TypeScript AND Python (And When Each Shines)](https://medium.com/@gvio/building-real-time-ai-financial-analysis-why-we-use-typescript-and-python-and-when-each-shines-412a1bae2eed)

We rebuilt our financial analysis platform twice before getting the architecture right. First attempt was Python for everything -- worked until frontend developers couldn't touch the backend and we were catching type errors in production. Second attempt was TypeScript for everything -- felt great until the AI/ML ecosystem gaps started costing us weeks. The version that finally scaled splits TypeScript (API layer, real-time WebSockets, type safety at user boundaries) from Python (LLM orchestration, pandas, TA-Lib, the entire ML toolkit), connected via gRPC. PRs per day went up 4x and compute costs dropped 30%.

---

### [The Model That Never Made a Trade](https://medium.com/@gvio/the-model-that-never-made-a-trade-2d44289d116a)

I wrote a PPO reinforcement learning trading agent -- defined the gymnasium environment, set up the observation space, imported PyTorch and stable-baselines3. Then I shelved it. Training an RL agent on financial data is a real research project: simulated trading infrastructure, careful reward shaping so the model doesn't learn to just never trade, and compute to iterate. Meanwhile, LLMs with tool-calling shipped the same week -- no training data, 2GB lighter Docker image, useful analysis out of the box. The RL code is sitting in an archive folder. I'll come back for it once there's real production data to train on instead of simulated environments.

---

### [The EU Doesn't Kill Innovation. The US Regulatory Mess Might.](https://medium.com/@gvio/the-eu-doesnt-kill-innovation-the-us-regulatory-mess-might-8ba87d53d1c1)

The "Europe is a graveyard for tech" story is mostly wrong. I've shipped products across AI, fintech, and crypto on both sides of the Atlantic. The EU's MiCA gives crypto builders one license framework across 27 countries. The US has 50 separate state licensing regimes and a habit of regulating by lawsuit -- you find out the rules after someone sues you. GDPR forced companies to actually understand what data they collect and where it lives; that's just good data engineering. The AI Act's high-risk requirements (documentation, bias testing, audit trails) are things you should be doing anyway if you're building AI into finance or healthcare.

---

### [Software Is Not Dead -- It's Evolving](https://medium.com/@gvio/software-is-not-dead-its-evolving-e3dd683ded2f)

Mark Cuban said "software is dead" because AI will customize everything. He's wrong about the conclusion, even if the direction is right. AI systems run inside containers, API gateways, databases, logging pipelines -- all traditional software engineering. An LLM can generate an invoice function in seconds, but production still needs currency precision, tax logic, transactional safety, idempotent retries, and multi-tenant isolation. The real shift isn't the death of software; it's the move from static SaaS to adaptive systems. The engineers who do well in the next decade won't be prompt typists -- they'll be system builders who know where AI fits inside reliable architecture.

---

### [ObsiTUI: Why I Built a Terminal UI for Obsidian](https://medium.com/@gvio/obsitui-why-i-built-a-terminal-ui-for-obsidian-7f1ebc2fcd15)

I spend my day in the terminal and my knowledge base lived in Obsidian's Electron app. Every note lookup meant alt-tabbing, grabbing the mouse, switching mental contexts -- 30-60 seconds each time, dozens of times a day. So I built ObsiTUI: a terminal client for Obsidian with real vim modal editing (not a plugin that tries), AI-powered RAG search using raw fetch() calls to LLM APIs instead of heavyweight SDKs, and a pure functional editor where every operation returns a new immutable state. It has 301 tests, reads your existing .obsidian config, and works with Anthropic, OpenAI, or fully local via Ollama.

---

### [What We Learned Building Agent Memory at Scale](https://medium.com/@gvio/what-we-learned-building-agent-memory-at-scale-10c1eeec81a4)

Our AI agents couldn't remember anything useful across sessions. We tried vector databases alone -- broke immediately because semantic similarity doesn't understand importance or recency. LangChain memory modules don't handle "user returns 3 days later." RAG over conversation history lost coherence at chunk boundaries. What worked: a hybrid of Postgres (structured metadata, scopes, importance scores), Qdrant (vector search), and Redis (caching), with three explicit memory types -- user-specific, session-specific, and shared pools that let agents learn from each other. The hardest unsolved problems are memory consolidation (20 preference entries that should be one) and measuring whether retrieval actually helps.

---

### [AI-Powered DevOps Orchestration: A Practical Approach to Seamless Scaling](https://medium.com/@gvio/ai-powered-devops-orchestration-a-practical-approach-to-seamless-scaling-a5d79b39cc56)

Traditional autoscaling is crude -- CPU hits 70%, spin up more servers, half of them idle while you pay for them. We run Linode, AWS, and OVH, and we're replacing threshold-based scaling with ML models that predict traffic spikes before they happen. Prophet and TensorFlow on Prometheus metrics, triggered from Bitbucket Pipelines. Our platform sees Friday evening and Sunday afternoon spikes; the models now start provisioning 30 minutes before the spike hits. We're also running anomaly detection that caught an early credential stuffing attack that looked like organic growth, and AI-generated Terraform configs that cut a day of infra work to two hours.

---

### [Boosting Our Financial AI Project with LangChain](https://medium.com/@gvio/boosting-our-financial-ai-project-with-langchain-streamlined-development-and-model-testing-9f036bdece0c)

LangChain let us stop rewriting code every time we wanted to test a different LLM. We swap between GPT-4, Claude, Llama, and Grok with minimal code changes, testing each on specific financial tasks -- market summaries, chatbot responses, portfolio optimization. Turned out a fine-tuned Llama model parsed trading instructions better than anything else, while GPT-4 won on polished market reports. LangChain's caching and batching also cut API costs on repeated queries, which matters when you're hitting LLM endpoints constantly for market analysis.

---

### [Unleashing AI Trading Potential with Model Context Protocol (MCP)](https://medium.com/@gvio/unleashing-ai-trading-potential-with-model-context-protocol-mcp-ce3bcf96ed3c)

LLMs are good at reasoning about markets but bad at accessing live data. Anthropic's Model Context Protocol fixes this with a standard way to connect models to external tools -- one server per data source, one client per AI app, communicating over JSON-RPC. We're deploying MCP servers for market feeds and news APIs so our trading AI can fetch and process data in real time. The protocol handles the security side (OAuth-style auth, human-in-the-loop permissions) and the ecosystem is growing fast, with Google, Replit, and Stripe already building integrations.

---

### [From Code to Assets: Revolutionizing Trading with AI and LLMs](https://medium.com/@gvio/from-code-to-assets-revolutionizing-trading-with-ai-and-llms-81bbd3954253)

Where we started. At Hatchworks VC, our team moved from experimental ML models to agentic AI systems for trading. We fine-tune LLMs on unstructured data -- news, social media, regulatory filings -- for real-time market sentiment, and we're building custom RL models in Python with Stable Baselines3 and Gym for portfolio optimization in volatile markets. The practical work happens in weekly R&D sessions where engineers share code, ML specialists present models, and finance people validate against actual market data.
