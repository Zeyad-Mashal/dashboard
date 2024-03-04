import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders  {
    const user = JSON.parse(localStorage.getItem('user') as string);
   if (typeof user!== 'object') throw new Error('User info not found');

    const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);
    if (typeof accessToken!== 'string') throw new Error('accessToken info not found');
  
    if (user && accessToken) {
      return { Authorization: 'Bearer ' + accessToken };
    } else {
      return {};
    }
  }