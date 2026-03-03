(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var mouse = { x: -1000, y: -1000 };
  var MOUSE_REPEL = 140;
  var LABEL_RADIUS = 200;
  var HIGHLIGHT_RADIUS = 60;
  var running = true;

  // --- Data ---

  var projectDefs = [
    { name: 'Zeig.ai',    type: 'project' },
    { name: 'Spectre.ai', type: 'project' },
    { name: 'Vio',        type: 'project' },
    { name: 'ObsiTUI',    type: 'project' },
    { name: 'Smallwork',  type: 'project' }
  ];

  var skillDefs = [
    { name: 'TypeScript',  type: 'skill' },
    { name: 'Python',      type: 'skill' },
    { name: 'Go',          type: 'skill' },
    { name: 'PHP',         type: 'skill' },
    { name: 'AI/LLMs',     type: 'skill' },
    { name: 'React',       type: 'skill' },
    { name: 'Docker',      type: 'skill' },
    { name: 'PostgreSQL',  type: 'skill' }
  ];

  var edgeDefs = [
    ['Zeig.ai',    'TypeScript'],
    ['Zeig.ai',    'Python'],
    ['Zeig.ai',    'AI/LLMs'],
    ['Zeig.ai',    'PostgreSQL'],
    ['Zeig.ai',    'React'],
    ['Spectre.ai', 'TypeScript'],
    ['Spectre.ai', 'Python'],
    ['Spectre.ai', 'AI/LLMs'],
    ['Spectre.ai', 'PostgreSQL'],
    ['Spectre.ai', 'Docker'],
    ['Vio',        'TypeScript'],
    ['Vio',        'React'],
    ['ObsiTUI',    'TypeScript'],
    ['ObsiTUI',    'AI/LLMs'],
    ['Smallwork',  'PHP'],
    ['Smallwork',  'AI/LLMs'],
    ['Smallwork',  'PostgreSQL'],
    ['Smallwork',  'Docker']
  ];

  // --- Build graph ---

  var nodeDefs = projectDefs.concat(skillDefs);
  var nodeMap = {};
  var nodes = [];
  var edges = [];

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function buildGraph() {
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;

    nodes = [];
    nodeMap = {};

    for (var i = 0; i < nodeDefs.length; i++) {
      var def = nodeDefs[i];
      var node = {
        name: def.name,
        type: def.type,
        x: 40 + Math.random() * (w - 80),
        y: 40 + Math.random() * (h - 80),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: def.type === 'project' ? 6 : 4,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.0003 + Math.random() * 0.0004,
        driftAmp: 0.004 + Math.random() * 0.008,
        edges: []
      };
      nodes.push(node);
      nodeMap[def.name] = node;
    }

    edges = [];
    for (var j = 0; j < edgeDefs.length; j++) {
      var a = nodeMap[edgeDefs[j][0]];
      var b = nodeMap[edgeDefs[j][1]];
      if (a && b) {
        var edge = { a: a, b: b };
        edges.push(edge);
        a.edges.push(edge);
        b.edges.push(edge);
      }
    }
  }

  // --- Canvas sizing ---

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // --- Helpers ---

  function dist(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function findClosestNode() {
    var closest = null;
    var closestDist = HIGHLIGHT_RADIUS;
    for (var i = 0; i < nodes.length; i++) {
      var d = dist(nodes[i].x, nodes[i].y, mouse.x, mouse.y);
      if (d < closestDist) {
        closestDist = d;
        closest = nodes[i];
      }
    }
    return closest;
  }

  // --- Colors ---

  function getColors() {
    var dark = isDark();
    return {
      projectFill:    dark ? '#34d399' : '#0077aa',
      skillFill:      dark ? '#e0a85c' : '#b07830',
      lineDim:        dark ? 'rgba(52,211,153,0.12)' : 'rgba(0,119,170,0.10)',
      lineHighlight:  dark ? 'rgba(52,211,153,0.45)' : 'rgba(0,119,170,0.40)',
      labelColor:     dark ? 'rgba(255,255,255,1.0)' : 'rgba(0,0,0,0.75)',
      labelDimColor:  dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.45)',
      glowProject:    dark ? 'rgba(52,211,153,0.20)' : 'rgba(0,119,170,0.12)',
      glowSkill:      dark ? 'rgba(224,168,92,0.16)' : 'rgba(176,120,48,0.10)',
      highlightProject: dark ? '#5ee8b5' : '#0099cc',
      highlightSkill:   dark ? '#f0c880' : '#cc8820',
      dimProject:     dark ? 'rgba(52,211,153,0.35)' : 'rgba(0,119,170,0.35)',
      dimSkill:       dark ? 'rgba(224,168,92,0.35)' : 'rgba(176,120,48,0.35)'
    };
  }

  // --- Draw ---

  function draw() {
    if (!running) return;

    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    var colors = getColors();
    var hovered = findClosestNode();

    // Build set of highlighted nodes
    var highlightSet = null;
    if (hovered) {
      highlightSet = {};
      highlightSet[hovered.name] = true;
      for (var e = 0; e < hovered.edges.length; e++) {
        var edge = hovered.edges[e];
        highlightSet[edge.a.name] = true;
        highlightSet[edge.b.name] = true;
      }
    }

    ctx.clearRect(0, 0, w, h);

    // Draw edges
    for (var i = 0; i < edges.length; i++) {
      var eg = edges[i];
      var isHighlighted = hovered && highlightSet[eg.a.name] && highlightSet[eg.b.name] &&
                          (eg.a === hovered || eg.b === hovered);
      ctx.strokeStyle = isHighlighted ? colors.lineHighlight : colors.lineDim;
      ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
      if (isHighlighted) {
        ctx.shadowColor = colors.lineHighlight;
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.moveTo(eg.a.x, eg.a.y);
      ctx.lineTo(eg.b.x, eg.b.y);
      ctx.stroke();
      if (isHighlighted) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    }

    // Update and draw nodes
    var mouseDist;
    var t = Date.now();
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];

      // Gentle drift: sine-based ambient motion
      n.vx += Math.sin(t * n.driftSpeed + n.driftPhase) * n.driftAmp;
      n.vy += Math.cos(t * n.driftSpeed * 0.7 + n.driftPhase) * n.driftAmp;

      // Mouse repel
      mouseDist = dist(n.x, n.y, mouse.x, mouse.y);
      if (mouseDist < MOUSE_REPEL && mouseDist > 0) {
        var force = (1 - mouseDist / MOUSE_REPEL) * 0.35;
        var angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
        n.vx += Math.cos(angle) * force;
        n.vy += Math.sin(angle) * force;
      }

      // Damping — keep speed gentle
      n.vx *= 0.94;
      n.vy *= 0.94;

      // Clamp max speed
      var speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (speed > 0.8) {
        n.vx = (n.vx / speed) * 0.8;
        n.vy = (n.vy / speed) * 0.8;
      }

      // Move
      n.x += n.vx;
      n.y += n.vy;

      // Bounce off edges with padding
      var pad = 20;
      if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx); }
      if (n.x > w - pad) { n.x = w - pad; n.vx = -Math.abs(n.vx); }
      if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy); }
      if (n.y > h - pad) { n.y = h - pad; n.vy = -Math.abs(n.vy); }

      // Determine visual state
      var isDimmed = hovered && !highlightSet[n.name];
      var isNodeHighlighted = hovered && highlightSet[n.name];
      var isProject = n.type === 'project';

      var fillColor;
      if (isDimmed) {
        fillColor = isProject ? colors.dimProject : colors.dimSkill;
      } else if (isNodeHighlighted) {
        fillColor = isProject ? colors.highlightProject : colors.highlightSkill;
      } else {
        fillColor = isProject ? colors.projectFill : colors.skillFill;
      }

      // Glow for highlighted nodes
      if (isNodeHighlighted) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = isProject ? colors.glowProject : colors.glowSkill;
        ctx.fill();
      }

      // Node circle with radial gradient
      var grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius + 3);
      grad.addColorStop(0, fillColor);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Labels — only show near mouse
      var labelDist = dist(n.x, n.y, mouse.x, mouse.y);
      if (labelDist < LABEL_RADIUS) {
        var labelAlpha = 1 - (labelDist / LABEL_RADIUS);
        var fontSize = isProject ? 11 : 9;
        ctx.font = (isProject ? '600 ' : '400 ') + fontSize + 'px Inter, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Label color with fade
        var dark = isDark();
        var r, g, b;
        if (isDimmed) {
          r = dark ? 255 : 0; g = dark ? 255 : 0; b = dark ? 255 : 0;
          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (labelAlpha * 0.3) + ')';
        } else {
          r = dark ? 255 : 0; g = dark ? 255 : 0; b = dark ? 255 : 0;
          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (labelAlpha * 0.85) + ')';
        }

        ctx.fillText(n.name, n.x, n.y + n.radius + 4);
      }
    }

    requestAnimationFrame(draw);
  }

  // --- Init ---

  function init() {
    resize();
    buildGraph();
  }

  // --- Events ---

  canvas.parentElement.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    running = false;
    init();
    running = true;
    draw();
    running = false;
  } else {
    init();
    draw();
  }

  window.addEventListener('resize', function () {
    resize();
    // Re-clamp nodes to new bounds
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].x = Math.min(nodes[i].x, w - 20);
      nodes[i].y = Math.min(nodes[i].y, h - 20);
    }
  });
})();
