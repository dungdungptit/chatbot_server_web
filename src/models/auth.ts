import { useState } from 'react';
import { history } from 'umi';
import { login } from '@/services/Auth/auth';

export default () => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);

  const loginModel = async (payload: FormData) => {
    setLoading(true);
    const response = await login(payload);
    console.log(response);
    const token = response.data?.token;

    localStorage.setItem('token', token);

    setLoading(false);
    return response;
  };

  return {
    loading,
    setLoading,
    loginModel,
  };
};
