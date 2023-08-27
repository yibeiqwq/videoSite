/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from 'antd';
import { stringify } from 'qs';
import { extend } from 'umi-request';
// import { get } from 'lodash';

// const baseUrl = 'http://jdufnx.natappfree.cc/';

const codeMessage: { [key: string]: any } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  // 204: '请求成功无响应。',
  302: '已存在。',
  400: '参数错误。',
  401: '用户未登录。',
  403: '用户没有权限。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const user = window.localStorage.getItem('user');

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 默认错误处理
  crossOrigin: true, // 开启CORS跨域
  // prefix: '/contact',
  parseResponse: false,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  headers: {
    Authorization: !!user ? `Bearer ${JSON.parse(user).token}` : 'no auth',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

//  request响应拦截器, 统一处理错误信息
request.interceptors.response.use(async (response: any) => {
  // 未登录
  if (response?.status === 401) {
    window.localStorage.removeItem('user');
    return {
      // success: true,
      message: '用户未登录',
    };
  }
  // 注册成功
  if (
    response &&
    response.url?.indexOf('/user/account/register') > -1 &&
    response.status === 204
  ) {
    notification.success({
      message: '注册成功',
    });
    return response;
  } else if (response.status === 204) {
    return {
      success: true,
    };
  }

  if (response && response.status) {
    const data = await response?.clone()?.json();
    const { status, url } = response;
    let errorText = codeMessage[response.status];
    if (data && status !== 200) {
      errorText = data.msg || Object.values(data.errors)[0];
    }

    // 登录成功
    if (url.indexOf('/user/account/register') > -1 && response.status === 200) {
      notification.success({
        message: '登录成功',
      });
    }

    if (status !== 204 && status !== 200) {
      notification.error({
        // message: `请求错误 ${status}: ${url}`,
        message: errorText,
      });
    }

    return {
      ...response,
      ...data,
      status: response.status,
    };
  }
  notification.error({
    description: '您的网络发生异常，无法连接服务器',
    message: '网络异常',
  });

  return response;
});

// 中间件，对请求前添加 userId token 的基础参数
request.interceptors.request.use((url: any, options: any) => {
  let newUrl = url;
  const newOptions = { ...options };
  if (!(newOptions.data instanceof FormData)) {
    newOptions.data = {
      ...newOptions.data,
      // userId: '00000001',
      // token: 'adsadsafcdscd'
    };
  } else {
    // newOptions.data.append('userId', '1');
    // newOptions.data.append('token', 'adsadsafcdscd');
  }
  if (newOptions.method === 'GET') {
    newUrl = `${newUrl}?${stringify(newOptions.params, {
      arrayFormat: 'brackets',
    })}`;
  }
  return {
    url: options.params ? newUrl : url,
    options: { ...newOptions },
  };
});

export default request;
