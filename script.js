(() => {
  const root = document.documentElement;
  const year = document.getElementById('year');

  // The site uses one fixed monochrome visual system: white, black, and gray.
  // Remove any theme state left over from earlier drafts.
  delete root.dataset.theme;
  localStorage.removeItem('bingyi-site-theme');
  localStorage.removeItem('edison-theme');

  // Remove the obsolete theme switch from older markup.
  document.querySelector('.theme-toggle')?.remove();

  if (year) year.textContent = new Date().getFullYear();
})();
