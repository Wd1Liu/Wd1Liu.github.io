(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // The site stays monochrome; real brand marks keep their own colors.
  const style = document.createElement('style');
  style.textContent = `
    .brand-mark,
    .news-brand,
    .tool-logos img,
    .personal-grid .club-mark {
      filter: none !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);

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

  const github = document.querySelector('.profile-links a[href*="github.com"] img');
  if (github) github.src = 'https://cdn.simpleicons.org/github/181717';

  const linkedin = document.querySelector('.profile-links a[href*="linkedin.com"] img');
  if (linkedin) linkedin.src = 'https://cdn.simpleicons.org/linkedin/0A66C2';
})();
