// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Home from './pages/Home';
import Create from './pages/Create';
import MyCenter from './pages/MyCenter';
import Learn from './pages/Learn';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
  {
    path: '/Create',
    layout: HeaderAsideFooterLayout,
    component: Create,
  },
  {
    path: '/MyCenter',
    layout: HeaderAsideFooterLayout,
    component: MyCenter,
  },
  {
    path: '/Learn',
    layout: HeaderAsideFooterLayout,
    component: Learn,
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
