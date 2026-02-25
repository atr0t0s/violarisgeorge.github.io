(function () {
  'use strict';

  // --- Resources from the reading list ---
  var resources = [
    { text: 'Attention Is All You Need — Vaswani et al., 2017. The Transformer paper. Everything since builds on this.', url: 'https://arxiv.org/abs/1706.03762', tag: 'AI' },
    { text: 'Language Models are Few-Shot Learners — Brown et al., 2020. The GPT-3 paper. Scale alone gets you surprisingly far.', url: 'https://arxiv.org/abs/2005.14165', tag: 'AI' },
    { text: 'Constitutional AI: Harmlessness from AI Feedback — Bai et al., 2022. Anthropic\'s alignment approach using a written constitution.', url: 'https://arxiv.org/abs/2212.08073', tag: 'AI' },
    { text: 'Chain-of-Thought Prompting Elicits Reasoning — Wei et al., 2022. Asking models to show their work actually helps.', url: 'https://arxiv.org/abs/2201.11903', tag: 'AI' },
    { text: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Lewis et al., 2020. The original RAG paper.', url: 'https://arxiv.org/abs/2005.11401', tag: 'AI' },
    { text: 'Scaling Laws for Neural Language Models — Kaplan et al., 2020. Loss scales predictably with model size, data, and compute.', url: 'https://arxiv.org/abs/2001.08361', tag: 'AI' },
    { text: 'Training Compute-Optimal Large Language Models — Hoffmann et al., 2022. The Chinchilla paper. Most models were undertrained.', url: 'https://arxiv.org/abs/2203.15556', tag: 'AI' },
    { text: 'RLHF — Ouyang et al., 2022. A 1.3B InstructGPT beat the 175B GPT-3 on human preference.', url: 'https://arxiv.org/abs/2203.02155', tag: 'AI' },
    { text: 'Simon Willison\'s blog — Covers practical LLM usage with more depth and honesty than anyone else writing regularly.', url: 'https://simonwillison.net', tag: 'Blog' },
    { text: 'Lilian Weng\'s blog — Long-form technical posts on architectures, agents, and RLHF.', url: 'https://lilianweng.github.io', tag: 'Blog' },
    { text: 'Andrej Karpathy\'s Zero to Hero — Builds neural networks from scratch and ends with a GPT. Nobody explains it better.', url: 'https://karpathy.ai/zero-to-hero.html', tag: 'Course' },
    { text: 'Model Context Protocol (MCP) — Anthropic\'s open standard for connecting LLMs to external tools and data.', url: 'https://modelcontextprotocol.io', tag: 'AI' },
    { text: 'Bitcoin Whitepaper — Satoshi Nakamoto\'s 9 pages. Still the clearest explanation of how and why.', url: 'https://bitcoin.org/bitcoin.pdf', tag: 'Crypto' },
    { text: 'New Directions in Cryptography — Diffie and Hellman, 1976. The paper that started public-key cryptography.', url: 'https://www-ee.stanford.edu/~hellman/publications/24.pdf', tag: 'Crypto' },
    { text: 'The Illustrated TLS 1.3 — Interactive byte-level walkthrough of a TLS 1.3 handshake.', url: 'https://tls13.xargs.org/', tag: 'Security' },
    { text: 'PortSwigger Web Security Academy — Free, hands-on web security training with interactive labs.', url: 'https://portswigger.net/web-security', tag: 'Security' },
    { text: 'Cryptography I — Dan Boneh, Stanford. The best intro to cryptography available. Free to audit.', url: 'https://www.coursera.org/learn/crypto', tag: 'Course' },
    { text: 'Cypherpunk Manifesto — Eric Hughes, 1993.', url: 'https://www.activism.net/cypherpunk/manifesto.html', tag: 'History' },
    { text: 'BERT — Devlin et al., 2018. Bidirectional pre-training; set the template for fine-tuning that lasted years.', url: 'https://arxiv.org/abs/1810.04805', tag: 'AI' },
    { text: 'Chip Huyen\'s blog — ML systems design, AI engineering, MLOps. Author of "AI Engineering" (O\'Reilly, 2025).', url: 'https://huyenchip.com/blog', tag: 'Blog' },
    { text: 'FinRL — Deep RL framework for stock trading. Supports PPO, DDPG, SAC, and others.', url: 'https://github.com/AI4Finance-Foundation/FinRL', tag: 'Finance' },
    { text: 'Mastering Bitcoin — Antonopoulos. Free under Creative Commons. The technical deep-dive.', url: 'https://github.com/bitcoinbook/bitcoinbook', tag: 'Crypto' },
    { text: 'DeFi Specialization — Duke University. Campbell Harvey\'s four-course Coursera series. The most rigorous DeFi education available.', url: 'https://www.coursera.org/specializations/decentralized-finance-duke', tag: 'Course' },
    { text: 'Schneier on Security — Bruce Schneier on security, privacy, and policy. Been publishing for decades.', url: 'https://www.schneier.com/', tag: 'Security' },
    { text: 'Anthropic Research — Papers, model cards, and the Responsible Scaling Policy.', url: 'https://www.anthropic.com/research', tag: 'AI' }
  ];

  // --- Wisdom quotes ---
  var fortunes = [
    { quote: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
    { quote: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
    { quote: 'Simplicity is prerequisite for reliability.', author: 'Edsger Dijkstra' },
    { quote: 'The most dangerous phrase in the language is "we\'ve always done it this way."', author: 'Grace Hopper' },
    { quote: 'A year spent in artificial intelligence is enough to make one believe in God.', author: 'Alan Perlis' },
    { quote: 'The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.', author: 'Edsger Dijkstra' },
    { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
    { quote: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
    { quote: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
    { quote: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' },
    { quote: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
    { quote: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
    { quote: 'Debugging is twice as hard as writing the code in the first place.', author: 'Brian Kernighan' },
    { quote: 'People worry that computers will get too smart and take over the world, but the real problem is that they\'re too stupid and they\'ve already taken over the world.', author: 'Pedro Domingos' },
    { quote: 'Before software can be reusable it first has to be usable.', author: 'Ralph Johnson' },
    { quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.', author: 'Alan Turing' },
    { quote: 'A computer once beat me at chess, but it was no match for me at kickboxing.', author: 'Emo Philips' },
    { quote: 'The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.', author: 'Edsger Dijkstra' },
    { quote: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', author: 'Bill Gates' },
    { quote: 'The most important property of a program is whether it accomplishes the intention of its user.', author: 'C.A.R. Hoare' },
    { quote: 'In theory, theory and practice are the same. In practice, they\'re not.', author: 'Yogi Berra' },
    { quote: 'The function of good software is to make the complex appear to be simple.', author: 'Grady Booch' },
    { quote: 'It is not enough for code to work.', author: 'Robert C. Martin' },
    { quote: 'One of the best programming skills you can have is knowing when to walk away for a while.', author: 'Oscar Godson' },
    { quote: 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', author: 'Sydney Harris' },
    { quote: 'Software is like entropy: it is difficult to grasp, weighs nothing, and obeys the second law of thermodynamics; i.e., it always increases.', author: 'Norman Augustine' },
    { quote: 'On two occasions I have been asked, "If you put into the machine wrong figures, will the right answers come out?" I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.', author: 'Charles Babbage' },
    { quote: 'The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.', author: 'Eliezer Yudkowsky' },
    { quote: 'Intelligence is the ability to avoid doing work, yet getting the work done.', author: 'Linus Torvalds' },
    { quote: 'Inside every large program is a small program struggling to get out.', author: 'C.A.R. Hoare' }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Set theme on pinned tweet embed and load widget
  var tweetBq = document.querySelector('#glance-tweet-embed .twitter-tweet');
  if (tweetBq) {
    tweetBq.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') || 'dark');
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.getElementById('glance-tweet-embed').appendChild(s);
  }

  // Wait for tweet to render, then measure and build the other two cards
  function waitForTweet(callback) {
    var tweetCard = document.getElementById('glance-tweet');
    if (!tweetCard) { callback(600); return; }
    var attempts = 0;
    var check = setInterval(function () {
      attempts++;
      var iframe = tweetCard.querySelector('iframe');
      if (iframe && iframe.offsetHeight > 100) {
        clearInterval(check);
        // Small delay to let the iframe fully settle
        setTimeout(function () { callback(tweetCard.offsetHeight); }, 200);
      } else if (attempts > 50) {
        // Fallback after 10s — use whatever height we have
        clearInterval(check);
        callback(Math.max(tweetCard.offsetHeight, 600));
      }
    }, 200);
  }

  waitForTweet(function (tweetHeight) {
    var grid = document.querySelector('.glance-grid');
    if (grid) {
      grid.style.gridTemplateRows = tweetHeight + 'px';
    }

    // Now populate resources
    var resourceBody = document.getElementById('glance-resource-body');
    if (resourceBody) {
      var picked = shuffle(resources).slice(0, 15);
      for (var i = 0; i < picked.length; i++) {
        var r = picked[i];
        var item = document.createElement('div');
        item.className = 'glance-resource-item';
        var tag = document.createElement('span');
        tag.className = 'glance-resource-tag';
        tag.textContent = r.tag;
        var link = document.createElement('a');
        link.href = r.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = r.text;
        link.className = 'glance-resource-link';
        item.appendChild(tag);
        item.appendChild(link);
        resourceBody.appendChild(item);
      }
    }

    // Now populate wisdom
    var wisdomBody = document.getElementById('glance-wisdom-body');
    if (wisdomBody) {
      var pickedW = shuffle(fortunes).slice(0, 15);
      for (var i = 0; i < pickedW.length; i++) {
        var f = pickedW[i];
        var item = document.createElement('div');
        item.className = 'glance-wisdom-item';
        var q = document.createElement('blockquote');
        q.className = 'glance-quote';
        q.textContent = f.quote;
        var c = document.createElement('cite');
        c.className = 'glance-cite';
        c.textContent = '\u2014 ' + f.author;
        item.appendChild(q);
        item.appendChild(c);
        wisdomBody.appendChild(item);
      }
    }
  });
})();
