// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/kun368/NasPromise/issues/new',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '开发者主页',
    path: 'http://www.zzkun.com',
    external: true,
    newWindow: true,
    icon: 'yonghu',
  },
  {
    name: '下载Chrome插件',
    path: 'https://github.com/ChengOrangeJu/WebExtensionWallet',
    external: true,
    newWindow: true,
    icon: 'key',
  },
  {
    name: '下载手机钱包',
    path: 'https://nano.nebulas.io/index_cn.html',
    external: true,
    newWindow: true,
    icon: 'phone',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '创建',
    path: '/Create',
    icon: 'edit',
  },
  {
    name: '我的',
    path: '/MyCenter',
    icon: 'yonghu',
  },
  {
    name: '帮助',
    path: '/Help',
    icon: 'bell',
  },
];

export { headerMenuConfig, asideMenuConfig };
