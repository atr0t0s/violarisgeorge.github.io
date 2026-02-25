(function () {
  'use strict';

  // ─── Virtual Filesystem ──────────────────────────────────────────────
  var fs = {
    '~': {
      'about.txt': "I'm George, CTO at Hatchworks VC in Nicosia, Cyprus.\nI build AI products \u2014 Zeig.ai (financial analysis through conversation)\nand Spectre.ai (persistent memory for AI agents).\n\n15 years in software. PHP freelancing \u2192 server infrastructure \u2192\ninsurance systems \u2192 blockchain/DeFi \u2192 LLMs & agent orchestration.\n\nAlso advising Phoenix (DeFi liquidity provider) on protocol architecture.\n\nProud dad of two awesome twin boys.",
      'skills.txt': "AI:        LLMs, tool-calling, agent orchestration, persistent memory,\n           RL (PPO, Gymnasium), vector databases (Qdrant), RAG\nLanguages: TypeScript/JavaScript, Python, Go, PHP, Java\nFrontend:  React, Next.js, Vue.js, Laravel, Redux, Web3.js, Ethers.js\nDatabases: PostgreSQL, MySQL, MongoDB, Redis, Docker, Qdrant\nOther:     Blockchain/DeFi, Git, Neovim, system architecture",
      'contact.txt': "Email:   george@violaris.org\nGitHub:  https://github.com/atr0t0s\nX:       https://x.com/atr0t0s\nBlog:    https://blog.violaris.org\nWeb:     https://violaris.org",
      'projects': {
        'vio.txt': "Vio \u2014 AI-agent-first frontend framework\nhttps://github.com/atr0t0s/vio\n\nComponents are pure JSON data structures. State is immutable.\nEvery mutation is observable. No JSX, no hooks, no implicit context.\nVirtual DOM with diff/patch, two-level state management,\nobservable event bus, full programmatic control surface.\n\n~1200 lines of TypeScript. No external dependencies.",
        'obsitui.txt': "ObsiTUI \u2014 Terminal client for Obsidian\nhttps://github.com/atr0t0s/obsitui\n\nVim modal editing (actual modal, not a plugin approximation).\nAI-powered RAG search \u2014 Anthropic, OpenAI, or local via Ollama.\nPure functional editor \u2014 every operation returns new immutable state.\nReads your existing .obsidian config. No migration, no sync, no lock-in.\n\n301 tests. TypeScript."
      },
      'blog': {
        '1500-lines.txt': "1,500 Lines, One Commit\nhttps://blog.violaris.org/1-500-lines-one-commit-fc7afc3fa6d5",
        'typescript-and-python.txt': "Building Real-Time AI Financial Analysis:\nWhy We Use TypeScript AND Python\nhttps://blog.violaris.org/building-real-time-ai-financial-analysis-why-we-use-typescript-and-python-and-when-each-shines-412a1bae2eed",
        'model-never-traded.txt': "The Model That Never Made a Trade\nhttps://blog.violaris.org/the-model-that-never-made-a-trade-2d44289d116a",
        'eu-regulation.txt': "The EU Doesn't Kill Innovation. The US Regulatory Mess Might.\nhttps://blog.violaris.org/the-eu-doesnt-kill-innovation-the-us-regulatory-mess-might-8ba87d53d1c1",
        'software-not-dead.txt': "Software Is Not Dead \u2014 It's Evolving\nhttps://blog.violaris.org/software-is-not-dead-its-evolving-e3dd683ded2f",
        'obsitui.txt': "ObsiTUI: Why I Built a Terminal UI for Obsidian\nhttps://blog.violaris.org/obsitui-why-i-built-a-terminal-ui-for-obsidian-7f1ebc2fcd15",
        'agent-memory.txt': "What We Learned Building Agent Memory at Scale\nhttps://blog.violaris.org/what-we-learned-building-agent-memory-at-scale-10c1eeec81a4",
        'ai-devops.txt': "AI-Powered DevOps Orchestration\nhttps://blog.violaris.org/ai-powered-devops-orchestration-a-practical-approach-to-seamless-scaling-a5d79b39cc56",
        'langchain.txt': "Boosting Our Financial AI Project with LangChain\nhttps://blog.violaris.org/boosting-our-financial-ai-project-with-langchain-streamlined-development-and-model-testing-9f036bdece0c",
        'mcp.txt': "Unleashing AI Trading Potential with Model Context Protocol (MCP)\nhttps://blog.violaris.org/unleashing-ai-trading-potential-with-model-context-protocol-mcp-ce3bcf96ed3c",
        'code-to-assets.txt': "From Code to Assets: Revolutionizing Trading with AI and LLMs\nhttps://blog.violaris.org/from-code-to-assets-revolutionizing-trading-with-ai-and-llms-81bbd3954253"
      },
      'research': {
        'publications.txt': "1. \"On the Performance Evaluation and Analysis of the Hybridised\n   Bittorrent Protocol with Partial Mobility Characteristics\"\n   Violaris C.G., Mavromoustakis X.C. \u2014 AP2PS 2010\n   https://arxiv.org/abs/1009.1708\n\n2. \"On the Mobility Scenario Implementation Using a Graphical P2P\n   Discrete Event Simulator for the Bittorrent Protocol\"\n   Charalambous M. et al. \u2014 J. Algorithms & Computational Technology, 2013\n\n3. \"Out-of-Band Authentication Model with Hashcash Brute-Force Prevention\"\n   Violaris G., Dionysiou I. \u2014 IEEE CSS 2014"
      },
      'lab': {
        'multi-model-pipelines.txt': "Orchestrating Multi-Model AI Pipelines\n\nHow we route tasks across GPT-4, Claude, and Llama based on\ntask type, cost, and latency requirements. Covers fallback\nchains, model-specific prompt tuning, and cost optimization.",
        'agent-memory.txt': "Designing Persistent Memory for AI Agents\n\nHybrid storage (Postgres + Qdrant + Redis) with three memory\ntypes: user-specific, session-specific, and shared pools.\nCovers importance scoring, decay, and consolidation.",
        'rl-to-llm.txt': "From Reinforcement Learning to LLM Tool-Calling\n\nWhy we shelved a PPO trading agent for LLM tool-calling.\nCovers the trade-offs between training custom models vs.\nusing general-purpose LLMs with structured tool access."
      }
    }
  };

  // ─── Fortune Quotes ──────────────────────────────────────────────────
  var fortunes = [
    '"There are only two hard things in Computer Science: cache invalidation and naming things." \u2014 Phil Karlton',
    '"Any sufficiently advanced technology is indistinguishable from magic." \u2014 Arthur C. Clarke',
    '"First, solve the problem. Then, write the code." \u2014 John Johnson',
    '"The best error message is the one that never shows up." \u2014 Thomas Fuchs',
    '"Simplicity is prerequisite for reliability." \u2014 Edsger Dijkstra',
    '"Make it work, make it right, make it fast." \u2014 Kent Beck',
    '"Programs must be written for people to read, and only incidentally for machines to execute." \u2014 Abelson & Sussman',
    '"The most dangerous phrase in the language is \'We\'ve always done it this way.\'" \u2014 Grace Hopper',
    '"Talk is cheap. Show me the code." \u2014 Linus Torvalds',
    '"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." \u2014 Antoine de Saint-Exup\u00e9ry',
    '"It works on my machine." \u2014 Every developer ever',
    '"There is no cloud, it\'s just someone else\'s computer." \u2014 Unknown'
  ];

  // ─── State ───────────────────────────────────────────────────────────
  var cwd = '~';
  var history = [];
  var historyIndex = -1;
  var savedInput = '';
  var matrixRunning = false;
  var pingRunning = false;

  // ─── DOM References ──────────────────────────────────────────────────
  var toggle = document.getElementById('terminal-toggle');
  var panel = document.getElementById('terminal-panel');
  var closeBtn = document.getElementById('terminal-close');
  var body = document.getElementById('terminal-body');
  var input = document.getElementById('terminal-input');

  if (!toggle || !panel || !closeBtn || !body || !input) return;

  // ─── Helpers ─────────────────────────────────────────────────────────

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  }

  function printMultiLine(text, cls) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      printLine(lines[i], cls || '');
    }
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function getInputLine() {
    return body.querySelector('.terminal-input-line');
  }

  function promptString(path) {
    return 'visitor@violaris.org:' + path + '$ ';
  }

  function updatePrompt() {
    var promptEl = getInputLine().querySelector('.prompt');
    promptEl.textContent = promptString(cwd);
  }

  // ─── Output Functions ────────────────────────────────────────────────

  function printLine(text, cls) {
    var div = document.createElement('div');
    div.className = 'terminal-output-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    body.insertBefore(div, getInputLine());
    scrollToBottom();
  }

  function printHTML(html, cls) {
    var div = document.createElement('div');
    div.className = 'terminal-output-line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    body.insertBefore(div, getInputLine());
    scrollToBottom();
  }

  function printPromptEcho(cmdText) {
    var html = '<span class="prompt">' + escapeHTML(promptString(cwd)) + '</span>' + escapeHTML(cmdText);
    printHTML(html, 'cmd');
  }

  function printBlank() {
    printLine('', '');
  }

  // ─── Filesystem Helpers ──────────────────────────────────────────────

  function resolvePath(path) {
    if (!path || path === '~') return '~';
    var parts;
    if (path.startsWith('~/')) {
      parts = ['~'].concat(path.slice(2).split('/').filter(Boolean));
    } else if (path.startsWith('/')) {
      parts = ['~'].concat(path.slice(1).split('/').filter(Boolean));
    } else {
      var cwdParts = cwd.split('/').filter(Boolean);
      parts = cwdParts.concat(path.split('/').filter(Boolean));
    }

    var resolved = [];
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === '..') {
        if (resolved.length > 1) resolved.pop();
      } else if (parts[i] !== '.') {
        resolved.push(parts[i]);
      }
    }
    return resolved.join('/') || '~';
  }

  function getNode(path) {
    var resolved = resolvePath(path);
    if (resolved === '~') return fs['~'];
    var parts = resolved.split('/');
    var node = fs;
    for (var i = 0; i < parts.length; i++) {
      if (node && typeof node === 'object' && !Array.isArray(node) && parts[i] in node) {
        node = node[parts[i]];
      } else {
        return undefined;
      }
    }
    return node;
  }

  function isDir(node) {
    return node !== undefined && typeof node === 'object' && node !== null;
  }

  // ─── Commands ────────────────────────────────────────────────────────

  var commands = {};

  commands.help = function () {
    printBlank();
    printLine('  Navigation', 'accent');
    printHTML('    <span class="accent">ls</span> [path]       List directory contents');
    printHTML('    <span class="accent">cd</span> &lt;path&gt;       Change directory');
    printHTML('    <span class="accent">cat</span> &lt;file&gt;      View file contents');
    printHTML('    <span class="accent">pwd</span>              Print working directory');
    printBlank();
    printLine('  Info', 'accent');
    printHTML('    <span class="accent">about</span>            Who is George?');
    printHTML('    <span class="accent">skills</span>           Technical skills');
    printHTML('    <span class="accent">projects</span>         Project showcase');
    printHTML('    <span class="accent">blog</span>             Articles & writing');
    printHTML('    <span class="accent">contact</span>          Get in touch');
    printHTML('    <span class="accent">whoami</span>           Who are you?');
    printBlank();
    printLine('  Fun', 'accent');
    printHTML('    <span class="accent">neofetch</span>         System info');
    printHTML('    <span class="accent">cowsay</span> [msg]     Cow says things');
    printHTML('    <span class="accent">matrix</span>           Enter the matrix');
    printHTML('    <span class="accent">fortune</span>          Random wisdom');
    printHTML('    <span class="accent">ping</span> [host]      Ping a host');
    printHTML('    <span class="accent">vim</span>              Good luck');
    printHTML('    <span class="accent">echo</span> [text]      Print text');
    printHTML('    <span class="accent">date</span>             Current date/time');
    printHTML('    <span class="accent">uptime</span>           Site uptime');
    printHTML('    <span class="accent">sudo</span> [cmd]       Elevate privileges');
    printHTML('    <span class="accent">rm</span> [args]        Remove files');
    printBlank();
    printLine('  Utility', 'accent');
    printHTML('    <span class="accent">clear</span>            Clear terminal');
    printHTML('    <span class="accent">exit</span>             Close terminal');
    printHTML('    <span class="accent">history</span>          Command history');
    printBlank();
  };

  commands.ls = function (args) {
    var target = args.length > 0 ? args[0] : cwd;
    var node = getNode(target);
    if (node === undefined) {
      printLine('ls: cannot access \'' + target + '\': No such file or directory', 'error');
      return;
    }
    if (!isDir(node)) {
      printLine(target, '');
      return;
    }
    var keys = Object.keys(node).sort();
    var items = [];
    for (var i = 0; i < keys.length; i++) {
      if (isDir(node[keys[i]])) {
        items.push('<span class="accent">' + escapeHTML(keys[i]) + '/</span>');
      } else {
        items.push(escapeHTML(keys[i]));
      }
    }
    printHTML(items.join('  '));
  };

  commands.cd = function (args) {
    var target = args.length > 0 ? args[0] : '~';
    var resolved = resolvePath(target);
    var node = getNode(resolved);
    if (node === undefined) {
      printLine('cd: ' + target + ': No such file or directory', 'error');
      return;
    }
    if (!isDir(node)) {
      printLine('cd: ' + target + ': Not a directory', 'error');
      return;
    }
    cwd = resolved;
    updatePrompt();
  };

  commands.cat = function (args) {
    if (args.length === 0) {
      printLine('cat: missing operand', 'error');
      return;
    }
    var node = getNode(args[0]);
    if (node === undefined) {
      printLine('cat: ' + args[0] + ': No such file or directory', 'error');
      return;
    }
    if (isDir(node)) {
      printLine('cat: ' + args[0] + ': Is a directory', 'error');
      return;
    }
    printMultiLine(node);
  };

  commands.pwd = function () {
    printLine(cwd, '');
  };

  // ─── Info Shortcuts ──────────────────────────────────────────────────

  commands.about = function () {
    printMultiLine(getNode('~/about.txt'));
  };

  commands.skills = function () {
    printMultiLine(getNode('~/skills.txt'));
  };

  commands.projects = function () {
    printLine('Projects:', '');
    printBlank();
    var dir = getNode('~/projects');
    var keys = Object.keys(dir).sort();
    for (var i = 0; i < keys.length; i++) {
      printMultiLine(dir[keys[i]]);
      if (i < keys.length - 1) printBlank();
    }
  };

  commands.blog = function () {
    printLine('Articles & Writing:', '');
    printBlank();
    var dir = getNode('~/blog');
    var keys = Object.keys(dir).sort();
    for (var i = 0; i < keys.length; i++) {
      printMultiLine(dir[keys[i]]);
      if (i < keys.length - 1) printBlank();
    }
  };

  commands.contact = function () {
    printMultiLine(getNode('~/contact.txt'));
  };

  commands.whoami = function () {
    printLine('a curious visitor exploring violaris.org', '');
  };

  // ─── Utility Commands ────────────────────────────────────────────────

  commands.clear = function () {
    var outputLines = body.querySelectorAll('.terminal-output-line');
    for (var i = 0; i < outputLines.length; i++) {
      outputLines[i].parentNode.removeChild(outputLines[i]);
    }
  };

  commands.exit = function () {
    closeTerminal();
  };

  commands.history = function () {
    for (var i = 0; i < history.length; i++) {
      printLine('  ' + (i + 1) + '  ' + history[i], '');
    }
  };

  // ─── Fun / Easter Egg Commands ───────────────────────────────────────

  commands.neofetch = function () {
    var logo = [
      '        \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2557   \u2588\u2588\u2557',
      '       \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2551   \u2588\u2588\u2551',
      '       \u2588\u2588\u2551  \u2588\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551',
      '       \u2588\u2588\u2551   \u2588\u2588\u2551\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D',
      '       \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u255A\u2588\u2588\u2588\u2588\u2554\u255D ',
      '        \u255A\u2550\u2550\u2550\u2550\u2550\u255D   \u255A\u2550\u2550\u2550\u255D  '
    ];
    var info = [
      'visitor@violaris.org',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      'OS: Jekyll on GitHub Pages',
      'Host: violaris.org',
      'Kernel: Vanilla JS',
      'Uptime: since 2024',
      'Packages: 7 sections',
      'Shell: terminal.js',
      'Theme: ' + (document.documentElement.getAttribute('data-theme') === 'light' ? 'Light Warm' : 'Dark Premium') + ' [cyan]',
      'Font: JetBrains Mono / Inter'
    ];
    var pad = '                                 ';
    for (var i = 0; i < Math.max(logo.length, info.length); i++) {
      var left = i < logo.length ? logo[i] : '';
      var right = i < info.length ? info[i] : '';
      var leftPadded = left;
      while (leftPadded.length < 32) leftPadded += ' ';
      printHTML('<span class="accent">' + escapeHTML(leftPadded) + '</span>' + escapeHTML(right));
    }
  };

  commands.cowsay = function (args) {
    var msg = args.length > 0 ? args.join(' ') : 'moo';
    var len = msg.length;
    var border = ' ' + new Array(len + 3).join('_');
    var bottom = ' ' + new Array(len + 3).join('-');
    printLine(border, '');
    printLine('< ' + msg + ' >', '');
    printLine(bottom, '');
    printLine('        \\   ^__^', '');
    printLine('         \\  (oo)\\_______', '');
    printLine('            (__)\\       )\\/\\', '');
    printLine('                ||----w |', '');
    printLine('                ||     ||', '');
  };

  commands.matrix = function () {
    if (matrixRunning) return;
    matrixRunning = true;
    var canvas = document.createElement('canvas');
    canvas.className = 'terminal-matrix-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '10';
    body.style.position = 'relative';
    body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;

    var fontSize = 14;
    var columns = Math.floor(canvas.width / fontSize);
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F3';
    var animId;
    var startTime = Date.now();

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (var i = 0; i < drops.length; i++) {
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (Date.now() - startTime < 5000) {
        animId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animId);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        matrixRunning = false;
        printLine('Wake up, Neo...', 'success');
        scrollToBottom();
      }
    }

    animId = requestAnimationFrame(draw);
  };

  commands.fortune = function () {
    var idx = Math.floor(Math.random() * fortunes.length);
    printLine(fortunes[idx], '');
  };

  commands.ping = function (args) {
    if (pingRunning) return;
    pingRunning = true;
    var host = args.length > 0 ? args[0] : 'violaris.org';
    var count = 0;

    function pingLine() {
      if (count < 3) {
        var ms = (Math.random() * 70 + 10).toFixed(1);
        printLine('64 bytes from ' + host + ': icmp_seq=' + (count + 1) + ' ttl=64 time=' + ms + ' ms', '');
        count++;
        setTimeout(pingLine, 500);
      } else {
        printLine('^C', '');
        printLine('--- ' + host + ' ping statistics ---', '');
        printLine('just kidding, this is a static site.', 'accent');
        pingRunning = false;
        scrollToBottom();
      }
    }

    printLine('PING ' + host + ' (127.0.0.1): 56 data bytes', '');
    setTimeout(pingLine, 500);
  };

  commands.vim = function () {
    printLine("You're now in vim. Good luck getting out.", '');
    setTimeout(function () {
      printLine('(Just kidding, press Esc to exit... the terminal.)', '');
      scrollToBottom();
    }, 1500);
  };

  commands.echo = function (args) {
    printLine(args.join(' '), '');
  };

  commands.date = function () {
    printLine(new Date().toString(), '');
  };

  commands.uptime = function () {
    var start = new Date(2024, 2, 1); // March 1, 2024
    var now = new Date();
    var diff = now - start;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    printLine('up ' + days + ' days, ' + hours + ' hours, ' + minutes + ' minutes', '');
  };

  commands.sudo = function () {
    printLine('Nice try.', 'error');
  };

  commands.rm = function (args) {
    var argsStr = args.join(' ');
    if (argsStr.indexOf('-rf') !== -1 || argsStr.indexOf('-r -f') !== -1 || argsStr.indexOf('-f -r') !== -1) {
      printLine("I appreciate your enthusiasm, but no.", 'error');
    } else {
      printLine('rm: permission denied', 'error');
    }
  };

  // ─── Tab Completion ──────────────────────────────────────────────────

  var pathCommands = ['cd', 'cat', 'ls'];

  function getCompletions(value) {
    var parts = value.split(/\s+/);
    var cmd = parts[0];

    // If typing a command (no space yet or first token)
    if (parts.length <= 1) {
      var allCommands = Object.keys(commands);
      return {
        type: 'command',
        prefix: cmd,
        matches: allCommands.filter(function (c) {
          return c.indexOf(cmd) === 0;
        })
      };
    }

    // Path completion for path-aware commands
    if (pathCommands.indexOf(cmd) !== -1) {
      var partial = parts.slice(1).join(' ');
      var lastSlash = partial.lastIndexOf('/');
      var dirPart, filePart;

      if (lastSlash === -1) {
        dirPart = cwd;
        filePart = partial;
      } else {
        dirPart = partial.substring(0, lastSlash) || (partial.startsWith('/') ? '/' : cwd);
        if (!partial.startsWith('/') && !partial.startsWith('~') && lastSlash > 0) {
          dirPart = cwd + '/' + dirPart;
        }
        filePart = partial.substring(lastSlash + 1);
      }

      var dirNode = getNode(dirPart);
      if (!isDir(dirNode)) return { type: 'path', prefix: partial, matches: [] };

      var keys = Object.keys(dirNode);
      var matches = keys.filter(function (k) {
        return k.indexOf(filePart) === 0;
      }).map(function (k) {
        return isDir(dirNode[k]) ? k + '/' : k;
      });

      return {
        type: 'path',
        prefix: filePart,
        dirPrefix: lastSlash === -1 ? '' : partial.substring(0, lastSlash + 1),
        cmd: cmd,
        matches: matches
      };
    }

    return { type: 'none', prefix: '', matches: [] };
  }

  function handleTab(e) {
    e.preventDefault();
    var value = input.value;
    var result = getCompletions(value);

    if (result.matches.length === 0) return;

    if (result.matches.length === 1) {
      if (result.type === 'command') {
        input.value = result.matches[0] + ' ';
      } else if (result.type === 'path') {
        input.value = result.cmd + ' ' + (result.dirPrefix || '') + result.matches[0];
      }
    } else {
      printPromptEcho(value);
      printLine(result.matches.join('  '), '');
    }
  }

  // ─── Execute Command ─────────────────────────────────────────────────

  function executeCommand(line) {
    var trimmed = line.trim();
    if (!trimmed) {
      printPromptEcho('');
      return;
    }

    history.push(trimmed);
    if (history.length > 100) history.shift();
    historyIndex = -1;
    savedInput = '';

    printPromptEcho(trimmed);

    var parts = trimmed.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var args = parts.slice(1);

    if (commands.hasOwnProperty(cmd)) {
      commands[cmd](args);
    } else {
      printLine(cmd + ': command not found. Type \'help\' for available commands.', 'error');
    }
  }

  // ─── Open / Close ────────────────────────────────────────────────────

  function openTerminal() {
    panel.classList.add('open');
    toggle.classList.add('active');
    input.focus();
  }

  function closeTerminal() {
    panel.classList.remove('open');
    toggle.classList.remove('active');
  }

  function toggleTerminal() {
    if (panel.classList.contains('open')) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  // ─── Event Listeners ─────────────────────────────────────────────────

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTerminal();
  });

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeTerminal();
  });

  input.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        var val = input.value;
        input.value = '';
        executeCommand(val);
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (history.length === 0) return;
        if (historyIndex === -1) {
          savedInput = input.value;
          historyIndex = history.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        input.value = history[historyIndex];
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex === -1) return;
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = -1;
          input.value = savedInput;
        }
        break;

      case 'Tab':
        handleTab(e);
        break;

      case 'Escape':
        e.preventDefault();
        closeTerminal();
        break;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeTerminal();
    }
  });

  // Click on terminal body should focus input
  body.addEventListener('click', function () {
    input.focus();
  });
})();
