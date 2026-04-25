// 自动变灰色，以示悼念
let myDate = new Date;
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ['4.4', '6.4', '7.7', '9.18', '12.13'];
for (let day of days) {
    let d = day.split('.');
    if (mon == d[0] && date == d[1]) {
        document.write(
            '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
        );
    }
};

// 切换到暗黑主题
document.querySelector('.switch input').addEventListener('click', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// 建站时间计算
function siteTime() {
    window.setTimeout("siteTime()", 1000);
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth() + 1;
    var todayDate = today.getDate();
    var todayHour = today.getHours();
    var todayMinute = today.getMinutes();
    var todaySecond = today.getSeconds();
    var t1 = Date.UTC(2014, 7, 1, 9, 0, 0);
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
    var diff = t2 - t1;
    var diffYears = Math.floor(diff / years);
    var diffDays = Math.floor((diff / days) - diffYears * 365);
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    document.getElementById("sitetime").innerHTML = "稳定运行" + diffYears + "年" + diffDays + "天" + diffHours + "小时" + diffMinutes + "分" + diffSeconds + "秒";
}
siteTime();

// 处理汉堡菜单点击
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    // 处理移动端下拉菜单
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if(dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if(window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
            }
        });
    }
});
// 滚动进度条
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}
window.addEventListener('scroll', updateProgressBar);

// 创建统一的二维码模态框函数
function showQRCodeModal(imgSrc) {
    const modal = document.createElement('div');
    modal.id = 'qrCodeModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const title = document.createElement('p');
    title.textContent = '过眼溪山，旧时曾识';
    modalContent.appendChild(title);
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = '二维码';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    modalContent.appendChild(img);
    const closeButton = document.createElement('button');
    closeButton.className = 'close';
    closeButton.textContent = '关闭';
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    function closeModal() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// 为所有 .social-icons 中的图标添加点击事件
document.querySelectorAll('.social-icons a').forEach(function (icon) {
    icon.onclick = function (e) {
        const qrcodeSrc = this.getAttribute('data-qrcode');
        if (qrcodeSrc && qrcodeSrc !== '') {
            e.preventDefault();
            showQRCodeModal(qrcodeSrc);
        }
    };
});
// 为所有 .btn-qr 中的链接添加点击事件
document.querySelectorAll('.btn-qr').forEach(function (btn) {
    btn.onclick = function (e) {
        e.preventDefault();
        const qrcodeSrc = this.getAttribute('data-qrcode');
        if (qrcodeSrc) {
            showQRCodeModal(qrcodeSrc);
        }
    };
});
// 为所有 .tab-content 中的链接添加点击事件
document.querySelectorAll('.tab-content a').forEach(function (icon) {
    icon.onclick = function (e) {
        const qrcodeSrc = this.getAttribute('data-qrcode');
        if (qrcodeSrc && qrcodeSrc !== '') {
            e.preventDefault();
            showQRCodeModal(qrcodeSrc);
        }
    };
});

// ecard-tabs
document.querySelectorAll('.tab-button').forEach(function (button) {
    button.addEventListener('click', function () {
        const tab = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(function (content) {
            content.classList.remove('active');
        });
        document.querySelector(`#${tab}`).classList.add('active');
        document.querySelectorAll('.tab-button').forEach(function (btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

// 自动填写
(function (window, document) {
    var github = ['@Yunli'];
    document.getElementById('contact-github').innerText = github;
    var email = ['@Yunli'].join('');
    document.getElementById('contact-email').innerText = email;
    var year = new Date().getFullYear();
    document.getElementById('copyright-year').innerText = year;
})(window, document);

// 下拉选择框
function redirectNewTab(select) {
    var selectedIndex = select.selectedIndex;
    if (selectedIndex !== 0) {
        var selectedOption = select.options[selectedIndex];
        // 打开新标签页
        window.open(selectedOption.value, '_blank');
        // 重置选择框的选中状态
        select.selectedIndex = 0;
    }
}

// Modal functionality
const modal = document.getElementById('myModal');
const favoriteIcon = document.getElementById('favoriteIcon');
const closeModal = document.querySelector('.close');
favoriteIcon.onclick = function (event) {
    event.stopPropagation(); // 防止事件冒泡
    modal.style.display = 'flex';
};

closeModal.onclick = function (event) {
    event.stopPropagation(); // 防止事件冒泡
    modal.style.display = 'none';
};
// 获取更新日志模态框元素
const LogModal = document.getElementById('LogModal');
const tzcfsjIcon = document.getElementById('tzcfsj');
const LogCloseBtn = LogModal.querySelector('.close');
// 点击图标时显示更新日志模态框
tzcfsjIcon.onclick = function (event) {
    event.stopPropagation(); // 防止事件冒泡
    LogModal.style.display = 'flex';
};
// 点击关闭按钮时隐藏更新日志模态框
LogCloseBtn.onclick = function (event) {
    event.stopPropagation(); // 防止事件冒泡
    LogModal.style.display = 'none';
};
// 点击模态框外部时隐藏模态框
window.onclick = function (event) {
    if (event.target === LogModal) {
        LogModal.style.display = 'none';
    } else if (event.target === modal) {
        modal.style.display = 'none';
    } else if (event.target.id === 'qrCodeModal') {
        event.target.style.display = 'none';
        document.body.removeChild(event.target);
    }
};

// 轮播图
let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const dots = document.querySelectorAll('.dot');
const totalImages = images.length;
let interval;

function showImage(index) {
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = index;
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function startCarousel() {
    interval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % totalImages;
        showImage(nextIndex);
    }, 2000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(interval);
        showImage(parseInt(dot.dataset.index));
        startCarousel();
    });
});

startCarousel();

// 监听滚动事件，动态显示或隐藏返回顶部按钮
window.addEventListener('scroll', function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) { // 当滚动超过300px时显示
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});
// 点击返回顶部
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 添加诗词和一言刷新功能
document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refresh-btn');
    // 初始化加载诗词和一言
    loadJinrishici();
    loadHitokoto();

    // 刷新功能
    refreshBtn.addEventListener('click', function() {
        // 显示加载状态
        const jinrishiciSentence = document.querySelector("#jinrishici-sentence");
        const hitokotoText = document.querySelector("#hitokoto_text");
        const jinrishiciFrom = document.querySelector("#jinrishici-from");
        const hitokotoFrom = document.querySelector("#hitokoto-from");
        jinrishiciSentence.innerHTML = "正在加载今日诗词....";
        hitokotoText.innerHTML = ":D 获取中...";
        jinrishiciFrom.innerHTML = "";
        hitokotoFrom.innerHTML = "";
        // 重新加载诗词和一言
        loadJinrishici();
        loadHitokoto();
    });
    // 加载今日诗词
    function loadJinrishici() {
        if (typeof jinrishici !== 'undefined') {
            jinrishici.load(function(result) {
                var sentence = document.querySelector("#jinrishici-sentence");
                var from = document.querySelector("#jinrishici-from");
                sentence.innerHTML = result.data.content;
                from.innerHTML = '《' + result.data.origin.title + '》 - ' + result.data.origin.dynasty + '·' + result.data.origin.author;
            });
        }
    }
    // 加载一言
    function loadHitokoto() {
        fetch('https://v1.hitokoto.cn/')
            .then(response => response.json())
            .then(result => {
                const hitokotoText = document.querySelector("#hitokoto_text");
                const hitokotoFrom = document.querySelector("#hitokoto-from");
                hitokotoText.innerHTML = result.hitokoto;
                hitokotoFrom.innerHTML = result.from ? '「' + result.from + '」' : '';
            })
            .catch(() => {
                const hitokotoText = document.querySelector("#hitokoto_text");
                hitokotoText.innerHTML = "获取失败了呢...";
            });
    }
});