document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.theme-toggle-container-login');
    const toggleIcon = toggleBtn.querySelector('i');

    if (!toggleBtn || !toggleIcon) return;

    function applyTheme(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
        toggleBtn.setAttribute('aria-pressed', String(isDark));

        toggleIcon.classList.toggle('fa-sun', !isDark);
        toggleIcon.classList.toggle('fa-moon', isDark);

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) applyTheme(savedTheme === 'dark');
        else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    toggleBtn.addEventListener('click', () => {
        applyTheme(!document.documentElement.classList.contains('dark'));
    });

    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', e => {
            if (!localStorage.getItem('theme')) applyTheme(e.matches);
        });
    }

    initTheme();
});
