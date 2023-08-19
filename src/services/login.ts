import request from '@/utils/request';

interface LoginParams {
  username?: string;
  email?: string;
  mobile?: string;
  method: string; // 登录方式
  password?: string;
  code?: string;
}

interface RegisterParams {
  mobile?: string;
  email?: string;
  password?: string;
}

export async function Register(params: RegisterParams) {
  return request('/user/account/register', {
    method: 'POST',
    data: params,
  });
}
export async function Login(params: LoginParams) {
  return request('/user/account/login', {
    method: 'POST',
    data: params,
  });
}

//
