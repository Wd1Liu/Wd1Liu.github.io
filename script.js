(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href="assets/Bingyi_Liu_CV.pdf"]').forEach((link) => {
    link.setAttribute('href', 'cv.html');
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
