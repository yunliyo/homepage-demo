/* ============================================
   主JavaScript文件
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 导航栏滚动效果 ---- */
  const header = $('#header');
  const backToTop = $('#backToTop');

  window.addEventListener('scroll', throttle(() => {
    const scrollY = getScrollY();

    // 导航栏阴影
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 返回顶部按钮
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // 导航高亮
    updateActiveNav();
  }, 100));

  /* ---- 移动端菜单 ---- */
  const menuToggle = $('#menuToggle');
  const nav = $('#nav');

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);

  // 点击导航链接关闭菜单
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ---- 导航高亮 ---- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (getScrollY() >= sectionTop && getScrollY() < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  /* ---- 数字递增动画 ---- */
  const statNumbers = $$('[data-count]');
  let statsAnimated = false;

  function checkStats() {
    if (statsAnimated) return;
    const statsSection = $('#about');
    if (statsSection && isInViewport(statsSection)) {
      statsAnimated = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateNumber(el, target, 2000);
      });
    }
  }

  window.addEventListener('scroll', throttle(checkStats, 200));
  checkStats(); // 初始检测

  /* ---- 联系表单 ---- */
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // 移除旧消息
      const oldMsg = $('.form-message', this);
      if (oldMsg) oldMsg.remove();

      // 模拟提交
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // 显示成功消息
        const msgEl = document.createElement('div');
        msgEl.className = 'form-message success';
        msgEl.textContent = '感谢您的留言，我们会尽快与您联系！';
        this.appendChild(msgEl);

        // 重置表单
        this.reset();

        // 3秒后自动隐藏消息
        setTimeout(() => msgEl.remove(), 5000);
      }, 1500);
    });
  }

  /* ---- 平滑滚动 ---- */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = $(targetId);
      if (target) {
        // header 已在 utils closeMenu 之后, 或是在此处理
      }
    });
  });

  /* ---- 返回顶部 ---- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- 滚动动画：元素入场 ---- */
  const animatedElements = $$('.product-card, .case-card, .stat-item, .contact-item');

  function checkAnimations() {
    animatedElements.forEach((el, i) => {
      if (isInViewport(el, 80) && !el.classList.contains('animated')) {
        el.classList.add('animated');
        el.style.animation = `fadeInUp 0.6s ease ${i * 0.1}s both`;
      }
    });
  }

  window.addEventListener('scroll', throttle(checkAnimations, 150));
  checkAnimations();
});
