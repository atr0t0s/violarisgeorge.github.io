---
layout: article
title: Orchestrating Multi-Model AI Pipelines
date: 2026-02-24
---

## Orchestrating Multi-Model AI Pipelines

We're building a financial analysis platform at Hatchworks. The core interaction is simple: a user asks a question about a stock or a market, and the system figures out what data to pull, runs the right analysis, and returns a coherent answer. The tricky part is that "figures out" is doing a lot of heavy lifting in that sentence.

A question like "How has NVDA performed relative to the semiconductor sector over the past quarter, and what do the technicals look like?" requires fetching price data, pulling sector comparisons, generating a chart with indicator overlays, analyzing that chart visually, and then writing up a response that ties it all together. These steps have dependencies. You can't analyze a chart that hasn't been generated yet. But you can fetch price data and sector data in parallel.

### Why one model wasn't enough

My first attempt was the obvious one: give a single model all the tools and let it figure things out via tool-calling. For simple questions ("What's the P/E ratio of AAPL?") this worked fine. One tool call, one response, done.

But for complex queries, it fell apart. The model would try to call tools in the wrong order, or it would forget to use a result from a previous tool call when invoking the next one. Sometimes it would try to synthesize an answer before all the data was in. The failure mode wasn't dramatic. It just produced subtly wrong or incomplete answers that were hard to catch without careful review.

I spent a couple weeks trying to fix this with better prompts. It helped, but not enough. The fundamental issue is that planning, execution, and synthesis are different cognitive tasks. Asking one model to do all three in a single pass is like asking someone to write a project plan, execute it, and write the summary report all at the same time.

### The orchestrator pattern

So I split the pipeline into stages. The first stage is a planner. It receives the user's question and outputs a structured execution plan: which tools to call, in what order, and which calls can be parallelized. The planner doesn't execute anything. It just produces a JSON plan with steps, dependencies, and expected outputs.

A separate orchestration layer reads that plan and executes it. It handles parallelism, passes outputs from one step as inputs to the next, and manages timeouts and retries. This layer is regular code, not an LLM. It's a directed acyclic graph executor, basically.

The final stage is synthesis. Another model call takes all the collected results and the original question, then writes the actual response the user sees.

This separation made the whole system dramatically easier to debug. When something goes wrong, I can look at the plan and immediately see if the issue was bad planning or bad execution. Before, it was all one opaque blob.

### Picking models for the job

Once you've separated the pipeline into stages, an interesting option opens up: you don't have to use the same model for every stage. Different models are better at different things, and the cost and latency profiles vary a lot.

For planning, I use a model that's strong at structured reasoning. It needs to understand tool capabilities, figure out dependencies, and output valid JSON. Speed is secondary here because the planning step is fast regardless (small input, small output).

For chart analysis, I use a vision model. It looks at a generated chart image with technical indicator overlays and extracts observations. This is a genuinely different capability than text reasoning, and the quality difference between models on this task is significant.

For the synthesis step, I use a fast model optimized for text generation. By this point all the hard analytical work is done. The model just needs to write a clear summary from structured data. Speed matters here because the user is waiting, and a slightly less capable but much faster model produces nearly identical output quality for this particular task.

### Streaming progress with SSE

Nobody wants to stare at a spinner for 15 seconds. The entire pipeline streams progress to the frontend via Server-Sent Events. When the planner finishes, the user sees the plan. When a tool starts executing, they see "Fetching market data..." or "Analyzing chart..." in real time. Each tool execution fires a progress event with a status update.

This was more work than I expected. You have to think carefully about what to show the user at each stage without overwhelming them. And error states get complicated when you have parallel tool executions, some of which succeed and some of which fail.

### What I'd change

The planner prompt is doing too much. Right now it handles intent classification, tool selection, and dependency resolution all at once. It works, but when I need to add a new tool or change routing logic, I'm editing a long prompt and hoping I don't break something else.

A more explicit routing layer would help. Something like: first classify the intent, then select tools based on that classification, then build the execution graph, then run it. Each step would be independently testable and easier to extend. I haven't rebuilt it yet because the current version works well enough and there are higher priority things to ship. But it's accumulating complexity in a way that will bite us eventually.

The other thing I'm not satisfied with is error recovery. Right now, if a tool fails mid-pipeline, we either retry it or skip it and note the gap in the response. What I really want is for the system to re-plan around failures. If the chart generation service is down, the planner should be able to produce an alternative plan that relies on numerical analysis instead. That's on the roadmap but not built yet.
