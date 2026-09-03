(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Keep the lightweight web CV as the canonical CV link for now.
  document.querySelectorAll('a[href="assets/Bingyi_Liu_CV.pdf"]').forEach((link) => {
    link.setAttribute('href', 'cv.html');
  });

  // Make labs, institutions, companies, and research advisors directly discoverable.
  // Longer labels come first so a full lab/school name wins over a shorter substring.
  const entityLinks = [
    ['Purdue University · Elmore Family School of ECE', 'https://engineering.purdue.edu/ECE/'],
    ['Purdue University · C Design Lab', 'https://engineering.purdue.edu/cdesign/wp/'],
    ['Purdue Summer Undergraduate Research Fellowship', 'https://engineering.purdue.edu/Engr/Research/EURO/students/about-SURF'],
    ['Elmore Family School of ECE', 'https://engineering.purdue.edu/ECE/'],
    ['Purdue C Design Lab', 'https://engineering.purdue.edu/cdesign/wp/'],
    ['Purdue VIPER Lab', 'https://engineering.purdue.edu/~ips/'],
    ['Prof. Karthik Ramani', 'https://engineering.purdue.edu/~ramani/wordpress/about/'],
    ['Prof. Yung-Hsiang Lu', 'https://engineering.purdue.edu/ECE/People/Faculty/ptProfile?group_id=2571&resource_id=3355'],
    ['Dr. Jingkang Yang', 'https://jingkangyang.com/'],
    ['Karthik Ramani', 'https://engineering.purdue.edu/~ramani/wordpress/about/'],
    ['Yung-Hsiang Lu', 'https://engineering.purdue.edu/ECE/People/Faculty/ptProfile?group_id=2571&resource_id=3355'],
    ['Jingkang Yang', 'https://jingkangyang.com/'],
    ['Tongcheng Travel', 'https://www.tongchengir.com/en/'],
    ['C Design Lab', 'https://engineering.purdue.edu/cdesign/wp/'],
    ['VIPER Lab', 'https://engineering.purdue.edu/~ips/'],
    ['Purdue ECE', 'https://engineering.purdue.edu/ECE/'],
    ['Purdue CS', 'https://www.cs.purdue.edu/'],
    ['Eyedaptic', 'https://eyedaptic.com/'],
    ['Purdue University', 'https://www.purdue.edu/']
  ];

  const linkStyle = document.createElement('style');
  linkStyle.textContent = `
    .entity-link {
      text-decoration-line: underline;
      text-decoration-thickness: .075em;
      text-decoration-color: color-mix(in srgb, var(--accent) 34%, transparent);
      text-underline-offset: .18em;
      transition: color .16s ease, text-decoration-color .16s ease;
    }
    .entity-link:hover,
    .entity-link:focus-visible {
      color: var(--accent);
      text-decoration-color: currentColor;
    }
    .entity-link::after {
      content: '↗';
      display: inline-block;
      margin-left: .2em;
      font-size: .66em;
      line-height: 1;
      vertical-align: .26em;
      opacity: .56;
      text-decoration: none;
    }
    @media print { .entity-link::after { display: none; } }
  `;
  document.head.appendChild(linkStyle);

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const labels = entityLinks.map(([label]) => label).sort((a, b) => b.length - a.length);
  const urlByLabel = new Map(entityLinks);
  const entityPattern = new RegExp(`(${labels.map(escapeRegExp).join('|')})`, 'g');

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !entityPattern.test(node.nodeValue)) {
        entityPattern.lastIndex = 0;
        return NodeFilter.FILTER_REJECT;
      }
      entityPattern.lastIndex = 0;
      const parent = node.parentElement;
      if (!parent || parent.closest('a, script, style, textarea, code, pre, button')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const text = node.nodeValue;
    entityPattern.lastIndex = 0;
    let match;
    let cursor = 0;
    const fragment = document.createDocumentFragment();

    while ((match = entityPattern.exec(text)) !== null) {
      if (match.index > cursor) fragment.append(text.slice(cursor, match.index));
      const label = match[0];
      const anchor = document.createElement('a');
      anchor.href = urlByLabel.get(label);
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.className = 'entity-link';
      anchor.textContent = label;
      anchor.setAttribute('aria-label', `${label} (opens official page in a new tab)`);
      fragment.append(anchor);
      cursor = match.index + label.length;
    }

    if (cursor < text.length) fragment.append(text.slice(cursor));
    node.replaceWith(fragment);
  });

  const saved = localStorage.getItem('edison-theme');
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('edison-theme', next);
    });
  }
})();
