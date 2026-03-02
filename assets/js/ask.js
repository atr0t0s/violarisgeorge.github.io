(function () {
  var WORKER_URL = 'https://violaris-ask.violarisgeorge.workers.dev';

  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var messages = document.getElementById('ask-messages');
  var submit = document.getElementById('ask-submit');

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMarkdown(text) {
    // Step 1: Normalize inline text into lines.
    // Insert line breaks before **headings**
    var s = text.replace(/\s*(\*\*[^*]+?\*\*)/g, '\n\n$1');

    // Split inline numbered lists: "1. foo 2. bar" → separate lines
    // Match " N. " where N follows a non-digit (avoids "v2. " or "PHP 5. Java")
    s = s.replace(/(?:^|\s)(\d+)\.\s/gm, '\n$1. ');

    // Step 2: Escape HTML
    var html = escapeHtml(s);

    // Step 3: Inline formatting
    // Code blocks
    html = html.replace(/```(?:\w*)\n?([\s\S]*?)```/g, function (_, code) {
      return '\n<pre><code>' + code.trim() + '</code></pre>\n';
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic (simple — single * not adjacent to another *)
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Step 4: Split into blocks and render
    var blocks = html.split(/\n{2,}/);
    var out = [];

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i].trim();
      if (!block) continue;

      // Already a pre block
      if (block.indexOf('<pre>') === 0) {
        out.push(block);
        continue;
      }

      // Check lines for list patterns
      var lines = block.split('\n');
      var nonEmpty = [];
      for (var j = 0; j < lines.length; j++) {
        if (lines[j].trim()) nonEmpty.push(lines[j].trim());
      }

      if (nonEmpty.length === 0) continue;

      // Numbered list?
      var olCount = 0;
      for (var a = 0; a < nonEmpty.length; a++) {
        if (/^\d+\.\s/.test(nonEmpty[a])) olCount++;
      }

      if (olCount > 1 && olCount >= nonEmpty.length * 0.5) {
        var items = '';
        var pending = '';
        for (var b = 0; b < nonEmpty.length; b++) {
          if (/^\d+\.\s/.test(nonEmpty[b])) {
            if (pending) items += '<li>' + pending + '</li>';
            pending = nonEmpty[b].replace(/^\d+\.\s/, '');
          } else {
            // Heading or text before list — flush as paragraph
            if (pending) items += '<li>' + pending + '</li>';
            pending = '';
            out.push('<p>' + nonEmpty[b] + '</p>');
          }
        }
        if (pending) items += '<li>' + pending + '</li>';
        if (items) out.push('<ol>' + items + '</ol>');
        continue;
      }

      // Bullet list?
      var ulCount = 0;
      for (var c = 0; c < nonEmpty.length; c++) {
        if (/^[-*]\s/.test(nonEmpty[c])) ulCount++;
      }

      if (ulCount > 1 && ulCount >= nonEmpty.length * 0.5) {
        var uitems = '';
        var upending = '';
        for (var d = 0; d < nonEmpty.length; d++) {
          if (/^[-*]\s/.test(nonEmpty[d])) {
            if (upending) uitems += '<li>' + upending + '</li>';
            upending = nonEmpty[d].replace(/^[-*]\s/, '');
          } else {
            if (upending) uitems += '<li>' + upending + '</li>';
            upending = '';
            out.push('<p>' + nonEmpty[d] + '</p>');
          }
        }
        if (upending) uitems += '<li>' + upending + '</li>';
        if (uitems) out.push('<ul>' + uitems + '</ul>');
        continue;
      }

      // Default: paragraph
      out.push('<p>' + nonEmpty.join('<br>') + '</p>');
    }

    return out.join('') || '<p>' + escapeHtml(text) + '</p>';
  }

  function addMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'ask-msg ask-msg--' + role;

    var label = document.createElement('span');
    label.className = 'ask-msg-label';
    label.textContent = role === 'user' ? 'You' : 'AI';
    div.appendChild(label);

    var body = document.createElement('div');
    body.className = 'ask-msg-body';
    if (text) {
      if (role === 'ai') {
        body.innerHTML = renderMarkdown(text);
      } else {
        body.textContent = text;
      }
    }
    div.appendChild(body);

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return body;
  }

  var history = [];

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var question = input.value.trim();
    if (!question) return;

    addMessage('user', question);
    input.value = '';
    submit.disabled = true;
    submit.textContent = '...';

    history.push({ role: 'user', content: question });

    var body = addMessage('ai', '');
    body.textContent = 'Thinking...';

    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-6) })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(function (data) {
        var answer = data.response || 'Sorry, I couldn\'t generate a response.';
        body.innerHTML = renderMarkdown(answer);
        history.push({ role: 'assistant', content: answer });
      })
      .catch(function () {
        body.textContent = 'Something went wrong. The AI worker might not be deployed yet.';
      })
      .finally(function () {
        submit.disabled = false;
        submit.textContent = 'Send';
        messages.scrollTop = messages.scrollHeight;
      });
  });
})();
