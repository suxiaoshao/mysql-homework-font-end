import axios, { AxiosResponse } from 'axios';
import { setToken } from '../store/token';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

export interface HttpData<T> {
  code: number;
  data: T;
}

export const httpCode = ['成功', '未知错误', '没有此用户', '密码错误', '上传数据缺失', '登入时间过久'];

export async function httpBase<Req, Res>(method: 'get' | 'post', url: string, data: Req, token?: string): Promise<Res> {
  let resData: AxiosResponse<HttpData<Res>>;
  if (method === 'get') {
    resData = await axios
      .get<HttpData<Res>>(url, {
        params: data,
        headers: token ? { token: token } : undefined,
      })
      .catch(() => {
        throw '网络错误';
      });
  } else {
    resData = await axios
      .post<HttpData<Res>>(url, data, {
        headers: token ? { token: token } : undefined,
      })
      .catch(() => {
        throw '网络错误';
      });
  }
  if (resData.data.code === 0) {
    return resData.data.data;
  } else if (resData.data.code === 5) {
    setToken('');
  }
  throw httpCode[resData.data.code];
}

export async function httpGet<Req, Res>(url: string, data: Req, token?: string): Promise<Res> {
  return await httpBase<Req, Res>('get', url, data, token);
}

export async function httpPost<Req, Res>(url: string, data: Req, token?: string): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data, token);
}
