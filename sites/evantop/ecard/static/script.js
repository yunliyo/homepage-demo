(function () {
    document.addEventListener('contextmenu', e => e.preventDefault());
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sun = document.querySelector('.sun-icon');
    const moon = document.querySelector('.moon-icon');
    const dark = localStorage.getItem('darkMode') === 'true';
    if (dark) {
        body.classList.add('dark');
        sun.style.display = 'block';
        moon.style.display = 'none';
    }
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        sun.style.display = isDark ? 'block' : 'none';
        moon.style.display = isDark ? 'none' : 'block';
    });

    const closeBtn = document.querySelector('.control.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const dur = 5 * 1000,
                end = Date.now() + dur,
                def = {
                    startVelocity: 30,
                    spread: 360,
                    ticks: 60,
                    zIndex: 1000
                };
            const rand = (m, n) => Math.random() * (n - m) + m;
            const iv = setInterval(() => {
                const left = end - Date.now();
                if (left <= 0) return clearInterval(iv);
                const n = 50 * (left / dur);
                if (typeof confetti === 'function') {
                    confetti(Object.assign({}, def, {
                        particleCount: n,
                        origin: {
                            x: rand(.1, .3),
                            y: Math.random() - .2
                        }
                    }));
                    confetti(Object.assign({}, def, {
                        particleCount: n,
                        origin: {
                            x: rand(.7, .9),
                            y: Math.random() - .2
                        }
                    }));
                } else {
                    clearInterval(iv);
                }
            }, 250);
        });
    }
})();