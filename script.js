(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // The page stays mostly black / white / gray; real brand marks keep their colors.
  const style = document.createElement('style');
  style.textContent = `
    .brand-mark,
    .news-brand,
    .tool-logos img,
    .personal-grid .club-mark {
      filter: none !important;
      opacity: 1 !important;
    }
    .profile-brand-icon {
      width: 15px;
      height: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
      font-size: 15px;
      line-height: 1;
      flex: 0 0 15px;
    }
    .profile-brand-icon.linkedin { color: #0A66C2; }
    .profile-brand-icon.github { color: #181717; }
    .profile-photo {
      display: block;
      width: 160px;
      height: 225px;
      object-fit: cover;
      margin: 0 0 20px;
      border: 1px solid var(--line);
      background: var(--surface-2);
    }
    @media (max-width: 900px) {
      .profile-photo { width: 145px; height: auto; }
    }
  `;
  document.head.appendChild(style);

  const replaceProfileLogo = (selector, iconClass, extraClass) => {
    const link = document.querySelector(selector);
    if (!link) return;
    const oldImg = link.querySelector('img');
    if (oldImg) {
      const icon = document.createElement('i');
      icon.className = `bi ${iconClass} profile-brand-icon ${extraClass}`;
      icon.setAttribute('aria-hidden', 'true');
      oldImg.replaceWith(icon);
    }
  };

  replaceProfileLogo('.profile-links a[href*="github.com"]', 'bi-github', 'github');
  replaceProfileLogo('.profile-links a[href*="linkedin.com"]', 'bi-linkedin', 'linkedin');

  const brandSources = {
    Python: 'https://cdn.simpleicons.org/python/3776AB',
    PyTorch: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
    Unity: 'https://cdn.simpleicons.org/unity/000000',
    Android: 'https://cdn.simpleicons.org/android/3DDC84',
    NVIDIA: 'https://cdn.simpleicons.org/nvidia/76B900'
  };

  document.querySelectorAll('.tool-logos img').forEach((img) => {
    const src = brandSources[img.alt];
    if (src) img.src = src;
  });

  const nowPanel = document.querySelector('.now-panel');
  if (nowPanel && !nowPanel.querySelector('.profile-photo')) {
    const photo = document.createElement('img');
    photo.className = 'profile-photo';
    photo.src = 'assets/profile-photo.svg';
    photo.alt = 'Bingyi Liu (Edison)';
    nowPanel.insertBefore(photo, nowPanel.firstChild);
  }

  document.querySelectorAll('.personal-grid > div').forEach((item) => {
    const label = item.querySelector('strong')?.textContent.trim();
    if (label === 'Travel.') {
      const p = item.querySelector('p');
      if (p) p.innerHTML = '<strong>Travel.</strong> I love traveling. Credit-card points and perks deserve some of the credit.';
    }
  });

  // Homepage: make the through-line first-person understanding rather than
  // repeating visual grounding as a research identity.
  const intro = document.querySelector('.intro-copy');
  if (intro) {
    intro.textContent = "I'm a CS undergraduate at Purdue. I'm interested in how AI understands the world from a person's point of view—from 3D spatial context in AR to continuous egocentric video—and how that understanding can support people in the moment.";
  }

  const perceive = [...document.querySelectorAll('.lens-grid > div')]
    .find((el) => el.querySelector('strong')?.textContent.trim() === 'Perceive');
  if (perceive) {
    const p = perceive.querySelector('p');
    if (p) p.textContent = 'Understand what a person is seeing, from 3D spatial context to continuous first-person video.';
  }

  const researchRows = [...document.querySelectorAll('.research-row')];
  researchRows.forEach((row) => {
    const title = row.querySelector('h3')?.textContent.trim();

    if (title === 'Situated human–AI reasoning in AR') {
      const bodyParagraphs = row.querySelectorAll('.research-body > p');
      if (bodyParagraphs[1]) {
        bodyParagraphs[1].textContent = "I built a Quest-based prototype that combines the wearer's first-person view with spatial pose/depth information to maintain an explicit task state of observations, interpretations, and user corrections. The goal is not just to detect objects, but to keep the agent's understanding of the surrounding scene visible and revisable as the task changes.";
      }
      const role = row.querySelector('.role-line');
      if (role) role.innerHTML = '<strong>My role:</strong> research framing, state representation, system architecture, first-person scene understanding, interaction design, Unity/Quest implementation, and study instrumentation.';
    }

    if (title === 'Contact-aware 3D piano hand motion generation' ||
        title === 'Hardware-aware evaluation of text-to-image models') {
      const metaSpans = row.querySelectorAll('.research-meta > span');
      if (metaSpans[1]) metaSpans[1].textContent = '2025 — May 2026';
    }
  });

  const prototype = document.querySelector('.prototype-note');
  if (prototype) {
    prototype.innerHTML = '<i class="bi bi-tools"></i><strong>Prototype work.</strong> I also build small smart-glasses agents to test ideas around first-person scene understanding, cross-frame memory, and tool use before deciding which ideas are worth pushing further.';
  }

  document.querySelectorAll('.experience-item').forEach((item) => {
    const heading = item.querySelector('h3')?.textContent || '';
    if (heading.includes('C Design Lab')) {
      const desc = item.querySelector('div:last-child > p:last-child');
      if (desc) desc.textContent = 'AR, human–AI interaction, first-person scene understanding, and agent authoring.';
    }
    if (heading.includes('Elmore Family School of ECE')) {
      const when = item.querySelector('.experience-when');
      if (when) when.textContent = 'Feb. 2025 — May 2026';
    }
  });

  // Web CV: keep the same date and reduce repeated visual-grounding wording.
  document.querySelectorAll('.cv-entry').forEach((entry) => {
    const heading = entry.querySelector('h3')?.textContent || '';

    if (heading.includes('Elmore Family School of ECE')) {
      const date = entry.querySelector('.date');
      if (date) date.textContent = 'Feb. 2025 — May 2026';
    }

    if (heading.includes('C Design Lab')) {
      const items = entry.querySelectorAll('li');
      items.forEach((li) => {
        if (li.textContent.includes('spatially grounded co-reasoning prototype')) {
          li.textContent = 'Developed a co-reasoning prototype that maintains an explicit, revisable understanding of the wearer\'s surrounding task environment across first-person visual input and spatial context.';
        }
        if (li.textContent.includes('egocentric VLM semantics')) {
          li.textContent = 'Combined first-person visual semantics with Quest pose/depth geometry and persistent scene references so the agent can reason over what the wearer is seeing as the task evolves.';
        }
        if (li.textContent.includes('perception-grounding pipeline')) {
          li.textContent = 'Owned research framing, reasoning/state representation, system architecture, first-person scene understanding, interaction design, Unity/Quest implementation, and study instrumentation.';
        }
      });
    }
  });

  document.querySelectorAll('.cv-tags span').forEach((tag) => {
    if (tag.textContent.trim() === 'Visual Grounding') tag.textContent = 'Egocentric Video';
  });
})();
