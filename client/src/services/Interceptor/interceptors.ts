import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL, LOCAL_STORAGE } from '../../constants';
import { IRefreshToken } from './tyings';
import { SuccessResponse } from '../tyings';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
instance.interceptors.response.use(
  (response: AxiosResponse<SuccessResponse<any>>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        const data: IRefreshToken = await instance.put('/customer/refresh', {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, data.access_token);
        localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, data.refresh_token);
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return instance(originalRequest);
        }
      } catch (error) {
        // console.log(error);
      }
    }

    return Promise.reject(error);
  },
);
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] =
        config?.headers?.['Content-Type'] ?? 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
