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
  `;
  document.head.appendChild(style);

  // Use Bootstrap's vector brand glyphs for the two profile links so they do not
  // depend on a third-party image URL at runtime.
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
})();
