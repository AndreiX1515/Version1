<!-- JS: Header Date Today Script -->
<script>
    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('todayDate').textContent =
        today.toLocaleDateString(undefined, options);
</script>


<!-- Important Imports (JS) -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
<script src="../../public/gen-js/dashboard-structure-defaults.js"></script>