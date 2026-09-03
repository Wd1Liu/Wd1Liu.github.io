(() => {
  const root = document.documentElement;
  const year = document.getElementById('year');

  // One fixed monochrome visual system only.
  delete root.dataset.theme;
  localStorage.removeItem('bingyi-site-theme');
  localStorage.removeItem('edison-theme');
  document.querySelector('.theme-toggle')?.remove();
  if (year) year.textContent = new Date().getFullYear();

  // Lightweight monochrome icon system.
  if (!document.querySelector('link[data-bootstrap-icons]')) {
    const iconSheet = document.createElement('link');
    iconSheet.rel = 'stylesheet';
    iconSheet.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    iconSheet.dataset.bootstrapIcons = 'true';
    document.head.appendChild(iconSheet);
  }

  const style = document.createElement('style');
  style.textContent = `
    .inline-icon{font-size:.95em;margin-right:.36em;vertical-align:-.06em;color:var(--faint)}
    .news-list{border-top:1px solid var(--line-strong)}
    .news-row{display:grid;grid-template-columns:130px 22px 1fr;gap:14px;align-items:start;padding:14px 0;border-bottom:1px solid var(--line)}
    .news-date{color:var(--faint);font-size:.72rem;padding-top:2px}
    .news-icon{color:var(--muted);font-size:.85rem;padding-top:1px}
    .news-row p{margin:0;color:var(--muted);font-size:.86rem;line-height:1.48}
    .news-row strong{color:var(--text);font-weight:650}
    .review-badge{display:inline-flex;align-items:center;gap:.32rem;color:var(--muted);font-size:.7rem}
    .review-badge i{font-size:.78rem}
    .personal-wrap{margin-top:30px;padding-top:26px;border-top:1px solid var(--line)}
    .personal-wrap h3{margin:0 0 14px;font-size:.92rem;letter-spacing:-.01em}
    .personal-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0 30px;border-top:1px solid var(--line)}
    .personal-item{display:grid;grid-template-columns:25px 1fr;gap:10px;padding:14px 0;border-bottom:1px solid var(--line)}
    .personal-item:nth-child(odd){padding-right:10px}
    .personal-icon{font-size:1rem;color:var(--muted);padding-top:1px}
    .personal-item strong{display:block;font-size:.84rem;margin-bottom:2px}
    .personal-item p{margin:0!important;font-size:.82rem!important;line-height:1.48!important}
    .thinking-list{margin:16px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}
    .thinking-list li{display:grid;grid-template-columns:25px 1fr;gap:10px;padding:12px 0;border-bottom:1px solid var(--line);color:var(--muted);font-size:.84rem}
    .thinking-list strong{color:var(--text);font-weight:630}
    .cv-review-note{color:var(--faint);font-weight:500}
    @media(max-width:700px){.news-row{grid-template-columns:95px 20px 1fr}.personal-grid{grid-template-columns:1fr}.personal-item:nth-child(odd){padding-right:0}}
  `;
  document.head.appendChild(style);

  // Add icons to the compact profile links.
  const iconForLink = {
    'Email': 'bi-envelope',
    'CV': 'bi-file-earmark-person',
    'GitHub ↗': 'bi-github',
    'LinkedIn ↗': 'bi-linkedin'
  };
  document.querySelectorAll('.hero-links a').forEach((link) => {
    const label = link.textContent.trim();
    const icon = iconForLink[label];
    if (icon && !link.querySelector('i')) {
      link.insertAdjacentHTML('afterbegin', `<i class="bi ${icon} inline-icon"></i>`);
    }
  });

  // Replace the numeric capability strip with small semantic icons.
  const capabilityIcons = ['bi-eye', 'bi-clock-history', 'bi-diagram-3', 'bi-people'];
  document.querySelectorAll('.question-grid > div').forEach((item, i) => {
    const marker = item.querySelector('span');
    if (marker && capabilityIcons[i]) marker.innerHTML = `<i class="bi ${capabilityIcons[i]}"></i>`;
  });

  // Homepage News section: common on strong academic homepages, but kept compact.
  const researchSection = document.getElementById('research');
  if (researchSection && !document.getElementById('news')) {
    const news = document.createElement('section');
    news.className = 'section shell';
    news.id = 'news';
    news.innerHTML = `
      <div class="section-head compact-head"><div><p class="eyebrow"><i class="bi bi-newspaper inline-icon"></i>News</p><h2>Recent updates.</h2></div></div>
      <div class="news-list">
        <div class="news-row"><span class="news-date">Aug. 2026</span><i class="bi bi-eyeglasses news-icon"></i><p>Started research on <strong>long-horizon egocentric memory and reasoning for intelligent eyewear</strong>, supervised by <a href="https://jingkangyang.com/" target="_blank" rel="noopener">Dr. Jingkang Yang</a>.</p></div>
        <div class="news-row"><span class="news-date">2026</span><i class="bi bi-hourglass-split news-icon"></i><p>Two manuscripts on <strong>human-agent interaction in augmented reality</strong> are currently under review.</p></div>
        <div class="news-row"><span class="news-date">Summer 2026</span><i class="bi bi-headset news-icon"></i><p>Returned to <a href="https://eyedaptic.com/" target="_blank" rel="noopener">Eyedaptic</a> to work on voice-first AI assistance for AR glasses.</p></div>
        <div class="news-row"><span class="news-date">2026</span><i class="bi bi-award news-icon"></i><p>Received a <strong>Purdue Summer Undergraduate Research Fellowship (SURF)</strong> with $6,500 in research support.</p></div>
      </div>`;
    researchSection.parentNode.insertBefore(news, researchSection);

    const nav = document.querySelector('.nav');
    if (nav && !nav.querySelector('a[href="#news"]')) {
      const researchLink = nav.querySelector('a[href="#research"]');
      const newsLink = document.createElement('a');
      newsLink.href = '#news';
      newsLink.textContent = 'News';
      researchLink?.insertAdjacentElement('afterend', newsLink);
    }
  }

  // Public site: show review status without exposing exact paper title, venue, PDF, or project page.
  const reviewTitles = new Set([
    'Situated human-agent reasoning in AR',
    'In-situ authoring for embodied agents in AR'
  ]);
  document.querySelectorAll('.research-row').forEach((row) => {
    const title = row.querySelector('.research-body h3')?.textContent.trim();
    const meta = row.querySelector('.research-meta');
    if (title && reviewTitles.has(title) && meta && !meta.querySelector('.review-badge')) {
      const badge = document.createElement('span');
      badge.className = 'review-badge';
      badge.innerHTML = '<i class="bi bi-hourglass-split"></i>Manuscript under review';
      meta.appendChild(badge);
    }
  });

  // Public web CV: same conservative convention.
  document.querySelectorAll('.cv-entry .project').forEach((project) => {
    const clean = project.textContent.trim();
    if ([...reviewTitles].some((t) => clean.startsWith(t)) && !clean.includes('under review')) {
      project.insertAdjacentHTML('beforeend', ' <span class="cv-review-note">— Manuscript under review</span>');
    }
  });
  const cvNav = document.querySelector('.cv-shell') && document.querySelector('.nav');
  if (cvNav && !cvNav.querySelector('a[href="index.html#news"]')) {
    const researchLink = cvNav.querySelector('a[href="index.html#research"]');
    if (researchLink) {
      const newsLink = document.createElement('a');
      newsLink.href = 'index.html#news';
      newsLink.textContent = 'News';
      researchLink.insertAdjacentElement('afterend', newsLink);
    }
  }

  // Personal identity: specific enough to remember, but still subordinate to research.
  const about = document.querySelector('#about .about-copy');
  if (about) {
    about.innerHTML = `
      <p class="eyebrow"><i class="bi bi-person inline-icon"></i>About</p>
      <h2>I like problems that become clearer when you trace them back to how people actually think.</h2>
      <p>I am a Computer Science undergraduate at <a href="https://www.purdue.edu/" target="_blank" rel="noopener">Purdue University</a>. I work across models, systems, and interaction design because I am most interested in AI that has to fit into the physical world and into the mental models people already use to make sense of it.</p>
      <p>I am also drawn to entrepreneurship and creating new products. I often start from a simple question: <em>what does the person believe this system is doing?</em> That question tends to expose design problems earlier than adding another feature does.</p>

      <div class="personal-wrap">
        <h3>How I think</h3>
        <ul class="thinking-list">
          <li><i class="bi bi-compass personal-icon"></i><span><strong>First principles.</strong> I am drawn to Daoist thought and to tracing complicated systems back to a few underlying mechanisms before reasoning outward again.</span></li>
          <li><i class="bi bi-lightbulb personal-icon"></i><span><strong>Products & mental models.</strong> I like thinking about new products from the user's internal model first, then asking what technology should exist around it.</span></li>
          <li><i class="bi bi-code-slash personal-icon"></i><span><strong>AI-native building.</strong> I learned software engineering during the shift toward code agents, so working alongside tools such as Codex and Claude feels like part of the native development environment rather than an add-on.</span></li>
        </ul>
      </div>

      <div class="personal-wrap">
        <h3>Outside research</h3>
        <div class="personal-grid">
          <div class="personal-item"><i class="bi bi-music-note-beamed personal-icon"></i><div><strong>Music</strong><p>Usually somewhere in the background when I am building or thinking.</p></div></div>
          <div class="personal-item"><i class="bi bi-trophy personal-icon"></i><div><strong>Football</strong><p>I support Bayern Munich and enjoy the game well beyond the scoreboard.</p></div></div>
          <div class="personal-item"><i class="bi bi-airplane personal-icon"></i><div><strong>Travel</strong><p>I like unfamiliar places and noticing how people, products, and spaces work differently across cultures.</p></div></div>
          <div class="personal-item"><i class="bi bi-water personal-icon"></i><div><strong>Lakeside time</strong><p>I also genuinely enjoy sitting alone by a lake and doing nothing for a while.</p></div></div>
        </div>
      </div>`;
  }
})();
