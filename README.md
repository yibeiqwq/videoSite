# videoSite
视频网站

### 安装依赖
npm i

### 启动项目
npm run dev

### 接口配置
/config/config.ts 中对对应模块接口进行反向代理
.umirc.ts 配置接口地址

在server中新增接口地址需要在地址前新增反向代理中的前缀
例如：用户模块前缀为 `pathRewrite: { '^/user': '' }` , `/user` 就是前缀，接口地址是`/user/login`.在server文件中需要写成`/user/user/login`。即可实现不同模块匹配不同端口的接口。