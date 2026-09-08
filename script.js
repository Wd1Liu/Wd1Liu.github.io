(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

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
    .direction-note {
      margin-top: 22px;
      padding: 14px 16px;
      border-left: 2px solid var(--text);
      background: var(--surface-2);
      color: var(--muted);
      font-size: .81rem;
      line-height: 1.55;
    }
    .direction-note strong { color: var(--text); }
    .side-project-title { font-weight: 680; color: var(--text); }
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

  // Homepage through-line: first-person intelligence + agents in the physical world.
  const intro = document.querySelector('.intro-copy');
  if (intro) {
    intro.textContent = "I'm a CS undergraduate at Purdue. I work on AI agents that understand the world from a person's point of view—from 3D spatial context in AR to continuous egocentric video—and use that context to reason, remember, and act with people in the loop.";
  }

  const lensCopy = {
    Perceive: 'Build a usable model of what the wearer sees, from 3D geometry and object state to continuous first-person video.',
    Remember: 'Carry forward the events, entities, and state changes that matter as a task or experience unfolds.',
    Reason: 'Turn first-person context into decisions, tool use, and next actions rather than one-shot answers.',
    Collaborate: 'Keep people in control through lightweight input, correction, and shared task state.'
  };
  [...document.querySelectorAll('.lens-grid > div')].forEach((el) => {
    const label = el.querySelector('strong')?.textContent.trim();
    const p = el.querySelector('p');
    if (label && p && lensCopy[label]) p.textContent = lensCopy[label];
  });

  const researchRows = [...document.querySelectorAll('.research-row')];
  researchRows.forEach((row) => {
    const h3 = row.querySelector('h3');
    const title = h3?.textContent.trim();
    const question = row.querySelector('.research-question');
    const bodyParagraphs = row.querySelectorAll('.research-body > p');
    const role = row.querySelector('.role-line');
    const metaSpans = row.querySelectorAll('.research-meta > span');

    if (title === 'Situated human–AI reasoning in AR') {
      if (question) question.textContent = 'How can an AR agent reason over the same physical task as the wearer without hiding the state it is using?';
      if (bodyParagraphs[1]) {
        bodyParagraphs[1].textContent = "I built a stateful, tool-using reasoning agent that combines first-person scene context with persistent spatial state. It can choose when to observe, query spatial information, or ask the wearer, while separating generative reasoning from deterministic execution so corrections revise only the reasoning branches that depend on them.";
      }
      if (role) role.innerHTML = '<strong>My role:</strong> research framing, agent architecture, state/memory design, first-person 2D/3D scene understanding, human-in-the-loop interaction, Unity/Quest implementation, and study instrumentation.';
    }

    if (title === 'In-situ authoring for embodied agents in AR') {
      if (question) question.textContent = 'How can people author spatial agent behavior without translating what they mean in the room into low-level scripts?';
      if (bodyParagraphs[1]) {
        bodyParagraphs[1].textContent = 'I introduced an experience–episode–unit interaction graph for representing spatial context, agent behavior, and conditional transitions, paired with a dual-view AR workflow for in-situ authoring and world-in-miniature overview. A multimodal compiler/runtime turns speech, gaze, pointing, and pose into executable agent behavior.';
      }
      if (role) role.innerHTML = '<strong>My role:</strong> interaction representation, authoring workflow, multimodal compiler/runtime, Unity/Meta Quest implementation, and evaluation. A two-session study with 12 participants achieved a 79.8 ± 10.8 SUS score.';
    }

    if (title === 'Contact-aware 3D piano hand motion generation') {
      if (metaSpans[1]) metaSpans[1].textContent = '2025 — May 2026';
    }

    if (title === 'Hardware-aware evaluation of text-to-image models') {
      if (h3) h3.textContent = 'Compositional and hardware-aware evaluation of text-to-image models';
      if (metaSpans[1]) metaSpans[1].textContent = '2025 — May 2026';
      if (question) question.textContent = 'How much of a model’s apparent image quality survives when we test compositional correctness and real edge-inference cost?';
      if (bodyParagraphs[1]) {
        bodyParagraphs[1].textContent = 'I benchmarked seven generators across object, count, attribute, spatial-relation, and style factors, fine-tuned CLIP into a task-specific semantic-alignment classifier, and built a reproducible Jetson Orin inference/profiling stack with standardized warm-up, CUDA-synchronized timing, mixed precision, and GPU-memory measurement.';
      }
      if (role) role.innerHTML = '<strong>My role:</strong> benchmark design, prompt taxonomy, CLIP adaptation, automated evaluation, edge deployment, and inference profiling.';
    }

    if (title === 'Voice-first video assistance for AR glasses') {
      if (question) question.textContent = 'What changes when a voice assistant on glasses can keep state, use tools, and remember what the user tends to choose?';
      if (bodyParagraphs[1]) {
        bodyParagraphs[1].textContent = "At Eyedaptic, I architected a stateful, tool-using voice agent for AR glasses, orchestrating 20+ typed tools through Gemini Live for search, refinement, selection, history resume, and playback. I also built a retrieval/personalization layer with multi-signal reranking, channel-aware context, and local behavioral memory.";
      }
      if (role) role.innerHTML = '<strong>My role:</strong> agent/tool architecture, retrieval and ranking, personalization memory, Android/backend integration, and evaluation. Mean top-1 ranking score improved from 0.182 to 0.604 across a 10-scenario test set.';
    }
  });

  const prototype = document.querySelector('.prototype-note');
  if (prototype) {
    prototype.className = 'direction-note';
    prototype.innerHTML = '<strong>Where I\'m pushing next.</strong> I\'m especially interested in two directions: <strong>3D physical intelligence</strong>—giving agents representations of geometry, state, and interaction that may also transfer toward embodied intelligence—and <strong>smart-glasses agents</strong>, where always-available first-person context plus very lightweight voice or gesture input can make capable agents useful without a screen-heavy interface.';
  }

  // Experience summary updates.
  document.querySelectorAll('.experience-item').forEach((item) => {
    const heading = item.querySelector('h3')?.textContent || '';
    if (heading.includes('C Design Lab')) {
      const desc = item.querySelector('div:last-child > p:last-child');
      if (desc) desc.textContent = 'Human–AI reasoning, AR agents, first-person/3D scene understanding, and spatial interaction.';
    }
    if (heading.includes('Elmore Family School of ECE')) {
      const when = item.querySelector('.experience-when');
      if (when) when.textContent = 'Feb. 2025 — May 2026';
    }
    if (heading.includes('Eyedaptic')) {
      const desc = item.querySelector('div:last-child > p:last-child');
      if (desc) desc.textContent = 'Stateful voice agents and real-time multimodal assistance for AR glasses.';
    }
  });

  // About: preserve the psychology/product angle, while making the smart-glasses bet explicit but not promotional.
  const aboutCopy = document.querySelector('.about-copy');
  if (aboutCopy) {
    const paras = [...aboutCopy.children].filter((el) => el.tagName === 'P' && !el.classList.contains('eyebrow'));
    if (paras[0]) paras[0].textContent = "I'm probably more interested in products than in any one technology. What interests me most is the psychology underneath them: people differ, but patterns in attention, expectation, habit, trust, and hesitation repeat more often than we think.";
    if (paras[1]) paras[1].textContent = "I usually start by building a rough model of the person before the interface—what they are likely to notice, assume, ignore, or do next—and then ask what the product should make easier or disappear entirely.";
    if (paras[2]) paras[2].textContent = "That is part of why smart glasses interest me. If agents become good enough at understanding first-person context and using tools, a very small amount of input could unlock useful experiences without repeatedly pulling someone back to a screen.";
  }

  // Web CV: align major content with the current application CV.
  const cvHeaderResearch = [...document.querySelectorAll('.cv-header p')].find((p) => p.textContent.includes('Research:'));
  if (cvHeaderResearch) cvHeaderResearch.innerHTML = '<strong>Research:</strong> Human–AI Interaction · Spatial &amp; Egocentric AI · XR &amp; Wearable Computing';

  document.querySelectorAll('.cv-entry').forEach((entry) => {
    const heading = entry.querySelector('h3')?.textContent || '';

    if (heading === 'Purdue University') {
      const roles = entry.querySelectorAll('.role');
      if (roles[0]) roles[0].textContent = 'B.S. Computer Science, Machine Intelligence Track · West Lafayette, Indiana';
    }

    if (heading.includes('Elmore Family School of ECE')) {
      const date = entry.querySelector('.date');
      if (date) date.textContent = 'Feb. 2025 — May 2026';
      const projects = entry.querySelectorAll('.project');
      if (projects[0]) projects[0].textContent = 'Compositional and Hardware-Aware Evaluation of Text-to-Image Models';
      const items = entry.querySelectorAll('li');
      if (items[0]) items[0].textContent = 'Designed a compositional benchmark across seven text-to-image models; fine-tuned CLIP on the project dataset into a task-specific semantic-alignment classifier.';
      if (items[1]) items[1].textContent = 'Engineered a reproducible Jetson Orin inference/profiling stack with standardized warm-up, CUDA-synchronized timing, mixed precision, and GPU-memory measurement.';
    }

    if (heading.includes('C Design Lab')) {
      const items = entry.querySelectorAll('li');
      if (items[0]) items[0].textContent = 'Architected a stateful, tool-using reasoning agent for situated AR tasks, separating generative reasoning from deterministic execution while maintaining persistent spatial task state.';
      if (items[1]) items[1].textContent = 'Built persistent spatial state/memory over first-person visual context and Quest pose/depth geometry, with versioned updates that prevent stale or duplicate actions from committing.';
      if (items[2]) items[2].textContent = 'Designed a human-in-the-loop revision mechanism that lets the agent solicit missing knowledge and propagates user corrections only through dependent reasoning branches.';
    }

    if (heading.includes('VIPER Lab')) {
      const items = entry.querySelectorAll('li');
      if (items[0]) items[0].textContent = 'Designed an end-to-end computer-vision pipeline for fruit recognition, benchmarking five CNN backbones while tuning resolution and preprocessing (Sobel filtering, resizing, RGB normalization); achieved 95% accuracy with under 200 ms processing time.';
      if (items[1]) items[1].textContent = 'Built a fault-tolerant Android data pipeline with asynchronous capture/upload and retry-aware execution, sustaining over 99% successful uploads.';
    }

    if (heading === 'Eyedaptic') {
      const projects = entry.querySelectorAll('.project');
      if (projects[0]) projects[0].textContent = 'Eva: Stateful Voice Agent for AR Glasses';
      if (projects[1]) projects[1].textContent = 'Real-Time Multimodal Agent Runtime';
      const items = entry.querySelectorAll('li');
      if (items[0]) items[0].textContent = 'Architected a stateful, tool-using voice agent for Eyedaptic\'s Android AR-glasses platform, orchestrating 20+ typed tools through Gemini Live for search, refinement, selection, resume, and playback control.';
      if (items[1]) items[1].textContent = 'Built retrieval and personalization with multi-signal reranking, channel-aware context, and SQLite behavioral memory; improved mean top-1 ranking score from 0.182 to 0.604 across 10 evaluation scenarios.';
      if (items[2]) items[2].textContent = 'Engineered a real-time multimodal agent runtime coupling first-person visual/OCR perception with concurrent response generation, interruptible streaming PCM, and TaskToken cancellation; reduced time-to-first-speech by 2–3 s and long-form latency by up to 80%.';
    }
  });

  // Add side projects to the web CV if they are not already present.
  const cvSections = [...document.querySelectorAll('.cv-section')];
  const technicalSection = cvSections.find((s) => s.querySelector('h2')?.textContent.trim() === 'Technical Skills');
  const hasSelectedProjects = cvSections.some((s) => s.querySelector('h2')?.textContent.trim() === 'Selected Projects');
  if (technicalSection && !hasSelectedProjects) {
    const section = document.createElement('section');
    section.className = 'cv-section';
    section.innerHTML = `
      <h2>Selected Projects</h2>
      <div class="cv-entry">
        <h3>SEEAgent: Egocentric Perception-to-Action Agent for Smart Glasses</h3>
        <div class="role">Stateful, tool-using egocentric agent with cross-frame memory, checkpointed planning, and result verification for interruptible multi-step tasks.</div>
      </div>
      <div class="cv-entry">
        <h3>BeatDopamine: Adaptive Agent for Attention and Self-Regulation</h3>
        <div class="role">Adaptive behavioral agent that personalizes task difficulty and intervention timing, then gradually withdraws scaffolding as sustained attention and self-directed control improve.</div>
      </div>`;
    technicalSection.parentNode.insertBefore(section, technicalSection);
  }

  const cvTags = document.querySelector('.cv-tags');
  if (cvTags) {
    cvTags.innerHTML = [
      'Python', 'C/C++', 'C#', 'Java/Kotlin', 'Swift', 'Go',
      'PyTorch', 'Transformers', 'OpenCV', 'CUDA', 'TensorRT',
      'VLMs', 'RAG / Memory', 'Tool Calling', 'MCP', 'LangGraph',
      'Linux / SLURM', 'Docker', 'Kubernetes', 'FastAPI', 'Redis',
      'Unity', 'Android / iOS', 'NVIDIA Jetson', 'AWS / GCP / Azure'
    ].map((t) => `<span>${t}</span>`).join('');

    if (!cvTags.parentElement.querySelector('.ai-native-note')) {
      const note = document.createElement('p');
      note.className = 'role ai-native-note';
      note.style.marginTop = '12px';
      note.innerHTML = '<em>AI-native builder; I work with Codex and Claude Code as day-to-day collaborators.</em>';
      cvTags.after(note);
    }
  }
})();
