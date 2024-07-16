/** @format */
import axios from 'axios';
import NProgress from 'nprogress';
// apis
// hooks
// types
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// stores
// configs
import { ENV } from '@src/configs';
// components
// 创建axios实例
const request = axios.create({
  baseURL: '/town/adminapi',
  timeout: 10000,
});
// request拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }

    const { headers, url = '' } = config;
    const token = sessionStorage.getItem(ENV.TOKEN_KEY);
    if (['/captchaImage', '/loginPlatform', '/loginTenant', '/loginSonTenant'].includes(url)) {
      return config;
    }

    return Object.assign({}, config, { headers: Object.assign({ Authorization: `Bearer ${token}` }, headers) });
  },
  (error) => {
    NProgress.done();

    return Promise.reject(error);
  },
);
// 响应拦截器
request.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    NProgress.done();
    const { status, data } = response;
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    NProgress.done();
    return Promise.resolve(error);
  },
);

export const requestGet = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'GET' }, option));
  return res as unknown as T;
};

export const requestPost = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'POST' }, option));
  return res as unknown as T;
};

export const requestDelete = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'DELETE' }, option));
  return res as unknown as T;
};

export const requestPut = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'PUT' }, option));
  return res as unknown as T;
};

export const requestDownload = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'GET', responseType: 'blob' }, option));
  return res as unknown as T;
};

export const requestUpload = async <T = any>(option: AxiosRequestConfig) => {
  const res = await request(Object.assign({ method: 'POST', headersType: 'multipart/form-data' }, option));
  return res as unknown as T;
};

export { request };
