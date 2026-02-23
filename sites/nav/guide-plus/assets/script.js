tailwind.config = {
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                }
            }
        },
    },
}

const grid = document.getElementById('siteGrid');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
let allSites = [];

let faviconBase = null;

document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    faviconBase = await detectFaviconBase();
    fetchSites();
});
const faviconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.src;
        if (src && !img.src) {
            img.src = src;
        }
        faviconObserver.unobserve(img);
    });
}, {
    root: null,
    rootMargin: '200px',
    threshold: 0
});

async function fetchSites() {
    try {
        const response = await fetch('sites.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        parseSites(text);
    } catch (error) {
        console.error('Error fetching sites:', error);
        grid.innerHTML = `
                    <div class="col-span-full text-center text-destructive p-4 border border-destructive/20 rounded-lg bg-destructive/10">
                        <p class="font-bold">无法加载数据文件 (sites.txt)</p>
                        <p class="text-sm mt-1">请确保 sites.txt 存在且可通过 HTTP 访问 (由于浏览器安全策略，直接双击 HTML 可能无法读取本地文件)。</p>
                    </div>
                `;
    }
}

function parseSites(text) {
    allSites = [];
    let currentCategory = {
        name: '默认分类',
        sites: []
    };

    const lines = text.split('\n').map(line => line.trim());

    lines.forEach(line => {
        if (!line) return;

        if (line.startsWith('##')) {
            if (currentCategory.sites.length > 0) {
                allSites.push(currentCategory);
            }
            const categoryName = line.replace(/^##\s*/, '').trim();
            currentCategory = {
                name: categoryName,
                sites: []
            };
            return;
        }

        if (line.startsWith('#')) return;

        let parts = line.split(/,|\|/);
        if (parts.length < 2) {
            const spaceIndex = line.indexOf(' ');
            if (spaceIndex > -1) {
                parts = [line.substring(0, spaceIndex), line.substring(spaceIndex + 1)];
            } else {
                return;
            }
        }

        const name = parts[0].trim();
        let url = parts[1].trim();

        const isExternal = url.startsWith('http://') || url.startsWith('https://');
        const isRelative = url.startsWith('./') || url.startsWith('/') || (url.indexOf('/') !== -1 && url.indexOf(':') === -1) || url.indexOf('.') === -1;

        if (!isExternal && !isRelative) {
            url = 'https://' + url;
        }

        currentCategory.sites.push({
            name,
            url
        });
    });

    if (currentCategory.sites.length > 0) {
        allSites.push(currentCategory);
    }

    renderSites(allSites);
}

function generateAvatar(text) {
    const textColor = '#000000'; // Black text
    const letter = Array.from(text)[0] || '?';

    const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                <text x="50%" y="50%" dy=".35em" fill="${textColor}" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle">${letter}</text>
            </svg>`;

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function handleFaviconError(img) {
    const name = img.dataset.name;
    img.removeAttribute('onerror');
    img.src = generateAvatar(name);
    img.classList.remove('h-5', 'w-5', 'object-contain');
    img.classList.add('h-full', 'w-full', 'object-cover');
}

function probeUrl(url, timeout = 2000) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const timer = setTimeout(() => {
            img.src = '';
            reject(new Error('timeout'));
        }, timeout);
        img.onload = () => {
            clearTimeout(timer);
            resolve(true);
        };
        img.onerror = () => {
            clearTimeout(timer);
            reject(new Error('error'));
        };
        img.src = url;
    });
}

async function detectFaviconBase() {
    const candidates = [{
            probe: 'https://www.google.com/favicon.ico',
            builder: (domain) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
        },
        {
            probe: 'https://icons.duckduckgo.com/favicon.ico',
            builder: (domain) => `https://icons.duckduckgo.com/ip3/${domain}.ico`
        },
        {
            probe: 'https://unavatar.io/favicon.ico',
            builder: (domain) => `https://unavatar.io/${domain}`
        }
    ];

    const probes = candidates.map((candidate) => {
        return probeUrl(candidate.probe).then(() => candidate.builder);
    });

    try {
        return await Promise.race(probes);
    } catch (error) {
        return null;
    }
}

function renderSites(categories) {
    grid.innerHTML = '';
    const hasData = categories.some(cat => cat.sites && cat.sites.length > 0) || (Array.isArray(categories) && categories.length > 0 && !categories[0].sites);

    if (!hasData) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        renderFloatingMenu([]);
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    let dataToRender = categories;

    if (Array.isArray(categories) && categories.length > 0 && !categories[0].sites) {
        dataToRender = [{
            name: '搜索结果',
            sites: categories
        }];
    }

    const fragment = document.createDocumentFragment();
    const activeCategories = [];

    dataToRender.forEach((category, index) => {
        if (!category.sites || category.sites.length === 0) return;

        const categorySection = document.createElement('section');
        categorySection.className = 'w-full scroll-mt-24 cv-auto';

        const sectionId = `cat-${index}`;
        categorySection.id = sectionId;

        if (category.name !== '默认分类' && category.name !== '搜索结果') {
            activeCategories.push({
                name: category.name,
                id: sectionId
            });
        } else if (dataToRender.length > 1) {
            activeCategories.push({
                name: category.name,
                id: sectionId
            });
        }

        if (category.name !== '默认分类' && category.name !== '搜索结果') {
            categorySection.innerHTML = `<h2 class="text-sm font-medium text-muted-foreground mt-0 mb-4 tracking-wider">${category.name}</h2>`;
        } else if (dataToRender.length > 1) {
            categorySection.innerHTML = `<h2 class="text-sm font-medium text-muted-foreground mt-0 mb-4 tracking-wider">${category.name}</h2>`;
        }

        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3';

        category.sites.forEach(site => {
            const card = createCard(site);
            cardsContainer.appendChild(card);
        });

        categorySection.appendChild(cardsContainer);
        fragment.appendChild(categorySection);
    });

    grid.appendChild(fragment);

    lucide.createIcons();
    renderFloatingMenu(activeCategories);

    Array.from(grid.querySelectorAll('img.lazy-favicon')).forEach(img => {
        faviconObserver.observe(img);
    });
}

function createCard(site) {
    const isExternal = site.url.startsWith('http');

    let displayUrl = '';
    let iconHtml = '';

    const avatarUrl = generateAvatar(site.name);

    if (isExternal) {
        try {
            displayUrl = new URL(site.url).hostname;
        } catch (e) {
            displayUrl = site.url;
        }
        if (faviconBase) {
            const faviconUrl = faviconBase(displayUrl);
            iconHtml = `
                        <img 
                          data-src="${faviconUrl}"
                          data-name="${site.name}"
                          alt="${site.name}" 
                          class="lazy-favicon h-5 w-5 object-contain transition-transform duration-500 group-hover:scale-110" 
                          onerror="handleFaviconError(this)">
                     `;
        } else {
            iconHtml = `<img src="${avatarUrl}" alt="${site.name}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">`;
        }
    } else {
        displayUrl = site.url;
        iconHtml = `<img src="${avatarUrl}" alt="${site.name}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">`;
    }

    const card = document.createElement('a');
    card.dataset.tooltip = site.name;
    card.href = site.url;
    card.target = isExternal ? "_blank" : "_self";
    card.className = "group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 no-underline select-none text-left " +
        "before:content-[attr(data-tooltip)] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:mb-2 before:px-3 before:py-1.5 before:bg-popover before:text-popover-foreground before:text-sm before:rounded-md before:shadow-lg before:whitespace-nowrap before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 before:pointer-events-none before:z-[60]";

    card.innerHTML = `
                 <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden border border-border/50">
                     ${iconHtml}
                 </div>
                 <div class="flex flex-col min-w-0 flex-1">
                     <span class="text-sm font-semibold truncate text-foreground/90 group-hover:text-primary transition-colors">${site.name}</span>
                     <span class="text-xs text-muted-foreground truncate opacity-70">${displayUrl}</span>
                 </div>
             `;
    return card;
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim().toLowerCase();

    if (!query) {
        renderSites(allSites);
        return;
    }

    let filteredSites = [];
    allSites.forEach(cat => {
        const matched = cat.sites.filter(site =>
            site.name.toLowerCase().includes(query) ||
            site.url.toLowerCase().includes(query)
        );
        filteredSites = filteredSites.concat(matched);
    });

    renderSites(filteredSites);
}, 300));

// Floating Menu Logic
const fabContainer = document.getElementById('fabContainer');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const categoryMenu = document.getElementById('categoryMenu');
const categoryMenuList = document.getElementById('categoryMenuList');
let isMenuOpen = false;

mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});
document.addEventListener('click', (e) => {
    if (isMenuOpen && !categoryMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) closeMenu();
});

function toggleMenu(show) {
    isMenuOpen = show !== undefined ? show : !isMenuOpen;
    const classes = ['scale-100', 'opacity-100', 'visible', 'translate-y-0'];

    if (isMenuOpen) {
        categoryMenu.classList.remove('scale-90', 'opacity-0', 'invisible', 'translate-y-4');
        categoryMenu.classList.add(...classes);
    } else {
        categoryMenu.classList.add('scale-90', 'opacity-0', 'invisible', 'translate-y-4');
        categoryMenu.classList.remove(...classes);
    }
    mobileMenuBtn?.setAttribute('aria-expanded', String(isMenuOpen));
}
const closeMenu = () => toggleMenu(false);

function renderFloatingMenu(categories) {
    if (!categories?.length) return fabContainer.classList.add('hidden');
    fabContainer.classList.remove('hidden');

    const itemClass = 'nav-item group flex w-full items-center rounded-md border border-transparent px-4 py-2 hover:bg-muted hover:text-foreground text-muted-foreground transition-all relative truncate select-none';

    categoryMenuList.innerHTML = categories.map(cat =>
        `<div class="${itemClass}" onclick="scrollToSection('${cat.id}')">${cat.name}</div>`
    ).join('') + (categories.length > 3 ? `
                <div class="h-px bg-border/50 my-1 mx-2"></div>
                <div class="px-4 py-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer text-center transition-colors" onclick="scrollToSection()">
                    <span class="flex items-center justify-center gap-1"><i data-lucide="arrow-up" class="h-3 w-3"></i> 回到顶部</span>
                </div>` : '');

    lucide.createIcons({
        root: categoryMenuList
    });
}

function scrollToSection(id) {
    const top = id ? document.getElementById(id)?.getBoundingClientRect().top + window.pageYOffset - 80 : 0;
    window.scrollTo({
        top,
        behavior: 'smooth'
    });
    closeMenu();
}

window.handleFaviconError = handleFaviconError;
window.scrollToSection = scrollToSection;
