// APlayer
const ap = new APlayer({
    container: document.getElementById('aplayer2'),
    fixed: false,
    mini: false,
    autoplay: false,
    theme: '#e9e9e9',
    loop: 'all',
    order: 'list',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [{
        name: '卜算子·梦也去无痕',
        artist: '楚凌岚',
        url: './static/卜算子·梦也去无痕.mp3',
        cover: './img/xssp.jpg',
        lrc: './static/null.lrc',
        type: 'normal'
    },{
        name: 'Que Sera Sera',
        artist: 'Doris Day',
        url: './static/Que Sera Sera.mp3',
        cover: './img/xssp.jpg',
        lrc: './static/null.lrc',
        type: 'normal'
    },{
        name: '三国杀',
        artist: '汪苏泷',
        url: './static/三国杀.mp3',
        cover: './img/xssp.jpg',
        lrc: './static/null.lrc',
        type: 'normal'
    },{
        name: '英雄杀',
        artist: '陈楚生',
        url: './static/英雄杀.mp3',
        cover: './img/xssp.jpg',
        lrc: './static/null.lrc',
        type: 'normal'
    },{
        name: 'bgm',
        artist: 'null',
        url: './static/15s-bgm.mp3',
        cover: './img/xssp.jpg',
        lrc: './static/null.lrc',
        type: 'normal'
    }]
});
// 等待 DOM 加载完成再初始化
document.addEventListener('DOMContentLoaded', function() {
    const colorThief = new ColorThief();
    const image = new Image();
    const xhr = new XMLHttpRequest();
    const setTheme = (index) => {
        if (!ap.list.audios[index].theme && ap.list.audios[index].cover) {
            xhr.onload = function () {
                let coverUrl = URL.createObjectURL(this.response);
                image.onload = function () {
                    let color = colorThief.getColor(image);
                    ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                    URL.revokeObjectURL(coverUrl)
                };
                image.src = coverUrl;
            }
            xhr.open('GET', ap.list.audios[index].cover, true);
            xhr.responseType = 'blob';
            xhr.send();
        }
    };
    // 初始化主题
    setTheme(ap.list.index);
    ap.on('listswitch', (data) => {
        setTheme(data.index);
    });
});