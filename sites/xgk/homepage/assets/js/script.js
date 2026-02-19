// 动态背景初始化（仅在非"none"时执行0.0）

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 更新日期时间
    updateDateTime();

    // 显示主内容
    setTimeout(() => {
        const container = document.getElementById('container');
        container.style.opacity = '1';
        container.style.transform = 'none';

        // 显示网站网格
        document.querySelector('.app-grid').style.opacity = '1';
        document.querySelector('.app-grid').style.transform = 'none';

        // 显示页脚
        document.querySelector('footer').style.opacity = '1';

        // 隐藏加载器
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');

            // 延迟显示公告弹窗
            setTimeout(showAnnouncement, 600);
        }, 400);
    }, 400);

    // 设置时间更新定时器
    setInterval(updateDateTime, 1000);

    // 添加应用点击事件
    setupAppLinks();

    // 公告弹窗事件
    const modal = document.getElementById('announcementModal');
    const closeButtons = [
        document.getElementById('closeAnnouncement'),
        document.getElementById('closeAnnouncementBtn')
    ];

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideAnnouncement();
            localStorage.setItem('announcementSeenDate', new Date().toISOString().split('T')[0]);
        });
    });

    // 点击弹窗背景关闭弹窗
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideAnnouncement();
            localStorage.setItem('announcementSeenDate', new Date().toISOString().split('T')[0]);
        }
    });

    // 模拟访问量
    updateVisitorCount();

    // 根据设备类型调整天气显示
    adjustWeatherDisplay();
});

// 更新时间函数
function updateDateTime() {
    const now = new Date();

    // 格式化时间
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // 格式化日期
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    const dateStr = now.toLocaleDateString('zh-CN', dateOptions);

    // 更新DOM
    document.getElementById('time').textContent = timeStr;
    document.getElementById('date').textContent = dateStr;
}

// 应用链接配置
const appLinks = {
    "博客": "https://ovogk.com",
    "网盘": "https://gkym.cn/",
    "音乐": "https://yy.xgk.pw",
    "截图": "https://31.xgk.pw",
    "她导航": "https://tadh.cn",
    "ii主题": "https://iizt.cn",
    "朋友圈": "https://hunbi.fun",
    "土狗论坛": "https://tglt.cn",
    "其他": "/",
    "其他": "/",
};

// 应用点击事件设置
function setupAppLinks() {
    document.querySelectorAll('.app-item').forEach(item => {
        item.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            const appName = this.getAttribute('data-app-name');
            const link = appLinks[appName];

            if (link) {
                setTimeout(() => {
                    window.open(link, '_blank');
                }, 300);
            }
        });
    });
}

// 显示公告弹窗
function showAnnouncement() {
    const lastSeenDate = localStorage.getItem('announcementSeenDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastSeenDate !== today) {
        document.getElementById('announcementModal').classList.add('active');
    }
}

// 隐藏公告弹窗
function hideAnnouncement() {
    document.getElementById('announcementModal').classList.remove('active');
}

// 更新访问量计数
function updateVisitorCount() {
    const countEl = document.getElementById('visitorCount');
    let count = Math.floor(Math.random() * 10000) + 15000;
    countEl.textContent = count.toLocaleString();

    setInterval(() => {
        count += Math.floor(Math.random() * 5) + 1;
        countEl.textContent = count.toLocaleString();
    }, 15000);
}

// 根据设备类型调整天气显示
function adjustWeatherDisplay() {
    const weatherEl = document.getElementById('weather');
    if (window.innerWidth < 768) {
        weatherEl.textContent = '☀️ 25℃';
    } else {
        weatherEl.textContent = '天气：晴 ☀️ 25℃';
    }
}

// 监听窗口大小变化
window.addEventListener('resize', adjustWeatherDisplay);