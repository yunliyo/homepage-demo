// index.js
Page({
  data: {
    nickname: '狸庐',
    buttons: [
      {text: '关于我们', navigateTo: '/pages/com/about/about'},
      {text: '产品服务', navigateTo: '/pages/com/serve/serve'},
      {text: '客户案例', navigateTo: '/pages/com/case/case'},
    ],
    yiyan: '做梦想做的事',
    copyright: `© 2015-${new Date().getFullYear()} by Yunli.`,
  },
  navigateTo: function(e) {
    wx.showLoading({
      title: '加载中...'
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 500);
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: () => {
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败，请稍后再试',
          icon: 'none'
        });
      }
    });
  },
  copyText: function(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: function() {
        wx.showToast({
          title: '账号名称已复制',
          icon: 'success'
        });
      }
    });
  },
  onShareAppMessage: function() {
    return {
      title: '狸庐',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
})