// 音乐播放功能
function playMusic() {
    const audio = document.getElementById('au');
    const musicBtn = document.getElementById('mb');
    
    if (audio.paused) {
        audio.play();
        musicBtn.innerHTML = '🎵'; // 播放状态图标
    } else {
        audio.pause();
        musicBtn.innerHTML = '🎵'; // 暂停状态图标，也可以换成暂停图标
    }
}

// 切换主题功能
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        body.style.backgroundColor = '#f5f5f5';
        body.style.color = '#333';
    } else {
        body.setAttribute('data-theme', 'dark');
        body.style.backgroundColor = '#2c2c2c';
        body.style.color = '#e0e0e0';
    }
}

// 更新时钟功能
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const timeString = now.toLocaleTimeString('zh-CN', { 
        hour12: false,
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    clockElement.textContent = timeString;
}

// 页面加载完成后初始化时钟
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
});