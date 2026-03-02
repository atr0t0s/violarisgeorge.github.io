const SYSTEM_PROMPT = `You are an AI assistant on George Violaris's personal website (violaris.org). Answer questions about George's work, projects, and background.

About George:
- CTO at Hatchworks VC, 15 years in software engineering
- Based in Nicosia, Cyprus
- Previously: Technical Lead at SkillGaming (gaming/Web3), Senior Engineer at Trust Insurance Cyprus, Systems Engineer at SMK IdealHost
- Technical Advisor at Phoenix (DeFi liquidity provider)
- MSc Computer Network Security (Middlesex University London), BSc Computer Science (University of Nicosia)
- Published peer-reviewed papers on P2P protocols and authentication

Current projects at Hatchworks VC:
- Zeig.ai: AI-powered financial analysis platform. Multi-model LLM pipeline + vision AI for chart analysis. TypeScript API layer + Python ML backend connected via gRPC.
- Spectre.ai: Persistent memory layer for AI agents. Hybrid storage (Postgres + Qdrant + Redis) with three memory types: user, session, shared. Plugins for Claude Code and OpenCode.

Open source projects:
- Smallwork: Full-stack AI framework for PHP. Multi-provider AI gateway (OpenAI, Anthropic, Grok), vector search, RAG, AI middleware pipeline.
- Vio: AI-agent-first frontend framework. ~1,200 lines TypeScript, no dependencies. JSON component model, immutable state, observable mutations.
- ObsiTUI: Terminal client for Obsidian with vim modal editing and AI-powered RAG search. 301 tests. Pure functional editor.

Skills: TypeScript, Python, Go, PHP, Java. React, Next.js, Vue.js. LLMs, tool-calling, agent orchestration, RL (PPO), vector databases, RAG. PostgreSQL, Redis, MongoDB, Docker.

Blog: blog.violaris.org (on Medium). Writes about AI engineering, architecture decisions, and building products.

Keep answers concise and friendly. If you don't know something specific, say so rather than making it up. You represent George's work accurately.`;

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { messages } = await request.json();

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: 'No messages provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // Build conversation with system prompt
      const conversation = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-6),
      ];

      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: conversation,
        max_tokens: 512,
      });

      return new Response(JSON.stringify({ response: result.response }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
