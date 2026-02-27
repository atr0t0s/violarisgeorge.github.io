---
layout: article
title: Building a Full-Stack AI Framework for PHP
---

## Building a Full-Stack AI Framework for PHP

Every PHP AI project I've seen starts the same way. You pick a framework — Laravel, Symfony, Slim — then bolt on an HTTP client to talk to OpenAI, write a wrapper to normalize responses, add another wrapper when the client wants Anthropic support, then realize your embeddings pipeline needs a vector database, and suddenly half your codebase is glue code that has nothing to do with your application.

[Smallwork](https://smallwork.violaris.org) is a full-stack PHP framework built around AI from the start. Router, database, auth, templates, vector search, multi-provider AI gateway — all in one package, all designed to work together, all without the overhead of a large framework. This article covers the architecture decisions behind it.

### Why PHP, why now

PHP runs most of the web. WordPress, Drupal, MediaWiki, countless internal tools at companies that will never rewrite them. When these teams want to add AI features — a chatbot, semantic search, content moderation — they don't want to spin up a Python microservice and manage a new deployment pipeline. They want to call an API from the language they already use.

The problem is that PHP's AI ecosystem is fragmented. There's no standard way to talk to multiple LLM providers. No built-in support for embeddings or vector search. No middleware patterns for things like content moderation or intent classification that slot into your existing request pipeline. You end up writing the same boilerplate across every project.

Smallwork puts all of that into the framework layer so application code stays focused on the application.

### The AI gateway

The core design decision is a unified gateway that normalizes the interface across providers. OpenAI, Anthropic, and Grok all have different request formats, different response shapes, different streaming protocols. The gateway abstracts that away:

```php
$gateway = new Gateway(defaultProvider: 'openai');

$gateway->register('openai', new OpenAIProvider(
    baseUrl: 'https://api.openai.com/v1',
    apiKey: env('OPENAI_API_KEY'),
    defaultModel: 'gpt-4o',
));

$gateway->register('anthropic', new AnthropicProvider(
    baseUrl: 'https://api.anthropic.com',
    apiKey: env('ANTHROPIC_API_KEY'),
    defaultModel: 'claude-sonnet-4-6',
));
```

Every call goes through the same interface. Switch providers per request with a single parameter:

```php
$result = $gateway->chat($messages);                        // uses default
$result = $gateway->chat($messages, provider: 'anthropic'); // override
```

The response shape is identical regardless of provider — `content`, `usage` with token counts, same structure every time. No conditionals in application code to handle different provider quirks.

This matters because provider choice shouldn't be an architectural decision. It should be a runtime parameter. When OpenAI has an outage, you change one string. When Anthropic ships a better model for your use case, you change one string. Your application code doesn't know or care.

### AI middleware

The most interesting pattern in Smallwork is AI middleware — processing that runs in the request pipeline before your controller sees the request. The framework ships three:

**Content moderation** checks incoming text against an LLM for safety:

```php
$moderation = new ContentModeration(
    gateway: $gateway,
    fields: ['message', 'content', 'text'],
    provider: 'openai',
);
$app->addMiddleware($moderation);
```

Any request with flagged content gets a 422 before it reaches your controller. No per-route checks, no repeated validation logic.

**Intent classification** tags every request with a category:

```php
$intent = new IntentClassifier(
    gateway: $gateway,
    categories: ['question', 'command', 'feedback', 'complaint', 'other'],
);
$app->addMiddleware($intent);

// In your controller
$intent = $request->getAttribute('intent'); // "question"
```

**Auto-summarization** condenses long inputs:

```php
$summarizer = new AutoSummarizer(
    gateway: $gateway,
    threshold: 500,
);
$app->addMiddleware($summarizer);
```

These compose with regular middleware. You can stack rate limiting, CORS, auth, content moderation, and intent classification in a single pipeline. The onion model means each layer wraps the next:

```php
$app->addMiddleware(new CorsMiddleware());
$app->addMiddleware(new RateLimitMiddleware(maxRequests: 100, windowSeconds: 60));
$app->addMiddleware(AuthMiddleware::jwt($jwt));
$app->addMiddleware($moderation);
$app->addMiddleware($intent);
```

A request hits CORS first, then rate limiting, then auth, then moderation, then intent classification, then your controller. Each layer can short-circuit — a rate-limited request never touches the AI providers.

### Vector search and RAG

Embeddings and semantic search are first-class. The framework provides a `SemanticSearch` class that handles the full pipeline — embed the query, search the vector store, return ranked results:

```php
$search = new SemanticSearch(
    gateway: $gateway,
    vectorStore: $qdrantAdapter,
    collection: 'documents',
);

$search->index('doc-1', 'PHP is a server-side scripting language.', ['source' => 'wiki']);

$results = $search->search('What language runs on the server?', limit: 5);
```

Two vector store backends — Qdrant for dedicated deployments, pgvector for teams already on PostgreSQL. Both implement the same interface, so switching is a constructor change.

The RAG pattern is explicit rather than magical:

```php
$context = $search->formatRagContext('What frameworks exist?', $results);
$response = $gateway->chat([
    ['role' => 'system', 'content' => "Answer using this context:\n$context"],
    ['role' => 'user', 'content' => 'What frameworks exist for PHP?'],
]);
```

No hidden prompt injection. You see exactly what context goes to the model, you control the system prompt, you decide how search results map to chat context. This is deliberate — RAG pipelines are hard to debug when the framework hides the prompts.

### The non-AI parts

A framework is only useful if the fundamentals work. Smallwork ships with:

**Routing** with groups, parameter extraction, and per-route middleware:

```php
$router->group('/api/v1', function (Router $r) {
    $r->get('/users', [UserController::class, 'index']);
    $r->post('/users', [UserController::class, 'store']);
}, middleware: ['AuthMiddleware']);
```

**Immutable request/response objects.** `Response::json()`, `Response::html()`, `Response::stream()` for SSE. Responses are immutable — `withHeader` returns a new instance.

**A query builder** that supports SQLite, MySQL, and PostgreSQL with a fluent interface, transactions, and migrations:

```php
$users = (new QueryBuilder($db, 'users'))
    ->select('id', 'name')
    ->where('active', '=', 1)
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->get();
```

**JWT and API key auth** with role-based access control:

```php
$router->group('/admin', function (Router $r) {
    $r->get('/stats', [AdminController::class, 'stats']);
}, middleware: [$adminOnly]);
```

**A template engine** with Blade-like syntax — `@if`, `@foreach`, `@extends`, `@yield` — plus HTMX helpers for interactive UIs without JavaScript.

**A CLI** for migrations, scaffolding, and a built-in dev server:

```bash
php smallwork serve
php smallwork migrate
php smallwork make:controller User
```

None of this is novel individually. The point is that it all ships together, configured to work together, so you don't spend the first week of a project wiring up packages.

### Prompt management

Prompts are versioned files, not strings buried in controller code:

```php
$versions = new VersionManager('app/Prompts');
$template = $versions->latest('greeting');
$prompt = $engine->render($template, ['name' => 'Alice', 'app' => 'MyApp']);
```

Template files live in `app/Prompts/` with version suffixes — `greeting.v1.prompt`, `greeting.v2.prompt`. The version manager discovers them, the template engine renders them with variable substitution. If a placeholder is left unsubstituted, it throws.

This is intentionally low-tech. No database-backed prompt storage, no A/B testing framework, no analytics dashboard. Just files on disk that you can version control, diff, and review in a pull request. The version manager gives you `latest()` and `version(n)` — enough to roll back a bad prompt without redeploying.

### Testing AI code

AI responses are non-deterministic. You can't assert on exact output. Smallwork provides `AIMock` to make AI code testable:

```php
$gateway = AIMock::chat('Mocked AI response', [
    'prompt_tokens' => 10,
    'completion_tokens' => 20,
    'total_tokens' => 30,
]);

$result = $gateway->chat([['role' => 'user', 'content' => 'Hello']]);
$this->assertEquals('Mocked AI response', $result['content']);
```

The mock returns a gateway that implements the same interface. Your controller doesn't know it's talking to a mock. The `TestCase` base class provides `createApp()`, `get()`, `post()`, and `json()` for end-to-end route testing with zero boilerplate.

In-memory adapters — `RedisAdapter::createInMemory()`, SQLite `:memory:` — mean tests run without external services. No Docker containers, no test databases to seed and tear down.

### What's still missing

**No ORM.** The query builder is deliberate — it generates SQL you can read and debug. But for applications with complex relationships, writing joins by hand gets tedious. An active-record or data-mapper layer might make sense eventually, but I'd rather ship without one than ship a bad one.

**No queue system.** AI calls are slow. A production app needs background job processing for anything that doesn't need an immediate response — batch embeddings, async moderation, scheduled summarization. Right now that's left to the application to solve.

**No WebSocket support.** The SSE streaming works for server-to-client AI responses, but bidirectional real-time communication isn't built in. If you need a chat interface with typing indicators, you're bringing your own WebSocket server.

**Single-process only.** The rate limiter uses in-memory storage, the DI container is per-process, Redis connections aren't pooled. This is fine for single-server deployments and development. For horizontal scaling, you'd need to swap the rate limiter backend to Redis and handle connection pooling at the infrastructure level.

The framework is opinionated about what to include and what to leave out. Everything that ships is tested, documented, and designed to compose with the rest. The gaps are where I haven't found an approach that meets that standard yet.
