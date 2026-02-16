docute.init({
    home: './README.md',
    landing: 'landing.html',
    debug: true,
    repo: 'yunliyo',
    twitter: 'yunliyo',
    'edit-link': 'https://github.com/yunliyo',
    toc: './toc.md',
    tocVisibleDepth: 3,
    nav: [{
            title: '首页',
            path: '/'
        },
        {
            title: '关于',
            path: '/about'
        },
        {
            title: 'GitHub',
            path: 'https://github.com/yunliyo'
        }
    ],
    plugins: [
        evanyou(),
    ]
})