// index.js
Page({
  data: {
    cardData: {
      Name: "Yunli",
      Gender: "Male",
      Birthday: "19970324",
      Title: "Developer",
      QQ: "1598712209",
      Weixin: "yunliyo101",
      Phone: "+86 13896074726",
      Email: "yunliyo@foxmail.com",
      Website: "liqiang.info",
    },
    formattedJson: "",
    lineNumbers: [],
    showCursor: !0,
    textContent: '狸庐始创于2018年7月，是由独立开发者韵狸打造的诗意平台.',
    name: '韵狸',
    company: '自由职业',
    position: '独立开发者 & 诗人',
    description: '一个热爱诗词书画的程序员。',
    contacts: [
      { label: 'QQ', value: '1598712209' },
      { label: '微信', value: 'yunliyo101' },
      { label: '电话', value: '13896074726' },
      { label: '邮箱', value: 'yunliyo@foxmail.com' },
      { label: '地址', value: '中国重庆市渝中区大溪沟街道华福巷36号' },
      { label: '邮编', value: '400013' }
    ],
    producttitle: '产品',
    product: {
      name: 'IP周边定制',
      price: '10元起',
      desc: '包括不限于保温杯、雨伞、抱枕、笔、笔记本、鼠标垫、手机壳、帆布手提袋',
      title: '我的优势',
      features: [
        '十年以上创作经验',
        '五年以上 ICT 工作经验',
      ],
    },
    mediatitle: '社交媒体',
    mediaList: [
      { id: 1, name: '狸庐网', icon: '/images/navlogo2.png', copyURL: 'https://www.liqiang.info'},
      { id: 2, name: '微信公众号', icon: '/images/navlogo.png', copyText: '狸庐'},
    ],
    yiyan: "做梦想做的事",
    copyright: "© 2015-".concat(new Date().getFullYear(), " by Yunli.")
  },
  onLoad: function () {
    this.formatJson(), this.startCursorAnimation();
  },
  formatJson: function () {
    const entries = Object.entries(this.data.cardData);
    const jsonLines = [
      { text: "{", hasComma: false },
      ...entries.map(([key, value], index) => ({
        text: `  "${key}": "${value}"${index < entries.length - 1 ? "," : ""}`,
        hasComma: index < entries.length - 1
      })),
      { text: "}", hasComma: false }
    ];
    
    this.setData({
      jsonLines: jsonLines,
      lineNumbers: Array.from({ length: jsonLines.length }, (_, i) => i + 1)
    });
  },
  startCursorAnimation: function () {
    var e = this;
    this.cursorInterval = setInterval(function () {
      e.setData({
        showCursor: !e.data.showCursor
      });
    }, 500);
  },
  onUnload: function () {
    clearInterval(this.cursorInterval);
  },
  copyText: function(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 1000
        });
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 1000
        });
      }
    });
  },
  handleCopy: function(e) {
    const item = e.currentTarget.dataset.item;
    const textToCopy = item.copyText || item.copyURL;
    const successMessage = item.copyText ? '账号名称已复制' : '主页链接已复制';
    wx.setClipboardData({
      data: textToCopy,
      success: () => {
        wx.showToast({
          title: successMessage,
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  onShareAppMessage: function() {
    return {
      title: '狸庐的个人名片',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐的个人名片',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
})