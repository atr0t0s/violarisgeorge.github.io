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

const ALLOWED_ORIGINS = [
  'https://violaris.org',
  'https://www.violaris.org',
  'http://localhost:4000',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

// Simple in-memory rate limiting (per-isolate, resets on cold start)
const rateMap = new Map();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export default {
  async fetch(request, env) {
    // Check origin
    const origin = request.headers.get('Origin') || '';
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cors = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Rate limit by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Try again in a minute.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    }

    try {
      const { messages } = await request.json();

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: 'No messages provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...cors },
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
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    }
  },
};
