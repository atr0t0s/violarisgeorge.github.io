---
layout: article
title: From Reinforcement Learning to LLM Tool-Calling
---

## From Reinforcement Learning to LLM Tool-Calling

I built a PPO reinforcement learning agent to trade equities. Full setup: custom Gymnasium environment, observation space packed with OHLCV data and technical indicators (RSI, MACD, Bollinger Bands, a few volume-weighted metrics), action space of buy/hold/sell with position sizing. I imported PyTorch and stable-baselines3, wired up the policy network, and got it training against historical price data. The model would observe a rolling window of market state and learn to take actions that maximized a reward signal tied to portfolio returns.

It worked, in the narrow sense that the training loop ran and the agent did learn something. It learned to hold. Almost always. Because holding is the safest thing to do when your reward function penalizes losses, and the market mostly goes up if you zoom out far enough. Classic reward shaping problem.

I shelved it.

Training an RL agent on financial data is a research project. A real one. Not a side quest you knock out in a sprint. You need simulated trading infrastructure that models realistic slippage, transaction fees, and order book dynamics. Without that, your agent learns to exploit the simulation, not the market. You need to carefully shape the reward so it doesn't converge on degenerate strategies (like never trading). You need compute to iterate on hyperparameters, because the difference between a PPO agent that works and one that doesn't is often just a learning rate or a clipping parameter. And you need months of real production data to train against. We didn't have that. We were building the product that would eventually generate that data.

So I pivoted. LLMs with tool-calling shipped the same week I was debugging the reward function.

The replacement architecture is straightforward. An LLM sits at the center with access to a set of tools: market data APIs, financial calculators, portfolio state queries. A user asks a question about a stock or a portfolio position. The LLM calls the relevant APIs, reads the numbers, reasons about what it sees, and produces written analysis. No training data required. No GPU cluster. The Docker image dropped by about 2GB once I removed PyTorch and the model weights.

It's a fundamentally different system solving a different problem. The RL agent was supposed to make autonomous trading decisions. The LLM gives humans analysis they can act on. One is a decision-maker, the other is an analyst. We needed the analyst.

The tool-calling pattern turns out to be surprisingly capable for financial analysis. The LLM can pull real-time prices, compute ratios, compare against sector averages, and synthesize all of that into a paragraph that actually makes sense to a portfolio manager. It doesn't hallucinate numbers because the numbers come from the APIs, not from the model's parameters. It does occasionally misinterpret what a metric means in context, but that's a prompt engineering problem, not a training data problem. Much easier to fix.

I think about the tradeoff, though. An RL agent trained on tick-level data could theoretically discover patterns in market microstructure that no human (and no LLM) would articulate. Neural nets can learn latent representations that don't map to any named concept. LLMs are bounded by language. If you can't describe a pattern in words, an LLM can't reason about it. There's a real ceiling there.

But "theoretically" is doing a lot of heavy lifting in that paragraph. I don't have the data, the compute budget, or the regulatory framework to let an RL agent trade autonomously right now. And the product doesn't need that. It needs to help humans make better decisions faster. The LLM does that today.

I'll come back to the RL approach when three things are true: we have enough real production data (not synthetic, not backtested, real fills and real P&L), the product generates enough revenue to fund serious compute for training runs, and the use case shifts from "help humans analyze" to "execute autonomously with guardrails." That last one is the hardest because it's not just a technical problem. It's a trust problem and a compliance problem.

The RL code is sitting in an archive folder. The Gymnasium environment still works. The reward function still needs fixing. Someday.
