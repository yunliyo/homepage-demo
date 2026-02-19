//index.js
Page({
  data: {
    personalInfo: {
      name: '韵狸',
      gender: '男',
      education: '大专',
      university: '重庆城市管理职业大学',
      phone: '13896074726',
      email: 'yunliyo@foxmail.com',
      city: '重庆',
      summary: '华为认证物联网高级工程师'
    },
    education: [
      { school: '重庆城市管理职业大学', major: '物联网应用技术', degree: '大专', time: '2015-2018' }
    ],
    researchInterests: {
      summary: '我的研究主要集中在智能早教机领域，主要关注对幼儿进行诗词联赋启蒙的应用。',
      tags: ['深度学习', '计算机视觉', '医疗图像分析', '机器学习']
    },
    publications: [
      {
        title: '基于深度学习的儿童诗词学习系统',
        journal: 'Journal of Educational Technology, 2025',
        description: '提出了一种新型的交互式学习算法，显著提高了儿童诗词记忆效率。'
      },
      {
        title: '多模态早教机器人情感交互框架',
        journal: 'Journal of Educational Technology, 2025',
        description: '开发了一个融合视觉和语音的情感识别系统，提升早教机器人交互体验。'
      },
      {
        title: '明漪集',
        journal: '人民日报出版社，2019',
        description: '个人文集丛书'
      },{
        title: '愚顽集',
        journal: '百花洲文艺出版社，2018',
        description: '第一部诗词理论集'
      },{
        title: '鱼丸集',
        journal: '百花文艺出版社，2015',
        description: '第一部诗词集'
      },
    ],
    researchProjects: [
      {
        title: '教育部资助的智能早教项目',
        description: '开发基于深度学习的智能早教系统，用于儿童早期诗词启蒙教育。'
      },
      {
        title: '智能早教机器人开发平台',
        description: '构建一个模块化开发平台，支持多种早教机器人的快速原型开发。'
      }
    ],
    awards: [
      {
        title: '重庆市大学生传统诗词创作大赛（本专科组）一等奖',
        description: '2016'
      },
      {
        title: '重庆市中学生传统诗词创作大赛（高中组）一等奖',
        description: '2014'
      },{
        title: '重庆市中学生传统诗词创作大赛（初中组）一等奖',
        description: '2011'
      }
    ],
    workExperience: [
      { company: '自由职业', position: '独立开发者', time: '2018.07-至今', description: '轻创业，设计、产品、技术、运营、市场、销售、法务、财税，什么都干' },
      { company: '华为', position: '技术文档工程师', time: '2018.03-2018.06', description: '实习' },
      { company: '京东方', position: '技术文档工程师', time: '2017.09-2017.12', description: '实习' }
    ],
    projects: [
      {
        name: 'Onelink',
        role: '软件工程师',
        time: '2022.01-至今',
        techStack: ['HTML/CSS', 'JavaScript', 'Typescript', 'Node.js', 'Express', 'MySQL', 'C/C++/C#', 'Kotlin', 'Swift', 'ArkTS'],
        description: '对标 linktr.ee 开发的响应式 link in bio 跨平台个人主页制作应用。'
      },{ 
        name: '电商系统', 
        role: '软件工程师', 
        time: '2021.01-2021.12',
        techStack: ['Vue.js', 'Node.js', 'MongoDB', 'Redis'],
        description: '一个完整的B2C电商平台，包含商品展示、购物车、订单管理等功能模块' 
      },
      { 
        name: '智能客服系统', 
        role: '软件工程师', 
        time: '2020.01-2020.12',
        techStack: ['Python', 'TensorFlow', 'Flask', 'NLTK'],
        description: '基于自然语言处理的智能客服系统，实现了自动问答和工单转接功能' 
      },
      { 
        name: '移动端健康管理应用', 
        role: '软件工程师', 
        time: '2019.01-2019.12',
        techStack: ['React Native', 'Firebase', 'Redux'],
        description: '一款健康数据追踪和管理的移动应用，支持步数、心率等健康指标记录' 
      }
    ],
    osprojectstitle: '开源项目',
    osprojects: [
      {
        name: 'onelink (Web)',
        time: '2016.03 - 至今',
        description: '对标 linktr.ee 开发的响应式个人主页，有静态版和后台版。',
        technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
        link: 'https://github.com/yunliyo/onelink'
      }
    ],
    skills: [
      { name: '汉语', progress: 95 },
      { name: '古汉语', progress: 90 },
      { name: '英语', progress: 70 },
      { name: '诗词联赋创作', progress: 80 },
      { name: '产品设计', progress: 30 },
      { name: '软硬件开发', progress: 50 },
      { name: '服务器运维', progress: 50 },
      { name: '新媒体运营', progress: 30 }
    ],
    others: {
      certificates: ['华为认证物联网高级工程师'],
      hobbies: ['诗词书画', '游戏']
    },
    yiyan: "做梦想做的事",
    copyright: "© 2015-".concat(new Date().getFullYear(), " by Yunli.")
  },
  onShareAppMessage: function() {
    return {
      title: '韵狸的简历',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '韵狸的简历',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  },
  onLoad() {
    // 页面加载时逻辑
  }
})