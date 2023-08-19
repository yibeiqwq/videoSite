export default [
  // { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: '@/pages/home',
    title: '首页',
    redirect: '/home',
  },
  { path: '/upload', component: '@/pages/Upload', title: '上传视频' },
  { path: '/wstool', component: '@/pages/WsTool', title: 'websocket' },
  { path: '/conversation', component: '@/pages/Conversation', title: '会话' },
  {
    path: '/searchPage',
    component: '@/pages/SearchPage',
    title: '搜索',
  },

  // {
  //     path: '/',
  //     component: '@/layouts/home', // 使用到了模板 下面两个页面都会继承这个模板的内容
  //     routes: [
  //         { path: '/', component: '@/pages/home', title: '首页' },
  //     ]
  // },
  // { path: '/list', redirect: '/user/one' }, // 路由访问 /list的时候 会重定向到 下面对应的 /user/two页面去
  // {
  //     path: '/user',
  //     component: '@/layouts/index', // 使用到了模板 下面两个页面都会继承这个模板的内容
  //     wrappers: [
  //         '@/wrappers/auth',
  //     ],
  //     routes: [
  //         { path: '/user/one/:id?', component: '@/pages/index' },
  //         { path: '/user/two', component: '@/pages/user' },
  //         { component: '@/pages/404' }
  //     ]
  // },
  // { component: '@/pages/404' }
];
