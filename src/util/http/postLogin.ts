import { httpPost } from './main';

export interface TokenData {
  token: string;
}

export async function postLogin(userName: string, password: string): Promise<TokenData> {
  return await httpPost<{ userName: string; password: string }, TokenData>('/api/login', {
    userName: userName,
    password: password,
  });
}
