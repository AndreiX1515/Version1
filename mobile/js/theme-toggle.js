/* ================================
   THEME TOGGLE LOGIC (LOGIN) — ICON ADAPTIVE
================================ */

document.addEventListener('DOMContentLoaded', () => {
    const toggleContainer = document.querySelector('.theme-toggle-container-login');
    const toggleButton    = toggleContainer?.querySelector('.theme-toggle-btn');
    const themeLabelText  = toggleContainer?.querySelector('.theme-label-text');
    const toggleThumb     = toggleContainer?.querySelector('.theme-toggle-thumb');
    const toggleIcon      = toggleButton?.querySelector('i'); // Font Awesome icon inside button

    if (!toggleContainer || !toggleButton || !themeLabelText || !toggleThumb || !toggleIcon) {
        console.warn('Login theme toggle elements not found');
        return;
    }

    // Apply theme state
    function applyTheme(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
        themeLabelText.textContent = isDark ? 'Dark' : 'Light';
        toggleButton.setAttribute('aria-pressed', String(isDark));

        // Update icon class
        toggleIcon.classList.toggle('fa-sun', !isDark);
        toggleIcon.classList.toggle('fa-moon', isDark);

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Initialize theme on load
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(true);
        } else {
            applyTheme(false);
        }
    }

    // Handle click on toggle container or button
    toggleContainer.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        applyTheme(isDark);
    });

    // Optional: sync with system dark mode changes if user hasn't chosen
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        });
    }

    initTheme();
});
