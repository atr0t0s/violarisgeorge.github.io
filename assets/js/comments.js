(function () {
  var section = document.getElementById('comments-section');
  if (!section) return;

  var API = 'https://violaris-comments.violarisgeorge.workers.dev';
  var pageSlug = section.getAttribute('data-page');
  var currentUser = null;

  // --- Identicon generator ---
  function identicon(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    hash = Math.abs(hash);

    var size = 5;
    var scale = 8;
    var padding = 4;
    var totalSize = size * scale + padding * 2;
    var hue = hash % 360;
    var fg = 'hsl(' + hue + ', 65%, 55%)';
    var bg = 'hsl(' + hue + ', 20%, 15%)';

    var rects = '';
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < Math.ceil(size / 2); x++) {
        var bit = (hash >> ((y * 3 + x) % 30)) & 1;
        if (bit) {
          var px = padding + x * scale;
          var py = padding + y * scale;
          rects += '<rect x="' + px + '" y="' + py + '" width="' + scale + '" height="' + scale + '" fill="' + fg + '"/>';
          var mx = padding + (size - 1 - x) * scale;
          rects += '<rect x="' + mx + '" y="' + py + '" width="' + scale + '" height="' + scale + '" fill="' + fg + '"/>';
        }
      }
    }

    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalSize + '" height="' + totalSize + '">' +
      '<rect width="' + totalSize + '" height="' + totalSize + '" fill="' + bg + '" rx="4"/>' +
      rects + '</svg>'
    );
  }

  // --- Minimal markdown renderer ---
  function renderMarkdown(text) {
    var s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
    s = s.replace(/`(.+?)`/g, '<code>$1</code>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" rel="noopener" target="_blank">$1</a>');
    s = s.replace(/\n/g, '<br>');
    return s;
  }

  // --- Relative time ---
  function timeAgo(dateStr) {
    var seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    var days = Math.floor(hours / 24);
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    var months = Math.floor(days / 30);
    if (months < 12) return months + (months === 1 ? ' month ago' : ' months ago');
    var years = Math.floor(months / 12);
    return years + (years === 1 ? ' year ago' : ' years ago');
  }

  // --- Render ---
  function renderComment(c) {
    var avatar = c.author_avatar || identicon(c.author_name);
    var providerBadge = c.auth_provider === 'github' ? ' <span class="comment-badge">GitHub</span>' : '';
    return '<div class="comment" data-id="' + c.id + '">' +
      '<div class="comment-header">' +
        '<img class="comment-avatar" src="' + avatar + '" alt="" width="32" height="32">' +
        '<div class="comment-meta">' +
          '<span class="comment-author">' + c.author_name + providerBadge + '</span>' +
          '<time class="comment-time">' + timeAgo(c.created_at) + '</time>' +
        '</div>' +
      '</div>' +
      '<div class="comment-body">' + renderMarkdown(c.body) + '</div>' +
    '</div>';
  }

  function renderComments(comments) {
    var list = section.querySelector('.comments-list');
    if (!list) return;
    if (comments.length === 0) {
      list.innerHTML = '<p class="comments-empty">No comments yet. Be the first to share your thoughts.</p>';
    } else {
      list.innerHTML = comments.map(renderComment).join('');
    }
    var count = section.querySelector('.comments-count');
    if (count) count.textContent = comments.length + (comments.length === 1 ? ' comment' : ' comments');
  }

  function renderAuthForm() {
    var auth = section.querySelector('.comments-auth');
    if (!auth) return;

    if (currentUser && currentUser.authenticated) {
      var avatar = currentUser.avatar || identicon(currentUser.name);
      auth.innerHTML =
        '<div class="comment-compose">' +
          '<div class="comment-compose-header">' +
            '<img class="comment-avatar" src="' + avatar + '" alt="" width="32" height="32">' +
            '<span class="comment-author">' + currentUser.name + '</span>' +
            '<button class="comment-logout" type="button">Sign out</button>' +
          '</div>' +
          '<textarea class="comment-input" placeholder="Write a comment... (Markdown supported: **bold**, *italic*, `code`, [links](url))" maxlength="2000" rows="3"></textarea>' +
          '<div class="comment-actions">' +
            '<span class="comment-char-count"></span>' +
            '<button class="comment-submit" type="button">Post comment</button>' +
          '</div>' +
        '</div>';

      var textarea = auth.querySelector('.comment-input');
      var charCount = auth.querySelector('.comment-char-count');
      textarea.addEventListener('input', function () {
        var len = textarea.value.length;
        charCount.textContent = len > 0 ? len + '/2000' : '';
      });

      auth.querySelector('.comment-submit').addEventListener('click', function () {
        submitComment(textarea.value);
      });

      auth.querySelector('.comment-logout').addEventListener('click', function () {
        fetch(API + '/auth/logout', { method: 'POST', credentials: 'include' }).then(function () {
          currentUser = null;
          renderAuthForm();
        });
      });
    } else {
      auth.innerHTML =
        '<div class="comment-sign-in">' +
          '<p>Sign in to comment</p>' +
          '<div class="comment-sign-in-options">' +
            '<a class="comment-btn comment-btn-github" href="' + API + '/auth/github?page=' + pageSlug + '">Sign in with GitHub</a>' +
            '<button class="comment-btn comment-btn-email" type="button">Sign in with email</button>' +
          '</div>' +
          '<div class="comment-email-form" style="display:none">' +
            '<input type="text" class="comment-input-field" placeholder="Your name" maxlength="100">' +
            '<input type="email" class="comment-input-field" placeholder="Your email" maxlength="254">' +
            '<button class="comment-btn comment-btn-send" type="button">Send magic link</button>' +
            '<p class="comment-email-status"></p>' +
          '</div>' +
        '</div>';

      auth.querySelector('.comment-btn-email').addEventListener('click', function () {
        var form = auth.querySelector('.comment-email-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });

      auth.querySelector('.comment-btn-send').addEventListener('click', function () {
        var name = auth.querySelector('input[type="text"]').value.trim();
        var email = auth.querySelector('input[type="email"]').value.trim();
        var status = auth.querySelector('.comment-email-status');

        if (!name || !email) {
          status.textContent = 'Please enter your name and email.';
          return;
        }

        status.textContent = 'Sending...';
        fetch(API + '/auth/email', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, page: pageSlug }),
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          status.textContent = data.ok ? 'Check your email for a sign-in link!' : (data.error || 'Something went wrong.');
        })
        .catch(function () {
          status.textContent = 'Something went wrong. Try again.';
        });
      });
    }
  }

  function submitComment(text) {
    if (!text || !text.trim()) return;

    var btn = section.querySelector('.comment-submit');
    btn.disabled = true;
    btn.textContent = 'Posting...';

    fetch(API + '/comments', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pageSlug, body: text.trim() }),
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.error) {
        alert(data.error);
      } else {
        var list = section.querySelector('.comments-list');
        var empty = list.querySelector('.comments-empty');
        if (empty) empty.remove();
        list.insertAdjacentHTML('beforeend', renderComment(data));
        section.querySelector('.comment-input').value = '';
        section.querySelector('.comment-char-count').textContent = '';
        var count = section.querySelector('.comments-count');
        var n = list.querySelectorAll('.comment').length;
        if (count) count.textContent = n + (n === 1 ? ' comment' : ' comments');
      }
      btn.disabled = false;
      btn.textContent = 'Post comment';
    })
    .catch(function () {
      alert('Failed to post comment. Please try again.');
      btn.disabled = false;
      btn.textContent = 'Post comment';
    });
  }

  // --- Init ---
  section.innerHTML =
    '<div class="comments-container">' +
      '<h2 class="comments-heading">Comments <span class="comments-count"></span></h2>' +
      '<div class="comments-list"></div>' +
      '<div class="comments-auth"></div>' +
    '</div>';

  fetch(API + '/auth/me', { credentials: 'include' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      currentUser = data;
      renderAuthForm();
    })
    .catch(function () {
      renderAuthForm();
    });

  fetch(API + '/comments?page=' + pageSlug)
    .then(function (r) { return r.json(); })
    .then(function (comments) {
      renderComments(comments);
    })
    .catch(function () {
      var list = section.querySelector('.comments-list');
      if (list) list.innerHTML = '<p class="comments-empty">Failed to load comments.</p>';
    });
})();
