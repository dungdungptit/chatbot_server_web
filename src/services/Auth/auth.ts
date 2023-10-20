import axios from '@/utils/axios';
import { ip } from '@/utils/ip';
import { Login } from './typings';

export const login = async (payload: FormData) => {
  console.log(payload);
  const res = await axios.post(`${ip}/accounts/login`, payload);
  console.log(res);
  return res;
};

export async function getInfo() {
  return axios.get(`${ip}/user_view_info`);
}

export async function getInfoAdmin() {
  return axios.get(`${ip}/user_view_info`);
}
