// 使用DOMContentLoaded事件确保DOM完全加载后再执行脚本
document.addEventListener('DOMContentLoaded', function () {
    // Avatar rotation control - 移动端
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg) {
        avatarImg.addEventListener('click', function () {
            this.classList.toggle('rotating');
        });
    }

    // Avatar rotation control - PC端
    const avatarImgPc = document.getElementById('avatar-img-pc');
    if (avatarImgPc) {
        avatarImgPc.addEventListener('click', function () {
            this.classList.toggle('rotating');
        });
    }

    // Random background image - 使用Bing每日壁纸
    const bgImage = document.getElementById('background-image');

    function loadBackground() {
        // Bing每日壁纸API: https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
        const defaultBg = "https://www.liqiang.info/assets/images/back.png";
        const bingApiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";

        const img = new Image();
        // 从Bing API获取图片信息
        fetch(bingApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.images && data.images[0] && data.images[0].url) {
                    const imageUrl = 'https://www.bing.com' + data.images[0].url;
                    img.onload = () => {
                        bgImage.style.backgroundImage = `url('${imageUrl}')`;
                    };
                    img.onerror = () => {
                        bgImage.style.backgroundImage = `url('${defaultBg}')`;
                    };
                    img.src = imageUrl;
                } else {
                    bgImage.style.backgroundImage = `url('${defaultBg}')`;
                }
            })
            .catch(() => {
                // 如果fetch失败，使用默认图片
                bgImage.style.backgroundImage = `url('${defaultBg}')`;
            });
        bgImage.style.opacity = '0.9';
    }

    // Lazy load background using IntersectionObserver
    new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            loadBackground();
            observer.disconnect();
        }
    }).observe(bgImage);

    // Accessiblity API for animation performance
    document.addEventListener('visibilitychange', function () {
        avatarImg.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
});

// 搜索功能详解
function doSearch(engine) {
    let inputId = '';
    let baseUrl = '';

    if (engine === 'baidu') {
        inputId = 'baidu-input';
        baseUrl = 'https://www.baidu.com/s?wd=';
    } else if (engine === 'google') {
        inputId = 'google-input';
        baseUrl = 'https://www.google.com/search?q=';
    }

    const input = document.getElementById(inputId);
    if (!input) return;

    const query = input.value.trim();

    if (!query) {
        input.focus();
        return;
    }

    window.open(baseUrl + encodeURIComponent(query), '_blank');
}

// Bind Enter key event
function bindEnterKey(inputId, engine) {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doSearch(engine);
        });
    }
}

bindEnterKey('baidu-input', 'baidu');
bindEnterKey('google-input', 'google');

// 赏赐弹窗功能
const qqQr = "https://www.liqiang.info/assets/images/qqpay.png";
const wechatQr = "https://www.liqiang.info/assets/images/weixinpay.png";
const alipayQr = "https://www.liqiang.info/assets/images/alipay.png";

function openRewardModal() {
    const modal = document.getElementById('reward-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    backToSelection(); // 默认显示选择界面
}

function closeRewardModal(event) {
    if (event.target.id === 'reward-modal' || event.target.classList.contains('reward-close')) {
        const modal = document.getElementById('reward-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function showQrCode(type) {
    const selectionDiv = document.getElementById('reward-selection');
    const qrDiv = document.getElementById('reward-qr');
    const img = document.getElementById('reward-img');

    if (type === 'wechat') {
        img.src = wechatQr;
    } else if (type === 'alipay') {
        img.src = alipayQr;
    } else if (type === 'qq') {
        img.src = qqQr;
    }

    selectionDiv.style.display = 'none';
    qrDiv.style.display = 'block';
}

function backToSelection() {
    document.getElementById('reward-selection').style.display = 'flex';
    document.getElementById('reward-qr').style.display = 'none';
}

// ESC键关闭弹窗
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('reward-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});