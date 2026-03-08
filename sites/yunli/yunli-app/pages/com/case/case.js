Page({
  data: {
    pageTitle: '客户案例',
    pageSubtitle: '精神自由，追求极致',
    stats: [
      { label: '服务客户', value: '1000+' },
      { label: '成功案例', value: '2000+' },
      { label: '客户满意度', value: '99%' },
      { label: '合作续约率', value: '90%' }
    ],
    icons: {
      quote: '/images/quote.png',
      star: '/images/star.png',
      arrow: '/images/arrow-right.png'
    },
    cases: [
      {
        id: 1,
        company: '武进区湖塘雨甜烘焙店',
        logo: '/images/user.png',
        industry: '互联网',
        industryType: 'internet',
        projectTitle: '云服务解决方案',
        projectDesc: '为腾讯提供全方位的云服务架构设计与实施，保障了业务的高可用性和可扩展性',
        reviewer: {
          name: '钱雨珂',
          title: '经营者'
        },
        review: '平仄云团队专业度很高，项目交付质量超出预期，不仅按时完成了任务，还为我们提供了很多优化建议，非常值得信赖的合作伙伴。',
        results: [
          '系统性能提升50%',
          '运维成本降低30%',
          '故障响应时间缩短至5分钟内'
        ]
      },
      {
        id: 2,
        company: '南京凌炬信息科技有限公司',
        logo: '/images/user.png',
        industry: '通信设备',
        industryType: 'communication',
        projectTitle: '企业数字化转型',
        projectDesc: '协助华为完成核心业务系统的数字化转型，提升整体运营效率和数据管理能力',
        reviewer: {
          name: '周圣君',
          title: '总经理'
        },
        review: '数字化转型过程中遇到的复杂问题，平仄云都能快速响应并提供专业的解决方案，项目推进顺利，效果显著。',
        results: [
          '业务流程优化60%',
          '数据管理效率提升80%',
          '员工满意度提升40%'
        ]
      },
      {
        id: 3,
        company: '玉环喵糖日用品商行',
        logo: '/images/user.png',
        industry: '电子商务',
        industryType: 'ecommerce',
        projectTitle: '电商平台技术升级',
        projectDesc: '对电商平台进行技术架构升级，提升系统稳定性和用户体验',
        reviewer: {
          name: '杨晓菲',
          title: '经营者'
        },
        review: '平仄云团队技术实力雄厚，在电商平台升级过程中展现了出色的专业能力，项目完成后各项指标均达到预期目标。',
        results: [
          '系统可用性提升至99.99%',
          '用户留存率提升25%',
          '交易成功率提升15%'
        ]
      },
      {
        id: 4,
        company: '温江修平网络技术工作室',
        logo: '/images/user.png',
        industry: '互联网',
        industryType: 'internet',
        projectTitle: '内容分发系统优化',
        projectDesc: '优化内容分发系统，提升内容推荐精准度和用户互动体验',
        reviewer: {
          name: '邹修平',
          title: '经营者'
        },
        review: '与平仄云合作非常愉快，他们对技术的理解和执行力都很强，项目成果完全符合我们的期望，后续还会继续合作。',
        results: [
          '推荐准确率提升35%',
          '用户活跃度提升45%',
          '内容消费时长增加30%'
        ]
      },
      {
        id: 5,
        company: '重庆吾声企业管理服务有限公司',
        logo: '/images/user.png',
        industry: '本地生活',
        industryType: 'lifestyle',
        projectTitle: '智能客服系统',
        projectDesc: '搭建智能客服系统，提升客户服务质量和响应效率',
        reviewer: {
          name: '邹余',
          title: '总经理'
        },
        review: '智能客服系统上线后，客户满意度大幅提升，服务效率显著改善，平仄云的专业能力让我们印象深刻。',
        results: [
          '问题解决率提升70%',
          '响应时间缩短至10秒内',
          '客户满意度提升至95%'
        ]
      },
      {
        id: 6,
        company: '三亚市崖州区心态互联网工作室',
        logo: '/images/user.png',
        industry: '电子商务',
        industryType: 'ecommerce',
        projectTitle: '供应链管理系统',
        projectDesc: '构建智能供应链管理系统，优化库存管理和物流配送效率',
        reviewer: {
          name: '容豪',
          title: '经营者'
        },
        review: '平仄云在供应链管理系统开发中表现出色，系统上线后库存周转率大幅提升，为我们节省了大量成本。',
        results: [
          '库存周转率提升50%',
          '配送准时率提升至98%',
          '运营成本降低25%'
        ]
      }
    ]
  },

  onLoad(options) {
    console.log('客户案例页面加载', options);
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: '客户案例'
    });
  },

  onCaseTap(e) {
    const caseId = e.currentTarget.dataset.id;
    console.log('查看案例详情', caseId);
    wx.showToast({
      title: '案例详情即将上线',
      icon: 'none'
    });
  },

  onShareAppMessage: function() {
    return {
      title: '狸庐的客户案例',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '狸庐的客户案例',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
});
