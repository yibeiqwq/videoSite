import { defineConfig } from 'umi';
// 路由配置

export default defineConfig({
  // nodeModulesTransform: {
  //     type: 'none',
  // },
  hash: true,
  outputPath: 'dist',
  title: 'video',
  // history: {
  //   // 路由模式配置
  //   type: 'hash', // 路由url前面 带#号 （浏览器兼容好）
  //   // type: 'browser' // 路由url前面 不带#号 同时不配置也是默认选项（个别浏览器不兼容）
  // },
  historyWithQuery: true,
  define: {
    baseUrl: 'http://192.168.199.135:9705',
    // baseUrl: 'http://192.168.199.135',
  },
  // // 请求反向代理配置
  // proxy: {
  //   // 用户
  //   '/user': {
  //     target: 'http://192.168.199.135:9701/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/user': '' },
  //   },
  //   // 视频
  //   '/video': {
  //     target: 'http://192.168.199.135:9702/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/video': '' },
  //   },
  //   // 公共
  //   '/public': {
  //     target: 'http://192.168.199.135:9501/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/public': '' },
  //   },
  //   // 消息
  //   '/message': {
  //     target: 'http://192.168.199.135:9704/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/message': '' },
  //   },
  //   // 联系人
  //   '/contact': {
  //     target: 'http://192.168.199.135:9705/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/contact': '' },
  //   },
  //   // '/contact': {
  //   //     'target': 'http://192.168.199.135:9501/',
  //   //     'changeOrigin': true,
  //   //     'pathRewrite': { '^/video': '' },
  //   // },
  // },
  theme: {
    '@primary-color': '#e6f7ff',
    '@color-pink': '#fff0f6',
  },
  // routes: routes,
  fastRefresh: true,
  locale: {
    antd: true,
  },
});

// export default defineConfig({
//     // nodeModulesTransform: {
//     //     type: 'none',
//     // },
//     hash: true,// 配置是否让生成的文件包含 hash 哈希后缀，通常用于增量发布和避免浏览器加载缓存
//     // base:'/admin/', // 设置路由前缀，通常用于部署到非根目录

//     // (修改后重新执行打包命令)可以尝试将 publicPath 设置成 ./ 相对路径
//     // 也可以使用 CDN 部署，把 publicPath 的值设为 CDN 的前缀域名和地址值就可以(打包后的静态文件前缀就会加上这个cdn 连接地址)
//     // publicPath: './',
//     outputPath: 'bulid', // 修改打包后的文件命名.（注意：不允许设定为 src、public、pages、mock、config 等约定目录）
//     title: 'video',// 配置标题 这里是全局的默认页面标题，（也可以在路由配置中在设置单独对应的页面标题title属性）
//     history: { // 路由模式配置
//         type: 'hash' // 路由url前面 带#号 （浏览器兼容好）
//         // type: 'browser' // 路由url前面 不带#号 同时不配置也是默认选项（个别浏览器不兼容）
//     },
//     // 请求反向代理配置
//     // proxy: {
//     //     '/api': { // 匹配：接口前缀是/api的接口 走这个请求代理
//     //         'target': 'http://jsonplaceholder.typicode.com/',// 代理服务器转发到 服务器接口地址
//     //         'changeOrigin': true,
//     //         'pathRewrite': { '^/api': '' }, // 最后把/api 替换成空 '' 列如：/api/students 转化：http://jsonplaceholder.typicode.com/students 发送到服务器
//     //     },
//     // },
//     // 配置 主题 ：修改 Less 变量
//     // 因为umijs 集成了ant.design ui框架 使用到了Less 预编译 这里可以进行修改整体风格主题或者对应的Less变量值
//     // 参考：https://ant.design/docs/react/customize-theme-cn
//     // locale: { antd: true },
//     theme: {
//         '@primary-color': '#e6f7ff'
//     },
//     // 路由配置
//     routes: routes,
//     // 开启 视图快速更新 只要写了这个属性对象就是开启的
//     fastRefresh: true,
//     // mock: false, // mock是本地模拟接口的数据的一种快捷测试方式，默认是开启的，当要使用后端提供的接口和数据的时候可以关闭
// });

// // 配置参考文档：https://bigfish.alipay.com/doc
// /* eslint-disable no-param-reassign */
// import { defineConfig } from '@alipay/bigfish';
// // 路由配置
// import routes from './routes';

// // @ts-ignore
// export default defineConfig({
//     // 中台最佳实践，关于最佳实践更多文档查看 https://bigfish.antfin-inc.com/doc/console-intro
//     appType: 'console',
//     deployMode: 'tern',
//     tern: {
//         proxy: {
//             mode: 'cors',
//             DEV: {
//                 '/selfinsight': {
//                     target: 'https://selfinsight-pre.alipay.com',
//                 },
//                 '/': {
//                     target: 'https://bizinsight-api-pre.alipay.com',
//                 },
//             },
//             PRE: {
//                 '/selfinsight': {
//                     target: 'https://selfinsight-pre.alipay.com',
//                 },
//                 '/': {
//                     target: 'https://bizinsight-api-pre.alipay.com',
//                 },
//             },
//             PROD: {
//                 '/selfinsight': {
//                     target: 'https://selfinsight.alipay.com',
//                 },
//                 '/': {
//                     target: 'https://bizinsight-api.alipay.com',
//                 },
//             },
//         },
//     },
//     bmwAutoExternals: {},
//     analyze: {
//         analyzerMode: 'server',
//         analyzerPort: 8888,
//         openAnalyzer: true,
//         // generate stats file while ANALYZE_DUMP exist
//         generateStatsFile: false,
//         statsFilename: 'stats.json',
//         logLevel: 'info',
//         defaultSizes: 'parsed', // stat  // gzip
//     },
//     // 关闭 dva，对于比较简单的中台项目，我们推荐使用轻量级的全局数据分享方案即可
//     dva: false,
//     // 最佳实践中内置了 Layout，你也可以配置为 false 关闭它
//     layout: false,
//     title: '用户洞察',
//     favicon: 'https://i.alipayobjects.com/common/favicon/favicon.ico',
//     routes,
//     mock: {},
//     esbuild: {}, // basement构建不成功，尝试打开esbuild
//     // OneAPI 文档：https://yuque.antfin-inc.com/oneapi/doc/handbook
//     oneApi: {
//         apps: [
//             {
//                 name: 'bizinsight',
//                 tag: 'EI62198523_20211223',
//                 source: 'ZAPPINFO',
//             },
//         ],
//         requestImportStatement: "import { req } from '@/utils/request';",
//         typescript: true, // 每个接口的类型定义，自动生成，默认false
//     },
//     // 接口代理配置
//     proxy: {
//         '/api': {
//             target: 'http://oneapidemo.inc.alipay.net',
//         },
//     },
//     tracert: {
//         spmAPos: 'a2011',
//         bizType: 'deepinsightbizlog',
//         autoLogPv: true,
//         autoExpo: false,
//         asyncScript: false,
//         autoStart: false, // 自动启动关闭，自行在app.ts中启动
//     },
//     mfsu: {},
//     locale: {
//         antd: true,
//         default: 'zh-CN',
//     },
//     ignoreMomentLocale: false,
//     theme: {
//         'primary-color': '#3471f9',
//     },
//     monitor: {},
//     antd: {
//         compact: true, // 开启紧凑主题
//     },
//     copy: ['node_modules/@alipay/di-chart/node_modules/@alipay/x-report/lib'],
//     runtimePublicPath: true,
//     dynamicImport: {},
//     chainWebpack(memo) {
//         // 设置 alias
//         // @ts-ignore
//         memo.module.rule('css').sideEffects = true;
//         // @ts-ignore
//         memo.module.rule('less').sideEffects = true;
//         // 见https://github.com/umijs/umi/issues/6766
//         memo.module.rule('mjs-rule').test(/.m?js/).resolve.set('fullySpecified', false);
//     },
// });
