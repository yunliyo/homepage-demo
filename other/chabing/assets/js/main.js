// 背景图片API
const bgApi = 'https://www.loliapi.com/acg/';

// 刷新背景函数 - 优化版
function refreshBackground() {
    const bgContainer = document.getElementById('bg-container');
    const timestamp = new Date().getTime();
    const url = `${bgApi}?timestamp=${timestamp}`; // 创建带时间戳的URL

    // 移除Image对象创建，直接设置背景
    bgContainer.style.opacity = 0;
    bgContainer.style.transition = 'none'; // 清除之前的过渡效果

    // 设置背景图片 - 这会触发图片加载
    bgContainer.style.backgroundImage = `url('${url}')`;

    // 添加淡入效果
    setTimeout(() => {
        bgContainer.style.transition = 'opacity 1s ease';
        bgContainer.style.opacity = 1;
    }, 50);
}

// 添加刷新按钮事件
document.getElementById('refresh-bg').addEventListener('click', refreshBackground);

// 添加背景查看按钮事件
document.getElementById('view-bg-btn').addEventListener('click', function () {
    document.body.classList.toggle('bg-view-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('bg-view-mode')) {
        icon.classList.remove('fa-image');
        icon.classList.add('fa-times');
        this.title = "关闭背景查看(B)";
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-image');
        this.title = "查看背景(B)";
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    const icon = this.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 添加键盘快捷键 (R键刷新背景, B键查看背景)
document.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R') {
        refreshBackground();
    }
    if (e.key === 'b' || e.key === 'B') {
        document.getElementById('view-bg-btn').click();
    }
});

// ============== 新增的地理位置功能 ==============
// 获取地理位置信息
async function fetchLocation() {
    const loadingElement = document.getElementById('location-loading');
    const infoElement = document.getElementById('location-info');

    try {
        // 调用IP定位API
        const response = await fetch('https://myip.ipip.net/json');
        const data = await response.json();

        if (data.ret === 'ok') {
            const location = data.data.location;
            const province = location[1] || '';
            const city = location[2] || '';

            // 更新欢迎信息
            infoElement.innerHTML = `
            <p>欢迎来自 <span class="highlight">${province}${city}</span> 的小伙伴访问我的主页！</p>
            <p>元亨利贞，顺颂时祺！</p>
        `;

            // 显示信息，隐藏加载状态
            loadingElement.style.display = 'none';
            infoElement.style.display = 'block';
        } else {
            showDefaultWelcome();
        }
    } catch (error) {
        console.error('获取位置失败:', error);
        showDefaultWelcome();
    }
}

// 显示默认欢迎信息
function showDefaultWelcome() {
    const loadingElement = document.getElementById('location-loading');
    const infoElement = document.getElementById('location-info');

    infoElement.innerHTML = `
    <p>欢迎访问我的个人主页！</p>
    <p>元亨利贞，顺颂时祺！</p>
`;

    loadingElement.style.display = 'none';
    infoElement.style.display = 'block';
}

// 添加样式高亮
const style = document.createElement('style');
style.innerHTML = `
.highlight {
    color: #60a5fa;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
}
#location-info p {
    margin-bottom: 15px;
    line-height: 1.6;
}
#location-info p:last-child {
    margin-bottom: 0;
}
`;
document.head.appendChild(style);

// 页面加载完成后获取位置
window.addEventListener('DOMContentLoaded', function () {
    // 初始加载背景
    refreshBackground();
    // 获取地理位置
    fetchLocation();
});