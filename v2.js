(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem('bingyi-site-theme');
  if (saved === 'graphite') root.dataset.theme = 'graphite';

  if (button) {
    const syncLabel = () => {
      const graphite = root.dataset.theme === 'graphite';
      button.setAttribute('aria-label', graphite ? 'Switch to black and white theme' : 'Switch to graphite theme');
      button.title = graphite ? 'Black / white theme' : 'Graphite theme';
    };
    syncLabel();
    button.addEventListener('click', () => {
      const graphite = root.dataset.theme === 'graphite';
      if (graphite) {
        delete root.dataset.theme;
        localStorage.removeItem('bingyi-site-theme');
      } else {
        root.dataset.theme = 'graphite';
        localStorage.setItem('bingyi-site-theme', 'graphite');
      }
      syncLabel();
    });
  }
})();
