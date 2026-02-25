(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var nodes = [];
  var mouse = { x: -1000, y: -1000 };
  var NODE_COUNT = 50;
  var CONNECTION_DIST = 150;
  var MOUSE_RADIUS = 200;
  var running = true;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNode() {
    return {
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 2 + Math.random() * 2,
      opacity: 0,
      targetOpacity: 0.3 + Math.random() * 0.5,
      fadeSpeed: 0.005 + Math.random() * 0.01
    };
  }

  function init() {
    resize();
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push(createNode());
    }
  }

  function dist(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function draw() {
    if (!running) return;

    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    var dark = isDark();
    var nodeColor = dark ? '0, 212, 255' : '0, 119, 170';
    var lineColor = dark ? '0, 212, 255' : '0, 119, 170';

    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var d = dist(nodes[i], nodes[j]);
        if (d < CONNECTION_DIST) {
          var alpha = (1 - d / CONNECTION_DIST) * 0.15 * Math.min(nodes[i].opacity, nodes[j].opacity);
          ctx.strokeStyle = 'rgba(' + lineColor + ',' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw nodes
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];

      // Fade in
      if (n.opacity < n.targetOpacity) {
        n.opacity = Math.min(n.opacity + n.fadeSpeed, n.targetOpacity);
      }

      // Mouse interaction
      var md = dist(n, mouse);
      if (md < MOUSE_RADIUS) {
        var force = (1 - md / MOUSE_RADIUS) * 0.5;
        var angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
        n.vx += Math.cos(angle) * force;
        n.vy += Math.sin(angle) * force;
      }

      // Damping
      n.vx *= 0.99;
      n.vy *= 0.99;

      // Move
      n.x += n.vx;
      n.y += n.vy;

      // Bounce off edges
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.x = Math.max(0, Math.min(w, n.x));
      n.y = Math.max(0, Math.min(h, n.y));

      // Draw node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + nodeColor + ',' + n.opacity + ')';
      ctx.fill();

      // Glow
      if (n.opacity > 0.3) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + nodeColor + ',' + (n.opacity * 0.15) + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  // Mouse tracking on hero section
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
    nodes.forEach(function (n) { n.opacity = n.targetOpacity; });
    running = true;
    draw();
    running = false;
  } else {
    init();
    draw();
  }

  window.addEventListener('resize', resize);
})();
