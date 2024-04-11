import axios, { AxiosRequestConfig } from 'axios';
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_URL, // URL base para todas las solicitudes
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  }
};

export const axiosInstance = axios.create(axiosRequestConfig);
