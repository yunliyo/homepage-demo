// webapp.js
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有底部导航项
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    // 获取所有页面内容
    const pages = document.querySelectorAll('.page-content');

    // 获取顶部导航按钮
    const backBtn = document.getElementById('backBtn');
    const homeBtn = document.getElementById('homeBtn');
    const navTitle = document.querySelector('.nav-center h1');

    // 页面标题映射
    const pageTitles = {
        'homePage': '狸庐',
        'servicesPage': '产品服务',
        'casesPage': '客户案例',
        'aboutPage': '关于我们'
    };

    // 轮播图功能
    const carouselTrack = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let carouselInterval;

    function goToSlide(slideIndex) {
        if (!carouselTrack) return;

        const totalSlides = indicators.length;
        currentSlide = (slideIndex + totalSlides) % totalSlides;

        // 移动轮播轨道
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // 更新指示器
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 自动播放
    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 3000); // 4秒切换一次
    }

    function stopCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
    }

    // 初始化轮播图
    if (carouselTrack && indicators.length > 0) {
        // 点击指示器切换
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopCarousel();
                startCarousel();
            });
        });

        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopCarousel();
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startCarousel();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                // 向左滑动，下一张
                nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // 向右滑动，上一张
                goToSlide(currentSlide - 1);
            }
        }

        // 启动自动播放
        startCarousel();
    }

    // 为每个底部导航项添加点击事件
    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            // 移除之前活动的导航项样式
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // 添加当前活动的导航项样式
            item.classList.add('active');

            // 获取目标页面ID
            const targetId = item.getAttribute('data-target');

            // 隐藏所有页面
            pages.forEach(page => {
                page.style.display = 'none';
            });

            // 显示目标页面
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.style.display = 'block';

                // 更新导航标题
                if (pageTitles[targetId]) {
                    navTitle.textContent = pageTitles[targetId];
                }
            }

            // 如果离开首页，暂停轮播图
            if (targetId === 'homePage') {
                startCarousel();
            } else {
                stopCarousel();
            }
        });
    });

    // 返回按钮功能
    backBtn.addEventListener('click', () => {
        // 切换到首页
        navItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 隐藏所有页面并显示首页
        pages.forEach(page => {
            page.style.display = 'none';
        });
        const homePage = document.getElementById('homePage');
        if (homePage) {
            homePage.style.display = 'block';
        }

        // 更新导航标题
        navTitle.textContent = pageTitles['homePage'];

        // 恢复轮播图
        startCarousel();
    });

    // 首页按钮功能
    homeBtn.addEventListener('click', () => {
        // 切换到首页
        navItems.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 隐藏所有页面并显示首页
        pages.forEach(page => {
            page.style.display = 'none';
        });
        const homePage = document.getElementById('homePage');
        if (homePage) {
            homePage.style.display = 'block';
        }

        // 更新导航标题
        navTitle.textContent = pageTitles['homePage'];

        // 恢复轮播图
        startCarousel();
    });
});