export default {
  proxy: {
    // 用户
    '/user': {
      target: 'http://192.168.199.135:9701/',
      changeOrigin: true,
      pathRewrite: { '^/user': '' },
    },
    // 视频
    '/video': {
      target: 'http://192.168.199.135:9702/',
      changeOrigin: true,
      pathRewrite: { '^/video': '' },
    },
    // 公共
    '/public': {
      target: 'http://192.168.199.135:9703/',
      changeOrigin: true,
      pathRewrite: { '^/public': '' },
    },
    // 消息
    '/message': {
      target: 'http://192.168.199.135:9704/',
      changeOrigin: true,
      pathRewrite: { '^/message': '' },
    },
    // 联系人
    '/contact': {
      target: 'http://192.168.199.135:9705/',
      changeOrigin: true,
      pathRewrite: { '^/contact': '' },
    },
    // '/pubic': {
    //   'target': 'http://192.168.199.135:9501/',
    //   'changeOrigin': true,
    //   'pathRewrite': { '^/pubic': '' },
    // },
  },
};
