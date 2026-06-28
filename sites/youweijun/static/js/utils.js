/* ============================================
   工具函数
   ============================================ */

/**
 * 节流函数
 * @param {Function} fn - 需要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 防抖函数
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 选择器快捷方法
 * @param {string} selector - CSS 选择器
 * @param {Element} context - 上下文元素
 * @returns {Element|null}
 */
function $(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * 选择器（全部）快捷方法
 * @param {string} selector - CSS 选择器
 * @param {Element} context - 上下文元素
 * @returns {NodeList}
 */
function $$(selector, context) {
  return (context || document).querySelectorAll(selector);
}

/**
 * 判断元素是否在视口中可见
 * @param {Element} el - 目标元素
 * @param {number} offset - 偏移量
 * @returns {boolean}
 */
function isInViewport(el, offset = 100) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight + offset &&
    rect.bottom >= -offset
  );
}

/**
 * 数字递增动画
 * @param {Element} el - 目标元素
 * @param {number} target - 目标数字
 * @param {number} duration - 动画时长（毫秒）
 */
function animateNumber(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * easeOut);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/**
 * 获取当前滚动位置
 * @returns {number}
 */
function getScrollY() {
  return window.pageYOffset || document.documentElement.scrollTop;
}
