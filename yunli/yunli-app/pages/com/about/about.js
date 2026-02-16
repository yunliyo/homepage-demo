Page({
  data: {
    aboutData: {}
  },

  onLoad(options) {
    this.loadAboutData();
  },

  loadAboutData() {
    const data = {
      title: '关于我们',
      intro: '狸庐始创于2018年7月，是由独立开发者韵狸打造的诗意平台，旗下品牌有“平仄云”、“零一云”和“ZeroneRhyme Cloud”，致力于提升全民诗词创作水平；同时也是一家致力于推动企业数字化转型的创新型科技工作室，专注于大数据、云计算及科技解决方案的研发与应用，为客户提供从网站建设到品牌打造的全方位服务。凭借前沿的技术实力和深厚的行业洞察，助力企业优化运营效率、提升市场竞争力，携手共创智能未来。',
      missionVisionTitle: '使命与愿景',
      missionVision: [{
          icon: '/images/mission.png',
          title: '使命',
          content: '提升全民诗词创作水平'
        },
        {
          icon: '/images/vision.png',
          title: '愿景',
          content: '我们致力于使用最简洁的学习方法，帮助每一个人学会诗词创作，实现华夏民族伟大复兴。'
        }
      ],
      historyTitle: '发展历程',
      history: [
        {
          year: new Date().getFullYear().toString(),
          desc: '持续运营，艰难前行'
        },
        {
          year: '……',
          desc: '……'
        },
        {
          year: '2018',
          desc: '团队创立，开启创业征程'
        }
      ],
      cultureTitle: '企业文化',
      culture: [{
          icon: '/images/efficiency.png',
          text: '追求高效'
        },
        {
          icon: '/images/data.png',
          text: '数据驱动'
        },
        {
          icon: '/images/user.png',
          text: '用户至上'
        },
        {
          icon: '/images/open.png',
          text: '开放包容'
        },
        {
          icon: '/images/owner.png',
          text: '主人意识'
        },
        {
          icon: '/images/forward.png',
          text: '始终前进'
        },
        {
          icon: '/images/growth.png',
          text: '不断成长'
        },
        {
          icon: '/images/social.png',
          text: '社会责任'
        }
      ],
      contactTitle: '联系我们',
      contact: [{
          label: '团队地址：',
          value: '重庆市渝中区华福巷36号'
        },
        {
          label: '邮政编码：',
          value: '400015'
        },
        {
          label: '联系电话：',
          value: '+86 13896074726'
        },
        {
          label: '电子邮箱：',
          value: 'yunliyo@foxmail.com'
        },
        {
          label: '官方微信：',
          value: 'yunliyo101'
        },
        {
          label: '官方网站：',
          value: 'www.liqiang.info'
        }
      ]
    };
    this.setData({
      aboutData: data
    });
  },
  onShareAppMessage: function() {
    return {
      title: '关于狸庐',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '关于狸庐',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
})