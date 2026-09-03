(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = toggle?.querySelector('.theme-label');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem('bingyi-site-theme');
  if (saved === 'gray') root.dataset.theme = 'gray';

  const syncLabel = () => {
    if (!label) return;
    label.textContent = root.dataset.theme === 'gray' ? 'B/W' : 'Gray';
  };
  syncLabel();

  toggle?.addEventListener('click', () => {
    if (root.dataset.theme === 'gray') {
      delete root.dataset.theme;
      localStorage.setItem('bingyi-site-theme', 'bw');
    } else {
      root.dataset.theme = 'gray';
      localStorage.setItem('bingyi-site-theme', 'gray');
    }
    syncLabel();
  });
})();
