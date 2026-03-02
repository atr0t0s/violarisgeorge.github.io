(function () {
  var WORKER_URL = 'https://violaris-ask.violarisgeorge.workers.dev';

  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var messages = document.getElementById('ask-messages');
  var submit = document.getElementById('ask-submit');

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderMarkdown(text) {
    // Normalize: insert newlines before bold headings like **Title:**
    var normalized = text.replace(/\s*\*\*([^*]+?(?::\*\*|\*\*:))/g, '\n\n**$1');

    // Normalize: split inline numbered lists (` 1. item 2. item`) onto separate lines
    normalized = normalized.replace(/\s+(\d+)\.\s/g, '\n$1. ');

    // Normalize: split inline bullet lists (` - item - item`)
    normalized = normalized.replace(/\s+([-*])\s(?=[A-Z0-9])/g, '\n$1 ');

    var html = escapeHtml(normalized);

    // Code blocks (```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return '<pre><code>' + code.trim() + '</code></pre>';
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic (but not inside words)
    html = html.replace(/(?<!\w)\*(.+?)\*(?!\w)/g, '<em>$1</em>');

    // Split into blocks
    var blocks = html.split(/\n\n+/);
    var out = [];
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i].trim();
      if (!block) continue;

      if (/^<pre>/.test(block)) {
        out.push(block);
        continue;
      }

      var lines = block.split('\n');

      // Check if block is a numbered list
      var isOl = lines.length > 1 && lines.every(function (l) {
        return !l.trim() || /^\d+\.\s/.test(l.trim());
      });

      // Check if block is a bullet list
      var isUl = lines.length > 1 && lines.every(function (l) {
        return !l.trim() || /^[-*]\s/.test(l.trim());
      });

      if (isOl) {
        var items = '';
        for (var k = 0; k < lines.length; k++) {
          var li = lines[k].trim().replace(/^\d+\.\s/, '');
          if (li) items += '<li>' + li + '</li>';
        }
        out.push('<ol>' + items + '</ol>');
      } else if (isUl) {
        var items2 = '';
        for (var k2 = 0; k2 < lines.length; k2++) {
          var li2 = lines[k2].trim().replace(/^[-*]\s/, '');
          if (li2) items2 += '<li>' + li2 + '</li>';
        }
        out.push('<ul>' + items2 + '</ul>');
      } else {
        out.push('<p>' + block.replace(/\n/g, '<br>') + '</p>');
      }
    }

    return out.join('');
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
