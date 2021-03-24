import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
  code: Number;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}