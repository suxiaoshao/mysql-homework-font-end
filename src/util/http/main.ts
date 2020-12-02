import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

export interface HttpData<T> {
  code: number;
  data: T;
}

export async function httpBase<Req, Res>(method: 'get' | 'post', url: string, data: Req): Promise<Res> {
  if (method === 'get') {
    const resData = await axios.get<HttpData<Res>>(url, {
      params: data,
    });
    if (resData.status === 200 && resData.data.code === 0) {
      return resData.data.data;
    }
  } else {
    const resData = await axios.post<HttpData<Res>>(url, data);
    if (resData.status === 200 && resData.data.code === 0) {
      return resData.data.data;
    }
  }
  throw '网络错误';
}

export async function httpGet<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('get', url, data);
}

export async function httpPost<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data);
}
