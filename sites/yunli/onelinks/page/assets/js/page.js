// 分页链接数据 - 可以根据需要修改这些链接
const linksData = [
    { title: "过眼溪山，旧时曾识", url: "./articles/introduction/index.html" },
    { title: "写代码是是热爱，写诗词是热爱，写到宇宙充满爱", url: "./articles/garden/index.html" },
    { title: "新项目二", url: "#" },
    { title: "新项目三", url: "#" },
    { title: "新项目四", url: "#" },
    { title: "新项目五", url: "#" },
    { title: "新项目六", url: "#" },
    { title: "新项目七", url: "#" },
    { title: "新项目八", url: "#" },
    { title: "新项目九", url: "#" },
    { title: "新项目十", url: "#" },
    { title: "新项目十一", url: "#" },
    { title: "新项目十二", url: "#" },
    { title: "新项目十三", url: "#" },
    { title: "新项目十四", url: "#" },
    { title: "新项目十五", url: "#" },
    { title: "新项目十六", url: "#" },
    { title: "新项目十七", url: "#" },
    { title: "新项目十八", url: "#" },
    { title: "新项目十九", url: "#" },
    { title: "新项目二十", url: "#" },
    { title: "新项目二十一", url: "#" },
    { title: "新项目二十二", url: "#" },
    { title: "新项目二十三", url: "#" },
    { title: "新项目二十四", url: "#" },
    { title: "新项目二十五", url: "#" },
    { title: "新项目二十六", url: "#" },
    { title: "新项目二十七", url: "#" },
    { title: "新项目二十八", url: "#" },
    { title: "新项目二十九", url: "#" },
    { title: "新项目三十", url: "#" }
];

let currentPage = 1;
const itemsPerPage = 20;

// 渲染当前页的链接
function renderPage(page) {
    const linksContainer = document.querySelector('.links');
    const totalPages = Math.ceil(linksData.length / itemsPerPage);
    
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    currentPage = page;
    
    // 计算当前页的数据范围
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, linksData.length);
    const currentItems = linksData.slice(startIndex, endIndex);
    
    // 清空容器并渲染当前页的链接
    linksContainer.innerHTML = '';
    currentItems.forEach(item => {
        const linkElement = document.createElement('a');
        linkElement.className = 'link-item';
        linkElement.href = item.url;
        linkElement.target = '_self';
        linkElement.textContent = item.title;
        linksContainer.appendChild(linkElement);
    });
    
    // 更新分页控件
    renderPagination(totalPages);
}

// 渲染分页控件
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // 上一页按钮
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.className = 'page-btn';
        prevButton.textContent = '上一页';
        prevButton.addEventListener('click', () => renderPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    }
    
    // 页码按钮
    let startPage, endPage;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = Math.max(1, currentPage - 2);
        endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage === 1) {
            endPage = 5;
        } else if (endPage === totalPages) {
            startPage = totalPages - 4;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => renderPage(i));
        paginationContainer.appendChild(pageButton);
    }
    
    // 下一页按钮
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.className = 'page-btn';
        nextButton.textContent = '下一页';
        nextButton.addEventListener('click', () => renderPage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    renderPage(1);
});