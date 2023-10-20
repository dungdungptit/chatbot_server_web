import { data } from '@/utils/data';
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from '@/utils/axios';
import { ip } from '@/utils/ip';


export interface IPayload {
  intent_id: string,
  page: number,
  limit: number,
  cond: object,
}

class Question<T> {
  name: string;
  url: string;

  constructor({ name, url }: { name: string; url: string }) {
    this.name = name;
    this.url = url || name;
  }

  del = async (id: string) => {
    return axios.delete(`${ip}/${this.url}`, { params: { id } });
  };

  get = async (payload: IPayload) => {
    // console.log(payload);
    return axios.get(`${ip}/${this.url}`, { params: payload });
  };

  get_by_id = async (id: string) => {
    // console.log(payload);
    return axios.get(`${ip}/${this.url}`, { params: { question_id: id } });
  };

  add = async (payload: T) => {
    return axios.post(`${ip}/${this.url}`, payload);
  };
  addFile = async (payload: T) => {
    return axios.post(`${ip}/files/question`, payload);
  };

  add2 = async (payload: T) => {
    Object.keys(payload).forEach((key) => {
      // payload[key] = payload[key];
      payload[key] = payload[key];
    });
    return axios.post(`${ip}/${this.url}`, payload);
  };

  upd = async (payload: T & { id: string | undefined, data: FormData }) => {
    const { id } = payload;
    payload.id = undefined;
    return axios.put(`${ip}/${this.url}`, payload.data);
  };

}

const question = new Question({ name: 'Question', url: 'questions' });

export default question;
