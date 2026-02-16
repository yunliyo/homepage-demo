Page({
  data: {
    // 轮播图
    swiperList: [
      {
        id: 1,
        image: '/images/dream.png',
        title: '做梦想做的事'
      },
      {
        id: 2,
        image: '/images/recluse.png',
        title: '君子大隐隐于菜市场'
      },
      {
        id: 3,
        image: '/images/tobepoet.png',
        title: '馀事做诗人'
      }
    ],
    // 技术服务
    title: '技术服务项目',
    products: [
      {
        id: 1,
        icon: '/images/pen-nib-solid.png',
        title: '设计',
        desc: '视觉设计、交互设计'
      },
      {
        id: 2,
        icon: '/images/product-hunt-brands.png',
        title: '产品',
        desc: '产品原型设计'
      },
      {
        id: 3,
        icon: '/images/microchip-solid.png',
        title: '技术',
        desc: '开发、测试、运维、技术支持'
      },{
        id: 4,
        icon: '/images/pen-to-square-solid.png',
        title: '运营',
        desc: '新媒体运营'
      }
    ],
    // 文化服务
    title2: '文化服务项目',
    products2: [
      {
        id: 1,
        icon: '/images/market.png',
        title: '市场',
        desc: '市场营销推广'
      },
      {
        id: 2,
        icon: '/images/sale.png',
        title: '销售',
        desc: '自营商品、代理商品'
      },
      {
        id: 3,
        icon: '/images/law.png',
        title: '法务',
        desc: '知识产权服务'
      },{
        id: 4,
        icon: '/images/tax.png',
        title: '财税',
        desc: '财务、税务'
      }
    ],
    // 诗社简介
    intro_poem: {
      title: '诗词书画院',
      features: [
        {
          id: 1,
          icon: '/images/pen-nib-solid.png',
          title: '诗歌创作',
          desc: '定期组织诗歌创作活动'
        },
        {
          id: 2,
          icon: '/images/salon.png',
          title: '诗歌沙龙',
          desc: '每月一次的诗歌交流活动'
        },
        {
          id: 3,
          icon: '/images/book.png',
          title: '诗刊出版',
          desc: '每年出版两期诗社刊物'
        },{
          id: 4,
          icon: '/images/other.png',
          title: '诗词教学',
          desc: '诗词联赋创作入门教学'
        }
      ]
    },
    // 公益服务项目简介
    intro_love: {
      title: '公益服务项目',
      features: [
        {
          id: 1,
          icon: '/images/agriculture.png',
          title: '支农',
          desc: '科普和推广智慧农业'
        },
        {
          id: 2,
          icon: '/images/course.png',
          title: '支教',
          desc: '科普和推广智慧教育'
        },
        {
          id: 3,
          icon: '/images/hospital.png',
          title: '支医',
          desc: '科普和推广智慧医疗'
        },{
          id: 4,
          icon: '/images/loving-heart.png',
          title: '扶贫',
          desc: '爱心助残，实现共同富裕'
        }
      ]
    },
    // 成员名单
    members: [
      {
        id: 1,
        name: '韵狸',
        gender: '男',
        birth: '1997-03-24',
        hometown: '重庆',
        role: '队长'
      },
      {
        id: 2,
        name: '寸里子',
        gender: '女',
        birth: '1998-08-20',
        hometown: '上海',
        role: '副队长'
      },
      {
        id: 3,
        name: '步棋晟',
        gender: '男',
        birth: '1998-11-03',
        hometown: '广州',
        role: '成员'
      },
      {
        id: 4,
        name: '离儿',
        gender: '女',
        birth: '1995-02-28',
        hometown: '重庆',
        role: '成员'
      },
      {
        id: 5,
        name: '沉沦',
        gender: '男',
        birth: '1993-07-10',
        hometown: '成都',
        role: '成员'
      },
      {
        id: 6,
        name: 'MORE',
        role: '成员'
      }
    ],
    // 关于我们
    aboutUs: {
      title: '关于我们',
      content: '狸庐始创于2018年7月，是由独立开发者韵狸打造的诗意平台。',
      address: '中国重庆市渝中区大溪沟街道华福巷36号',
      phone: '13896074726',
      email: 'yunliyo@foxmail.com'
    },
    yiyan: "做梦想做的事",
    copyright: "© 2015-".concat(new Date().getFullYear(), " by Yunli.")
  },

  // 拨打电话
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.aboutUs.phone
    })
  },

  // 发送邮件
  sendEmail: function() {
    wx.setClipboardData({
      data: this.data.aboutUs.email,
      success: function() {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        })
      }
    })
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: '狸庐工作室',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐工作室',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
})