// 加载配置文件
fetch('./config.json')
    .then(response => response.json())
    .then(config => {
        document.getElementById('siteTitle').textContent = config.siteTitle;
        document.getElementById('siteIcon').setAttribute('href', config.siteIcon);
        document.getElementById('avatar').setAttribute('src', config.avatar);
        document.getElementById('h1Title').textContent = config.h1Title;
        document.getElementById('h2Title').textContent = config.h2Title;
        const linksContainer = document.getElementById('linksContainer');
        config.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.title = link.title;
            linkElement.href = link.href;
            linkElement.target = link.target;
            linkElement.classList.add('btn');
            linkElement.textContent = link.title;
            if (link.type === 'qrcode') {
                linkElement.setAttribute('data-qrcode', link.href);
                linkElement.classList.add('btn-qr');
            }
            linksContainer.appendChild(linkElement);
        });
        const btnCount = config.btnCount;
        const existingBtns = document.querySelectorAll('.btn');
        if (existingBtns.length < btnCount) {
            for (let i = existingBtns.length; i < btnCount; i++) {
                const newBtn = document.createElement('a');
                newBtn.title = `按钮 ${i + 1}`;
                newBtn.href = '#';
                newBtn.target = '_blank';
                newBtn.classList.add('btn');
                newBtn.textContent = `按钮 ${i + 1}`;
                linksContainer.appendChild(newBtn);
            }
        }
        document.querySelectorAll('.btn-qr').forEach(function (btn) {
            btn.onclick = function (e) {
                e.preventDefault();
                const qrcodeSrc = this.getAttribute('data-qrcode');
                if (qrcodeSrc) {
                    showModal(qrcodeSrc);
                }
            };
        });
        document.getElementById('copyright').innerHTML = `&copy; 2014-${new Date().getFullYear()} by <a href="https://www.liqiang.info" target="_blank">Yunli</a>.`;
        const socialIconsContainer = document.getElementById('socialicons');
        config.socialIcons.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.classList.add('social-icon');
            const imgElement = document.createElement('img');
            imgElement.src = icon.icon;
            imgElement.alt = icon.title;
            iconElement.appendChild(imgElement);
            iconElement.innerHTML = `<i class="${icon.icon}"></i>`;
            if (icon.type === 'link') {
                iconElement.onclick = function () {
                    window.open(icon.href, icon.target);
                };
            } else if (icon.type === 'qrcode') {
                iconElement.onclick = function () {
                    showModal(icon.href);
                };
            }
            socialIconsContainer.appendChild(iconElement);
        });
        const linksContainerI18n = document.getElementById('linksContainer-i18n');
        config['linksContainer-i18n'].forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.title = link.title;
            linkElement.href = link.href;
            linkElement.target = link.target;
            linkElement.classList.add('btn');
            linkElement.textContent = link.title;
            if (link.type === 'qrcode') {
                linkElement.setAttribute('data-qrcode', link.href);
                linkElement.classList.add('btn-qr');
                linkElement.onclick = function (e) {
                    e.preventDefault();
                    const qrcodeSrc = this.getAttribute('data-qrcode');
                    if (qrcodeSrc) {
                        showModal(qrcodeSrc);
                    }
                };
            }
            linksContainerI18n.appendChild(linkElement);
        });
        const linksContainerOther = document.getElementById('linksContainer-other');
        config['linksContainer-other'].forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.title = link.title;
            linkElement.href = link.href;
            linkElement.target = link.target;
            linkElement.classList.add('btn');
            linkElement.textContent = link.title;
            if (link.type === 'qrcode') {
                linkElement.setAttribute('data-qrcode', link.href);
                linkElement.classList.add('btn-qr');
                linkElement.onclick = function (e) {
                    e.preventDefault();
                    const qrcodeSrc = this.getAttribute('data-qrcode');
                    if (qrcodeSrc) {
                        showModal(qrcodeSrc);
                    }
                };
            }
            linksContainerOther.appendChild(linkElement);
        });
    })
    .catch(error => console.error('Error loading config:', error));

// 加载 XML 配置文件
fetch('./config.xml')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        document.getElementById('h3_1Title').textContent = data.getElementsByTagName('h3_1Title')[0].textContent;
        document.getElementById('h3_2Title').textContent = data.getElementsByTagName('h3_2Title')[0].textContent;
        document.getElementById('h3_3Title').textContent = data.getElementsByTagName('h3_3Title')[0].textContent;
    })
    .catch(error => console.error('Error loading config.xml:', error));

// 加载 YAML 配置文件
fetch('./config.yml')
    .then(response => response.text())
    .then(yaml => {
        const config = jsyaml.load(yaml);
        document.getElementById('beianInfo').innerHTML = `
            <a href="${config.beianInfo[0].href}" target="${config.beianInfo[0].target}" class="${config.beianInfo[0].type}">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAFoUExURQAAAOUwAOc4AOUmAOg2AN8bAOs+AO1EAPBOAPFPAOxBAOQqAN8gAOxIAPJRAPZWAPVUAPNTAPBOAO1HAOo/ABmJ0QCG3wB4zwB2zuk9APFQAPpdAPJOAOpAAOtFAO1IAPNTAP9dAP9lAPJSAO9FAAB80v9JAP8AAPpgAP9sAPhdAPVVAPJPAAB40ABuxQBqwO9QAP9vAPZZAACK3+pCAP8zADC7+jiy5/9sAPZlCRKa5gOV6gCB2AB1z+9KABSx6xut9hGk8wmb7wOY7ug2AOsxAOo/APFFAPJTAPBOAO9IAOk9AN9AAOxDAPBMAPBOAOs/AOMsAOAjAOg0AO1BAO9AAOQwAOUwAOUuAOQrAOtBAOIiAPFOAPBOAO9LAO1HAPNTAPVVAO1EAPRVAPdZAAB2zQBqwPteAO9MAAByyQBnu/lcAPVWAPpdAP9xAP5kAACC2wB2zgCL4u1FAPhZAOIjAOImAP///43JhIkAAABZdFJOUwCfQK/vMI/PitaqVRBgdaqqqqra35rPVRpQj4+GMBpV9ws1YDBKBwEw70q0ip/6NRCTcDBVBXCsVVimtHUwTw2qqqpKzxpVJaOpqpoQ35r+z3V1zysQcO+K5D4CqAAAAAFiS0dEd0Zk+dcAAAAHdElNRQfoCxwRMQJua0WgAAAAyUlEQVQI12NgAAFGJoZIZgYkEAXELAzRrBAeGzsHZ0xsXDwXNw9EgJcvIZFfQFBIWERUTFyCQTJJKjlFGiQhEy/LkJrGICevkJLOoKjEwKCcoaKamcWgpp6YrcGgycCgpa3DoKunzxBlkJOrwZBnmJ9uZFxQCNRpYgpUYWZuYWllXWRjCzLLDmSGvYOjkzPEUsliqeQSaQjbBUS4urnHJORoC3h4enn7QF3q6+cfE5sRHxAYBPVJMEMIkAxlKGWFey4snCGiDMIEANEhIvkETajNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTExLTI4VDE3OjQ5OjAyKzAwOjAwfrjvKwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0xMS0yOFQxNzo0OTowMiswMDowMA/lV5cAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMTEtMjhUMTc6NDk6MDIrMDA6MDBY8HZIAAAAAElFTkSuQmCC" alt="beian icon" width="20px" height="20px" />
                ${config.beianInfo[0].title}
            </a>
        `;
        document.getElementById('beianInfo2').innerHTML = `
            <a href="${config.beianInfo2[0].href}" target="${config.beianInfo2[0].target}" class="${config.beianInfo2[0].type}">
                <img src="data:image/png;base64,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" alt="beian icon" width="20px" height="20px" />
                ${config.beianInfo2[0].title}
            </a>
        `;
    })
    .catch(error => console.error('Error loading config.yml:', error));

// 导航栏
document.addEventListener('DOMContentLoaded', function () {
    const navbarLinks = document.querySelectorAll('#navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.classList.contains('external-link')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// 特殊日期当天自动变灰色，以示悼念
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

// 模态框二维码
function showModal(imgSrc) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.zIndex = '1000';
    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.style.display = 'flex';
    imgContainer.style.justifyContent = 'center';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.padding = '5px';
    imgContainer.style.border = '1px solid #000000';
    imgContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxWidth = '300px';
    img.style.maxHeight = '300px';
    img.style.cursor = 'pointer';
    imgContainer.appendChild(img);

    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '1px';
    closeButton.style.right = '1px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '30px';
    closeButton.style.fontWeight = 'bolder';
    closeButton.style.color = '#ff2121';
    closeButton.addEventListener('click', function () {
        document.body.removeChild(modal);
    });
    imgContainer.appendChild(closeButton);
    modal.appendChild(imgContainer);

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}