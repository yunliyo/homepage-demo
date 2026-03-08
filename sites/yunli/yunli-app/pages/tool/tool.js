Page({
  data: {
    iconNavTitle: '快捷功能',
    cardTitle: '热门工具',
    // 轮播图数据
    banners: [
      { id: 1, image: '/images/tobepoet.png', title: 'AI智能助手' },
      { id: 2, image: '/images/dream.png', title: '创意工坊' },
      { id: 3, image: '/images/recluse.png', title: '生活工具箱' }
    ],
    // 图标导航数据
    iconNavs: [
      { id: 1, icon: '/images/microchip-solid.png', name: '翻译助手', page: '/pages/index/tool/translate/translate' },
      { id: 2, icon: '/images/microchip-solid.png', name: '实用计算器', page: '/pages/index/tool/calculator/calculator' },
      { id: 3, icon: '/images/microchip-solid.png', name: '韵律检测', page: '/pages/index/tool/calculator/calculator' },
      { id: 4, icon: '/images/microchip-solid.png', name: '繁简转换', page: '/pages/index/tool/calculator/calculator' }
    ],
    // 卡片数据
    cards: [
      { id: 1, image: '/images/microchip-solid.png', title: '日程管理', desc: '高效管理你的时间', page: '/pages/index/tool/schedule/schedule' },
      { id: 2, image: '/images/microchip-solid.png', title: '笔记备忘', desc: '记录你的灵感', page: '/pages/index/tool/note/note' },
      { id: 3, image: '/images/microchip-solid.png', title: '待办清单', desc: '任务管理神器', page: '/pages/index/tool/todo/todo' },
      { id: 4, image: '/images/microchip-solid.png', title: '天气查询', desc: '实时天气信息', page: '/pages/index/tool/weather/weather' },
      { id: 5, image: '/images/microchip-solid.png', title: '汇率换算', desc: '汇率实时更新', page: '/pages/index/tool/exchange/exchange' },
      { id: 6, image: '/images/microchip-solid.png', title: '二维码生成', desc: '快速生成二维码', page: '/pages/index/tool/qrcode/qrcode' },
      { id: 7, image: '/images/microchip-solid.png', title: '工具蛙', desc: '有趣的工具集合站', appId: 'wx4f77a8cce87fcdba', path: 'pages/index/index' },
    ]
  },

  // 轮播图点击
  onBannerTap(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击轮播图:', item.title);
  },

  // 图标导航点击
  onIconNavTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item.page) {
      wx.navigateTo({
        url: item.page,
        fail: () => {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          });
        }
      });
    }
  },

  // 卡片点击
  onCardTap(e) {
    const item = e.currentTarget.dataset.item;
    // 跳转小程序
    if (item.appId) {
      wx.navigateToMiniProgram({
        appId: item.appId,
        path: item.path || '',
        extraData: item.extraData || {},
        envVersion: item.envVersion || 'release',
        success(res) {
          console.log('跳转小程序成功', res);
        },
        fail(res) {
          wx.showToast({
            title: '打开失败',
            icon: 'none'
          });
          console.error('跳转小程序失败', res);
        }
      });
    } else if (item.page) {
      // 跳转内部页面
      wx.navigateTo({
        url: item.page,
        fail: () => {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          });
        }
      });
    }
  },
  onShareAppMessage: function() {
    return {
      title: '狸庐的工具箱',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐的工具箱',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
});
