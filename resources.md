# Resources

A reading list I maintain for myself and anyone else who finds it useful. Heavy on AI, LLMs, crypto, security, and the places where software meets finance.

Last updated: February 2026

---

## AI and LLMs

### Papers worth reading

The ones I keep coming back to, roughly in the order you'd want to read them if starting from scratch.

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al., 2017. The Transformer paper. Everything since builds on this.
- [BERT](https://arxiv.org/abs/1810.04805) — Devlin et al., 2018. Bidirectional pre-training; set the template for fine-tuning that lasted years.
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) — Brown et al., 2020. The GPT-3 paper. Showed that scale alone gets you surprisingly far without fine-tuning.
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361) — Kaplan et al., 2020. Loss scales predictably with model size, data, and compute. Changed how labs plan training runs.
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) — Hoffmann et al., 2022. The Chinchilla paper. Most models at the time were undertrained for their compute budget.
- [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) — Ouyang et al., 2022. The RLHF paper. A 1.3B InstructGPT beat the 175B GPT-3 on human preference.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073) — Bai et al., 2022. Anthropic's approach to alignment using AI feedback guided by a written constitution.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) — Wei et al., 2022. Asking the model to show its work actually makes it better at hard problems.
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — Lewis et al., 2020. The original RAG paper. Combines what the model knows with what it can look up.
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774) — OpenAI, 2023. Capabilities, safety evals, multimodal inputs.

### Agent frameworks

- [LangChain](https://github.com/langchain-ai/langchain) / [LangGraph](https://github.com/langchain-ai/langgraph) — The most widely used agent framework. LangGraph is the newer, graph-based approach for stateful agents.
- [CrewAI](https://github.com/crewAIInc/crewAI) — Multi-agent orchestration where agents have defined roles and collaborate. Independent of LangChain.
- [Microsoft AutoGen](https://github.com/microsoft/autogen) — Conversation-based multi-agent framework from Microsoft Research.
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) — Released March 2025. Lightweight Python framework for tool use, handoffs, and guardrails.
- [LlamaIndex](https://github.com/run-llama/llama_index) — Best for document ingestion, RAG pipelines, and agentic workflows over your own data.
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io) — Anthropic's open standard for connecting LLMs to external tools and data. Adopted by OpenAI, Google, JetBrains, and others.

### Memory and retrieval

- [Letta](https://github.com/letta-ai/letta) (formerly MemGPT) — Stateful agents with self-editing persistent memory. The research project that became a production framework.
- [Qdrant](https://qdrant.tech) — Open-source vector database. Fast, good filtering, free tier.
- [Pinecone](https://www.pinecone.io) — Managed vector database. Minimal ops if you don't want to run your own.
- [Weaviate](https://github.com/weaviate/weaviate) — Open-source with built-in hybrid search (vector + BM25).
- [Milvus](https://github.com/milvus-io/milvus) — Built for billion-scale vector search.
- [Chroma](https://github.com/chroma-core/chroma) — Embedded-first. Good for local prototyping and small RAG pipelines.

### Developer tools

- [Claude Code](https://github.com/anthropics/claude-code) — Terminal-native agentic coding. Understands full codebases, runs commands, manages git.
- [Cursor](https://cursor.com) — AI-first code editor forked from VS Code. 200K context window, codebase-aware completions.
- [Windsurf](https://windsurf.com/editor) — Agentic IDE with auto-context discovery. Good for monorepos.
- [GitHub Copilot](https://github.com/features/copilot) — AI pair programmer in VS Code, JetBrains, etc. Now includes autonomous agent mode.
- [Hugging Face](https://huggingface.co) — Where the open-source models live. The [Transformers library](https://huggingface.co/docs/transformers) and [LLM Course](https://huggingface.co/learn/llm-course) are good starting points.
- [Weights & Biases](https://wandb.ai) — Experiment tracking and model registry. The standard for anyone fine-tuning or managing models in production.

### Blogs and newsletters

- [Simon Willison](https://simonwillison.net) — Covers practical LLM usage and AI tooling with more depth and honesty than anyone else writing regularly.
- [Lilian Weng](https://lilianweng.github.io) — Long-form technical posts on architectures, agents, and RLHF. Her [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) post is still a canonical reference.
- [Chip Huyen](https://huyenchip.com/blog) — ML systems design, AI engineering, MLOps. Author of "AI Engineering" (O'Reilly, 2025).
- [The Batch](https://www.deeplearning.ai/the-batch) — Andrew Ng's weekly AI newsletter. Good signal-to-noise ratio.
- [Andrej Karpathy](https://karpathy.ai) — His [Zero to Hero](https://karpathy.ai/zero-to-hero.html) course builds neural networks from scratch and ends with a GPT. Nobody explains this stuff better.
- [Anthropic Research](https://www.anthropic.com/research) — Papers, model cards, and the Responsible Scaling Policy.

---

## AI and Finance

### Research

- [From Deep Learning to LLMs: A Survey of AI in Quantitative Investment](https://arxiv.org/abs/2503.21422) — March 2025. Comprehensive survey covering the full pipeline from predictive modeling to agent-based automation.
- [FinGPT: Open-Source Financial Large Language Models](https://arxiv.org/abs/2306.06031) — Lightweight, open alternative to BloombergGPT.
- [FinRL: A Deep Reinforcement Learning Library for Automated Stock Trading](https://arxiv.org/abs/2011.09607) — The paper behind the FinRL framework. DQN, DDPG, PPO, SAC across multiple markets.
- [ACM ICAIF Proceedings](https://dl.acm.org/doi/proceedings/10.1145/3768292) — The main academic venue for AI in finance. The 2025 edition covers LLM market regime forecasting, adversarial RL for market making, and more.

### Open-source trading tools

- [FinRL](https://github.com/AI4Finance-Foundation/FinRL) — Deep RL framework for stock trading. Supports PPO, DDPG, SAC, and others.
- [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) — Open-source financial LLMs. Sentiment analysis, news summarization, return forecasting.
- [QuantConnect / LEAN](https://github.com/QuantConnect/Lean) — Open-source algo trading engine. Python and C#, cloud or local.
- [Backtrader](https://github.com/mementum/backtrader) — Event-driven backtesting in Python. Supports live trading through Interactive Brokers and Oanda.
- [Freqtrade](https://github.com/freqtrade/freqtrade) — Crypto trading bot with backtesting and ML strategy optimization.
- [Zipline](https://github.com/quantopian/zipline) — The backtesting library that powered Quantopian. Still widely used for strategy research.
- [QuantLib](https://www.quantlib.org/) — The standard C++ library for derivatives pricing and risk management. Python bindings available.
- [Awesome Quant](https://github.com/wilsonfreitas/awesome-quant) — Curated list of quant finance libraries across Python, R, Julia, and more. Good bookmark.

### Data APIs

- [Alpha Vantage](https://www.alphavantage.co/) — Free tier (25 calls/day), extensive indicators, NASDAQ vendor. Good for research.
- [Twelve Data](https://twelvedata.com/) — Real-time WebSocket ticks, multi-asset. Clean APIs.
- [Polygon.io](https://polygon.io/) — Low-latency production data. Preferred for execution systems.
- [yfinance](https://github.com/ranaroussi/yfinance) — Python wrapper for Yahoo Finance. Free historical data. Research only, not production.
- [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/) — Fundamentals, DCF, earnings calendars. Generous free tier.
- [FRED](https://fred.stlouisfed.org/) — Macro and economic time series from the St. Louis Fed.

### Books

- **Advances in Financial Machine Learning** — Marcos Lopez de Prado. The practitioner textbook for ML in finance. Feature engineering, labeling, backtesting pitfalls.
- **Machine Learning for Asset Managers** — Lopez de Prado. Shorter companion covering clustering, feature importance, and portfolio construction.
- **Python for Algorithmic Trading** — Yves Hilpisch. End-to-end strategy development, backtesting, and deployment.
- [Lopez de Prado's lecture notes](https://www.quantresearch.org/Lectures.htm) — Free slides from his Cornell course. Good alternative if you want the ideas without buying the books.

### Blogs and communities

- [Quantocracy](https://quantocracy.com/) — Aggregator of the best quant trading blog posts. Fastest way to see what the community is reading.
- [QuantStart](https://www.quantstart.com/) — Educational articles on algo trading, ML, and backtesting in Python.
- [AI4Finance Foundation](https://github.com/AI4Finance-Foundation) — The org behind FinRL and FinGPT. Worth watching on GitHub.
- [Ernie Chan's blog](http://epchan.blogspot.com/) — Practitioner blog from the author of "Algorithmic Trading." Recent posts cover AI and corrective ML for forex.

---

## Blockchain and Crypto

Trimmed down from the original version of this page. Kept the stuff that still matters.

- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf) — Satoshi Nakamoto's 9 pages. Still the clearest explanation of how and why.
- [Ethereum Whitepaper](https://ethereum.org/whitepaper/) — Buterin's 2014 vision for a programmable blockchain, with annotations on what changed since.
- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) — Antonopoulos. The technical deep-dive. 3rd edition (2023) is free under Creative Commons.
- [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) — Antonopoulos and Wood. Free, comprehensive, still the best single-volume reference.
- [Ethereum Developer Docs](https://ethereum.org/developers/docs/) — Official reference for EVM, gas, accounts, consensus, and smart contract standards.
- [DeFi Specialization — Duke University](https://www.coursera.org/specializations/decentralized-finance-duke) — Campbell Harvey's four-course Coursera specialization. The most rigorous DeFi education available.
- [Uniswap Protocol Docs](https://docs.uniswap.org/) — Useful primary source for understanding how AMMs and DeFi liquidity actually work.
- [The Complete Satoshi](http://satoshi.nakamotoinstitute.org/) — All of Satoshi Nakamoto's known writings, emails, and forum posts.
- [Jameson Lopp's Bitcoin Resources](https://lopp.net/bitcoin.html) — Comprehensive and regularly updated.
- [Trail of Bits Blog](https://blog.trailofbits.com/) — One of the top smart contract audit firms. Covers blockchain security and exploit techniques.

---

## Security

### References

- [OWASP Top Ten 2025](https://owasp.org/Top10/2025/) — The baseline web application security risk list.
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — AI-specific attack surfaces: prompt injection, training data poisoning, etc. Worth reading if you're building anything with LLMs.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — Free, hands-on web security training with interactive labs. From the Burp Suite team.
- [PortSwigger Research Blog](https://portswigger.net/blog) — Where new vulnerability classes get published first. HTTP request smuggling, web cache poisoning, DOM clobbering all came from here.

### Practice

- [Hack The Box](https://www.hackthebox.com/) — The main competitive hacking platform. Active machines, CTFs, career-path labs.
- [TryHackMe](https://tryhackme.com/) — More structured and beginner-friendly than HTB. Good for getting started.
- [CTFtime](https://ctftime.org/) — Directory for CTF competitions worldwide. Past challenges, upcoming events, team writeups.

### Blogs

- [Schneier on Security](https://www.schneier.com/) — Bruce Schneier on security, privacy, and policy. Been publishing for decades, still going.
- [Krebs on Security](https://krebsonsecurity.com/) — Brian Krebs. Investigative journalism on cybercrime and breaches.
- [Daniel Miessler](https://danielmiessler.com) — Security, technology, and AI.

---

## Cryptography

- [Cryptography I — Dan Boneh](https://www.coursera.org/learn/crypto) — Stanford course on Coursera. Stream ciphers, block ciphers, MACs, public-key, digital signatures. Free to audit. The best intro available.
- [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/) — Boneh and Shoup. Free textbook. Graduate-level with formal proofs.
- [New Directions in Cryptography](https://www-ee.stanford.edu/~hellman/publications/24.pdf) — Diffie and Hellman, 1976. The paper that started public-key cryptography.
- [NIST Post-Quantum Cryptography Standards](https://www.nist.gov/pqc) — Finalized ML-KEM, ML-DSA, and SLH-DSA standards in August 2024. Required reading if you're doing any crypto system design now.
- [The Illustrated TLS 1.3](https://tls13.xargs.org/) — Interactive byte-level walkthrough of a TLS 1.3 handshake. Best way to understand how transport security works in practice.

---

## Cypherpunks

Kept these because the history matters.

- [Cypherpunk Manifesto](https://www.activism.net/cypherpunk/manifesto.html) — Eric Hughes, 1993.
- [Cyphernomicon](https://nakamotoinstitute.org/library/cyphernomicon/) — Timothy C. May.
- [Cypherpunk Research](https://github.com/tombusby/cypherpunk-research) — Tom Busby's collection of primary sources.

---

## Programming

- [Go by Example](https://gobyexample.com/) — Annotated example programs in Go.
- [Go Language Spec](https://golang.org/ref/spec) — The official specification.
- [The Hitchhiker's Guide to Python](https://docs.python-guide.org/) — Opinionated guide to Python best practices.
- [Stack Overflow Blog](https://stackoverflow.blog/) — Still worth reading for the engineering culture pieces.
- [Coding Horror](https://blog.codinghorror.com/) — Jeff Atwood. Software engineering, culture, and the human side of building things.
