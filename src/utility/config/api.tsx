/* eslint-disable prettier/prettier */
import axios from 'axios';
import commonMethods from '../commonMethods';
import colors from '@src/constants/colors';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as jwt from 'jsonwebtoken';
import base64 from 'react-native-base64';
// Creating instance of axios
const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,

  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const result = await AsyncStorage.getItem('token');
    // if (result) {
    //   // console.log(result,JSON.stringify(result), 'resss');
    //   // const token = jwt.sign(result, null);
    //   // console.log(token, 'tokenresult');
    //   //  const token =   base64.encode(result);
    //   console.log(result, 'tokenresult');

    //   // config.headers.Authorization = result;
    //   // config.headers['Content-Type'] = 'application/json';
    // }
    config.headers.Authorization = result;
    console.log(config, '=>>>>>>>>>>>>>>>>>>>>RequestBody');
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response, '=>>>>>>>>>>>>>>>>>>>>Response');
    return response;
  },
  function (error) {
    console.log(error.message, 'mesagte');

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    commonMethods.showSnackBar(error?.message, colors.color_red);
    return Promise.reject(error);
  },
);

/// GET method
export const GET = async (url: string, params?: any) => {
  try {
    const result = await axiosInstance.get(url, {params});
    const responseData = result.data;
    if (result.status === 200) {
      return {
        data: responseData,
        status: true,
      };
    } else {
      return {
        data: responseData,
        status: false,
      };
    }
  } catch (error: any) {
    return {
      data: error.message,
      status: false,
    };
  }
};

// POST method
export const POST = async (url: string, body: any, options?: any) => {
  try {
    const result = await axiosInstance.post(url, body, options);

    const responseData = result.data;
    if (result.status === 200) {
      return {
        data: responseData,
        status: true,
      };
    } else {
      return {
        data: responseData,
        status: false,
      };
    }
  } catch (error: any) {
    return {
      data: error.response.data,
      status: false,
    };
  }
};

// PUT method
export const PUT = async (url: string, body: any, options?: any) => {
  try {
    const result = await axiosInstance.put(url, {body}, options);
    const responseData = result.data;
    if (result.status === 200) {
      return {
        data: responseData,
        status: true,
      };
    } else {
      return {
        data: responseData,
        status: false,
      };
    }
  } catch (error: any) {
    return {
      data: error.message,
      status: false,
    };
  }
};

// DELETE method
export const DELETE = async (url: string, data: Object) => {
  try {
    const result = await axiosInstance.delete(url, {data});
    const responseData = result.data;
    if (result.status === 200 || result.status === 201) {
      return {
        data: responseData,
        status: true,
      };
    } else {
      return {
        data: responseData,
        status: false,
      };
    }
  } catch (error: any) {
    return {
      data: error.message,
      status: false,
    };
  }
};
