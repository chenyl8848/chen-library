// 管理员菜单
export const adminMenus = [
    {
      page: '/admin/document',
      title: '文档管理',
      icon: 'DocumentCopy',
      children: [
        {
          page: '/admin/document/category',
          title: '文档分类',
          icon: 'Grid',
        },
        {
          page: '/admin/document/list',
          title: '文档列表',
          icon: 'Tickets',
        },
        {
          page: '/admin/document/language',
          title: '语言管理',
          icon: 'Histogram',
        },
        {
          page: '/admin/document/searchrecord',
          title: '搜索记录',
          icon: 'Search',
        },
        {
          page: '/admin/document/recycle',
          title: '回收站',
          icon: 'Delete',
        },
      ],
    },
    {
      page: '/admin/article',
      title: '文章管理',
      icon: 'Odometer',
      children: [
        {
          page: '/admin/article/category',
          title: '文章分类',
          icon: 'Grid',
        },
        {
          page: '/admin/article/list',
          title: '文章列表',
          icon: 'Tickets',
        },
        {
          page: '/admin/article/recycle',
          title: '回收站',
          icon: 'Delete',
        },
      ],
    },
    {
      page: '/admin/user',
      title: '用户管理',
      icon: 'User',
      children: [
        {
          page: '/admin/user/list',
          title: '用户管理',
          icon: 'User',
        },
        {
          page: '/admin/user/role',
          title: '角色管理',
          icon: 'MagicStick',
        },
        {
          page: '/admin/user/permission',
          title: '权限管理',
          icon: 'CircleCheck',
        },
        {
          page: '/admin/user/punishment',
          title: '处罚管理',
          icon: 'Warning',
        },
      ],
    },
    {
      page: '/admin/banner',
      title: '轮播图管理',
      icon: 'Picture',
    },
    {
      page: '/admin/navigation',
      title: '导航管理',
      icon: 'Monitor',
      is_public: true,
    },
    {
      page: '/admin/friendlink',
      title: '友链管理',
      icon: 'Link',
    },
    {
      page: '/admin/comment',
      title: '评论管理',
      icon: 'ChatDotSquare',
    },
    {
      page: '/admin/report',
      title: '举报管理',
      icon: 'WarnTriangleFilled',
    },
    {
      title: '广告管理',
      page: '/admin/advertisement',
      icon: 'Flag',
    },
    {
      page: '/admin/attachment',
      title: '附件管理',
      icon: 'Paperclip',
    },
    {
      page: '/admin/setting',
      title: '系统设置',
      icon: 'Setting',
      children: [
        {
          title: '基础设置',
          page: '/admin/setting/system',
          icon: 'Setting',
        },
        {
          title: '展示设置',
          page: '/admin/setting/display',
          icon: 'Platform',
        },
        {
          title: '底链设置',
          page: '/admin/setting/footer',
          icon: 'Link',
        },
        {
          title: '验证码设置',
          page: '/admin/setting/captcha',
          icon: 'Postcard',
        },
        {
          title: '安全设置',
          page: '/admin/setting/security',
          icon: 'CoffeeCup',
        },
        {
          title: '转换设置',
          page: '/admin/setting/converter',
          icon: 'Refresh',
        },
        {
          title: '下载设置',
          page: '/admin/setting/download',
          icon: 'Download',
        },
        {
          title: '积分设置',
          page: '/admin/setting/score',
          icon: 'Coin',
        },
        {
          title: 'SSR设置',
          page: '/admin/setting/ssr',
          icon: 'Odometer',
        },
        {
          title: '邮箱设置',
          page: '/admin/setting/email',
          icon: 'Message',
        },
      ],
    },
  ]