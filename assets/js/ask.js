(function () {
  var WORKER_URL = 'https://violaris-ask.george-viol.workers.dev';

  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var messages = document.getElementById('ask-messages');
  var submit = document.getElementById('ask-submit');

  function addMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'ask-msg ask-msg--' + role;

    var label = document.createElement('span');
    label.className = 'ask-msg-label';
    label.textContent = role === 'user' ? 'You' : 'AI';
    div.appendChild(label);

    var body = document.createElement('div');
    body.className = 'ask-msg-body';
    body.textContent = text;
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
        body.textContent = answer;
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
