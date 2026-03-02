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
    var html = escapeHtml(text);

    // Code blocks (```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return '<pre><code>' + code.trim() + '</code></pre>';
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Split into blocks for lists and paragraphs
    var blocks = html.split(/\n\n+/);
    var out = [];
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i].trim();
      if (!block) continue;

      // Check if block is a list
      var lines = block.split('\n');
      var isList = true;
      for (var j = 0; j < lines.length; j++) {
        if (lines[j].trim() && !/^[-*]\s/.test(lines[j].trim())) {
          isList = false;
          break;
        }
      }

      if (isList && lines.length > 0) {
        var items = '';
        for (var k = 0; k < lines.length; k++) {
          var li = lines[k].trim().replace(/^[-*]\s/, '');
          if (li) items += '<li>' + li + '</li>';
        }
        out.push('<ul>' + items + '</ul>');
      } else if (/^<pre>/.test(block)) {
        out.push(block);
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
