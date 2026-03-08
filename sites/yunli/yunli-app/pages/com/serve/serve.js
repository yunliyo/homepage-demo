Page({
  data: {
    // 页面配置
    pageConfig: {
      title: '产品服务',
      sections: {
        product: {
          title: '产品'
        },
        project: {
          title: '项目'
        },
        service: {
          title: '服务项目'
        }
      }
    },

    // 当前显示的轮播索引
    currentBanner: 0,

    // 顶部轮播图数据
    banners: [
      {
        id: 1,
        title: '诗词创作入门课程',
        description: '快速掌握诗词创作技巧',
        image: '/images/dream.png'
      },
      {
        id: 2,
        title: '网站建设入门课程',
        description: '快速掌握网站建设技巧',
        image: '/images/tobepoet.png'
      },
      {
        id: 3,
        title: 'DITA结构化写作方法',
        description: '技术文档工程师是如何养成的',
        image: '/images/recluse.png'
      }
    ],

    // 图标配置
    icons: {
      date: '/images/data.png',
      team: '/images/user.png',
      check: '/images/efficiency.png',
      arrow: '/images/forward.png'
    },

    products: [
      {
        id: 1,
        name: '诗词创作入门课程',
        description: '快速掌握诗词创作技巧',
        image: '/images/settings.png',
        tags: ['简洁', '通俗易懂', '免费']
      },
      {
        id: 2,
        name: '网站建设入门课程',
        description: '快速掌握网站建设技巧',
        image: '/images/settings.png',
        tags: ['简洁', '通俗易懂', '免费']
      },
      {
        id: 3,
        name: 'DITA结构化写作方法',
        description: '技术文档工程师是如何养成的',
        image: '/images/settings.png',
        tags: ['简洁', '通俗易懂', '免费']
      },{
        id: 4,
        name: 'IP周边盲盒',
        description: '韵狸的 IP 周边盲盒',
        image: '/images/settings.png',
        tags: ['简洁', '美观', '10元起']
      }
    ],
    projects: [
      {
        id: 1,
        name: '诗词创作入门课程',
        intro: '快速掌握诗词创作技巧',
        date: '2024-2025',
        team: '1人',
        status: 'completed',
        statusText: '已完成'
      },
      {
        id: 2,
        name: '网站建设入门课程',
        intro: '快速掌握网站建设技巧',
        date: '2023-2024',
        team: '1人',
        status: 'completed',
        statusText: '已完成'
      },
      {
        id: 3,
        name: 'DITA结构化写作方法',
        intro: '技术文档工程师是如何养成的',
        date: '2022-2023',
        team: '1人',
        status: 'completed',
        statusText: '已完成'
      },
      {
        id: 4,
        name: 'onelink',
        intro: '对标 linktr.ee 开发的个人主页',
        date: '2018-',
        team: '1人',
        status: 'progress',
        statusText: '进行中'
      }
    ],
    services: [
      {
        id: 1,
        name: '定制开发',
        icon: '/images/settings.png',
        description: '根据个人或企业需求定制专属软件解决方案',
        features: ['需求分析', '系统设计', '开发实施', '售后支持']
      },
      {
        id: 2,
        name: '技术咨询',
        icon: '/images/settings.png',
        description: '专业技术团队提供全方位技术咨询服务',
        features: ['架构设计', '性能优化', '安全审计', '技术培训']
      },
      {
        id: 3,
        name: '系统集成',
        icon: '/images/settings.png',
        description: '多系统整合，实现数据互通共享',
        features: ['接口开发', '数据迁移', '流程优化', '系统维护']
      },
      {
        id: 4,
        name: '运维服务',
        icon: '/images/settings.png',
        description: '7x24小时系统运维与监控保障',
        features: ['实时监控', '故障处理', '备份恢复', '性能调优']
      },
      {
        id: 5,
        name: '云服务',
        icon: '/images/settings.png',
        description: '云平台部署与管理，灵活扩展',
        features: ['云迁移', '容器化', '自动扩容', '安全防护']
      },
      {
        id: 6,
        name: '培训服务',
        icon: '/images/settings.png',
        description: '专业培训课程，提升团队能力',
        features: ['定制课程', '现场培训', '在线学习', '考核认证']
      }
    ]
  },

  onLoad(options) {
    // 页面加载
  },

  onBannerChange(e) {
    this.setData({
      currentBanner: e.detail.current
    });
  },

  onBannerTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '做一个热爱技术的诗人',
      icon: 'none'
    });
  },

  onProjectTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '做一个热爱技术的诗人',
      icon: 'none'
    });
    // 可以跳转到项目详情页
    // wx.navigateTo({
    //   url: `/pages/index/project-detail/project-detail?id=${id}`
    // });
  },

  onServiceTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '做一个热爱技术的诗人',
      icon: 'none'
    });
    // 可以跳转到服务详情页
    // wx.navigateTo({
    //   url: `/pages/index/service-detail/service-detail?id=${id}`
    // });
  },
  onShareAppMessage: function() {
    return {
      title: '狸庐的产品服务',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐的产品服务',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
});
