---
layout: article
title: Designing a Memory Layer for AI Agents
date: 2026-02-24
---

## Designing a Memory Layer for AI Agents

AI agents have a memory problem. Not the kind where they forget a fact mid-conversation, most models handle that fine within a session. The real problem is what happens between sessions. You close the chat, and everything's gone. Every preference the user stated, every decision that was made, every piece of context accumulated over days or weeks, all of it evaporates.

For one-shot tasks this doesn't matter. For agents that need to build on previous work, it's a dealbreaker. We're building products at Hatchworks where agents collaborate with users over long time horizons. An agent that can't remember what you decided last Tuesday is an agent you have to re-explain everything to, every single time.

So we set out to build a proper memory layer. Here's what we tried, what broke, and where we ended up.

### Vector search isn't memory

Our first attempt was the obvious one: store everything as embeddings in a vector database, retrieve by semantic similarity. This broke almost immediately.

The issue is that semantic similarity returns "related" results, not "important" or "recent" results. Ask "what did the user decide about the pricing model?" and you get five vaguely related memories ranked by cosine distance. One is about pricing from a different project. Two are from early brainstorming sessions where the user was still exploring options. None of them is the actual decision.

Cosine similarity has no concept of time, no concept of importance, and no concept of whether a memory supersedes another. It just finds nearby vectors. That's useful, but it's not memory.

### Why existing solutions didn't work for us

We looked at LangChain's memory modules. They're fine for single-session context windows, but they don't handle the "user returns three days later" case. The conversation buffer fills up, the summary chain compresses everything into a paragraph, and you lose the specifics that actually matter.

We also tried RAG over conversation history. This loses coherence at chunk boundaries. A decision that spans three messages gets split across chunks, and retrieval returns the middle chunk without the reasoning that preceded it or the conclusion that followed.

Both approaches treat memory as a retrieval problem. It's actually a curation problem. The hard part isn't finding memories, it's knowing which ones still matter.

### The architecture we landed on

We ended up with a hybrid system. Three storage layers, each doing what it's good at.

PostgreSQL handles structured metadata: importance scores, timestamps, access frequency, memory type, scope, and audit trails. Every memory operation is logged. This matters for compliance and debugging, but it also gives us the signals we need to rank and filter.

Qdrant handles semantic search. When an agent needs to find memories by meaning rather than exact match, the vector index does the work. But we never return raw vector results to the agent. They always pass through a scoring layer that factors in recency, access frequency, and importance.

Redis sits in front for hot caching. Memories that are being actively used in a session stay in cache. This keeps latency low for the common case where an agent retrieves the same context multiple times within a conversation.

We defined three explicit memory types. User-specific memories persist across all sessions for a given user. Session-specific memories live and die with a single interaction. Shared pools let agents learn from each other, so if one agent discovers a useful pattern, others can benefit.

### Per-agent isolation

Each agent gets its own Qdrant collection. This was a deliberate choice. It simplifies tenant isolation significantly. It makes GDPR deletion straightforward (drop the collection, done). And it prevents cross-contamination between agents operating in different contexts.

The alternative was a single shared collection with metadata filtering. We tried that early on. It works until it doesn't. Filtering by agent ID on every query adds latency, and one misconfigured filter means Agent A is suddenly retrieving Agent B's memories. Separate collections are more expensive in storage but cheaper in headaches.

### Importance scoring

Not all memories are equal. We calculate an importance score from recency and access frequency. Memories that get retrieved often score higher. Old memories that nobody queries gradually fade. This is intentional. If no one has needed a piece of context in weeks, it's probably not worth surfacing.

Pinned memories are the exception. Users or agents can pin a memory to exempt it from decay. This handles the case where a decision was made once, referenced rarely, but remains relevant indefinitely.

### What's still broken

Memory consolidation. After a few weeks of active use, an agent accumulates 20 separate entries that all say some variation of "user prefers concise responses." These should really be one merged preference with high confidence.

We've experimented with periodic summarization jobs that compress related memories. It helps with storage and retrieval speed, but it loses nuance. "User prefers concise responses" and "user prefers concise responses except for technical explanations where they want full detail" are meaningfully different. A summarizer tends to flatten these into the simpler version.

I don't have a good answer here yet. Some form of structured preference extraction, where memories get parsed into typed fields rather than free text, seems promising. But we haven't found an approach that handles the full variety of things agents need to remember. This is still an open problem, and I suspect it will be for a while.
