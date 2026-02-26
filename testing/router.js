/**
 * SPA Router with History API Support
 * Handles client-side routing, nested routes, and smooth page transitions
 */

class Router {
    constructor(options = {}) {
        this.routes = [];
        this.currentRoute = null;
        this.rootElement = options.rootElement || document.getElementById('app');
        this.transitionDuration = options.transitionDuration || 400;
        this.onBeforeNavigate = options.onBeforeNavigate || null;
        this.onAfterNavigate = options.onAfterNavigate || null;
        
        // Bind methods
        this.navigate = this.navigate.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        
        // Initialize
        this.init();
    }

    /**
     * Initialize the router
     */
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', this.handlePopState);
        
        // Intercept all link clicks
        document.addEventListener('click', this.handleLinkClick);
        
        // Load initial route
        this.loadRoute(window.location.pathname);
    }

    /**
     * Register a route
     * @param {string} path - Route path (supports :params)
     * @param {Function|Object} handler - Route handler function or config object
     */
    register(path, handler) {
        // Convert path to regex for matching
        const paramNames = [];
        const regexPath = path
            .replace(/\/:(\w+)/g, (_, paramName) => {
                paramNames.push(paramName);
                return '/([^/]+)';
            })
            .replace(/\//g, '\\/');
        
        this.routes.push({
            path,
            regex: new RegExp(`^${regexPath}$`),
            paramNames,
            handler: typeof handler === 'function' ? { render: handler } : handler
        });
        
        return this;
    }

    /**
     * Find matching route for a given path
     * @param {string} path - Path to match
     * @returns {Object|null} Matched route with params
     */
    matchRoute(path) {
        for (const route of this.routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                return { route, params, path };
            }
        }
        return null;
    }

    /**
     * Navigate to a new route
     * @param {string} path - Path to navigate to
     * @param {Object} options - Navigation options
     */
    async navigate(path, options = {}) {
        // Normalize path
        path = path || '/';
        
        // Check if already on this route
        if (this.currentRoute?.path === path && !options.force) {
            return;
        }

        // Call before navigate hook
        if (this.onBeforeNavigate) {
            const shouldContinue = await this.onBeforeNavigate(path, this.currentRoute?.path);
            if (shouldContinue === false) return;
        }

        // Update browser history
        if (!options.replace) {
            window.history.pushState({ path }, '', path);
        } else {
            window.history.replaceState({ path }, '', path);
        }

        // Load the route
        await this.loadRoute(path);
    }

    /**
     * Load and render a route
     * @param {string} path - Path to load
     */
    async loadRoute(path) {
        const match = this.matchRoute(path);
        
        if (!match) {
            // No route found, show 404
            this.render404(path);
            return;
        }

        const { route, params } = match;
        
        // Store current route
        this.currentRoute = { path, route, params };

        // Transition out current content
        await this.transitionOut();

        try {
            let content;
            
            // If handler has a load method (for async data fetching)
            if (route.handler.load) {
                const data = await route.handler.load(params);
                content = await route.handler.render(params, data);
            } else {
                content = await route.handler.render(params);
            }

            // Update the DOM
            this.rootElement.innerHTML = content;

            // Transition in new content
            await this.transitionIn();

            // Call after navigate hook
            if (this.onAfterNavigate) {
                this.onAfterNavigate(path, params);
            }

            // Execute any page-specific scripts
            if (route.handler.onMount) {
                route.handler.onMount(params);
            }
        } catch (error) {
            console.error('Error loading route:', error);
            this.renderError(error);
        }
    }

    /**
     * Transition out animation
     */
    async transitionOut() {
        this.rootElement.classList.add('page-transition-exit');
        this.rootElement.classList.add('page-transition-exit-active');
        
        await new Promise(resolve => setTimeout(resolve, this.transitionDuration / 2));
    }

    /**
     * Transition in animation
     */
    async transitionIn() {
        this.rootElement.classList.remove('page-transition-exit', 'page-transition-exit-active');
        this.rootElement.classList.add('page-transition-enter');
        
        // Force reflow
        this.rootElement.offsetHeight;
        
        this.rootElement.classList.add('page-transition-enter-active');
        
        await new Promise(resolve => setTimeout(resolve, this.transitionDuration));
        
        this.rootElement.classList.remove('page-transition-enter', 'page-transition-enter-active');
    }

    /**
     * Render 404 page
     */
    render404(path) {
        this.rootElement.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">404 - Page Not Found</h1>
                <p class="page-description">The page "${path}" could not be found.</p>
            </div>
            <div class="card">
                <p>The route you're looking for doesn't exist. <a href="/" data-route="/">Go back home</a></p>
            </div>
        `;
    }

    /**
     * Render error page
     */
    renderError(error) {
        this.rootElement.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Error Loading Page</h1>
                <p class="page-description">An error occurred while loading this page.</p>
            </div>
            <div class="card">
                <p style="color: var(--color-primary); font-family: var(--font-mono);">${error.message}</p>
            </div>
        `;
    }

    /**
     * Handle browser back/forward
     */
    handlePopState(event) {
        const path = event.state?.path || window.location.pathname;
        this.loadRoute(path);
    }

    /**
     * Intercept link clicks
     */
    handleLinkClick(event) {
        // Check if the click is on a link or within a link
        const link = event.target.closest('a[data-route]');
        
        if (!link) return;

        // Prevent default only for internal links
        const href = link.getAttribute('href');
        
        // Allow external links to work normally
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
            return;
        }

        event.preventDefault();
        
        // Get the route path
        const path = link.getAttribute('href');
        
        // Navigate to the route
        this.navigate(path);
    }

    /**
     * Get current route information
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Get route parameters
     */
    getParams() {
        return this.currentRoute?.params || {};
    }

    /**
     * Navigate back
     */
    back() {
        window.history.back();
    }

    /**
     * Navigate forward
     */
    forward() {
        window.history.forward();
    }

    /**
     * Destroy the router
     */
    destroy() {
        window.removeEventListener('popstate', this.handlePopState);
        document.removeEventListener('click', this.handleLinkClick);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
}