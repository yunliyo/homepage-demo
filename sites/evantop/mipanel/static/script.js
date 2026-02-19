(function () {
    const cvs = document.getElementById('bg-canvas'),
        ctx = cvs.getContext('2d'),
        dpr = window.devicePixelRatio || 1;
    let w, h, particles = [];

    function resize() {
        w = cvs.width = innerWidth * dpr;
        h = cvs.height = innerHeight * dpr;
        ctx.scale(dpr, dpr);
        cvs.style.width = innerWidth + 'px';
        cvs.style.height = innerHeight + 'px';
    }
    window.addEventListener('resize', resize);

    class P {
        constructor() {
            this.x = Math.random() * innerWidth;
            this.y = Math.random() * innerHeight;
            this.vx = (Math.random() - .5) * .3;
            this.vy = (Math.random() - .5) * .3;
            this.r = Math.random() * 1.2 + .5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > innerHeight) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = isDark() ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)';
            ctx.fill();
        }
    }

    function isDark() {
        return document.body.classList.contains('dark-theme');
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x,
                    dy = particles[i].y - particles[j].y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isDark() ?
                        `rgba(255,255,255,${1-dist/100})` :
                        `rgba(0,0,0,${.5-dist/200})`;
                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        }
    }

    function init() {
        resize();
        particles = Array.from({
            length: Math.floor(innerWidth * innerHeight / 18000)
        }, () => new P());
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        requestAnimationFrame(animate);
    }

    init();
})();

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-theme');
    loadSoldDomains();
});

// 已售出或已过期域名列表
const soldDomains = [
    "yunlihub.top",
    "yunli0216.top",
    "yunlihub.com",
    "changesmetaverse.com",
    "19970324.com",
    "19970216.com",
    "poeticaiot.com",
    "yunlipoeticlee.com",
    "yunliyo.com",
    "944.run",
    "944101.com",
    "944101.cn",
    "545801.xyz",
    "944101.xyz",
    "546099.xyz",
    "zyyo.tech",
    "zyyo.site",
    "zyyo.info",
    "zyyo.work",
    "zyyo.ac.cn",
    "chulinglan.cn",
    "sudixuan.cn",
    "moeshe.cn",
    "lapic.cn",
    "lidanqiang.com",
    "lidanqiang.cn",
    "lidanqiang.net",
    "lidanqiang.org",
];
// 加载已售出域名
function loadSoldDomains() {
    displaySoldDomains(soldDomains);
}
// 将域名显示为卡片
function displaySoldDomains(domains) {
    const container = document.getElementById('sold-domains-container');
    if (domains.length === 0) {
        container.innerHTML = '<div class="empty-message">暂无已售出或已过期域名</div>';
        return;
    }
    // 生成域名卡片
    const domainCards = domains.map(domain => {
        return `
            <a href="http://${domain}" class="card sold-domain-card" target="_blank" rel="noopener noreferrer">
                <div class="card-title">${domain}</div>
                <div class="card-description">已售出或已过期</div>
            </a>
        `;
    }).join('');
    container.innerHTML = domainCards;
}