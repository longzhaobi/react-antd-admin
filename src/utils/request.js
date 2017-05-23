require('es6-promise').polyfill();
import axios from 'axios';
import NProgress from 'nprogress'
import React from 'react';
import {Modal, message} from 'antd';
function checkStatus(response) {
  if (response.status === 200) {
    const { data } = response
    if(data && data.httpCode === 200) {
      return data;
    } else {
      const error = new Error(data ? data.msg : response.statusText);
      error.response = response;
      throw error;
    }
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default function request(config = {}) {
  return axios.request(Object.assign(config))
  .then(checkStatus)
  .catch((error) => {
    if(!error.response) {
      //假如未定义，说明获取后端网路失败
      Modal.error({
        title: '网络错误',
        content: '抱歉，获取网络失败，或者系统正在维护，请稍后再试'
      });
      return;
    }
    const { status, data } = error.response;
    if(status === 207) {
      message.warning('频繁操作')
      return
    }
    const httpCode = data && data.httpCode
    if(status === 401 || httpCode === 401) {
      const modal = Modal.warning({
        title: '错误提示',
        content: '您的登录凭证已过期，请尝试重新登录后再操作！',
        onOk() {
          window.location.href = 'http://localhost:8000/#/login';
        },
        okText:'确定'
      });
      return;
    } else {
      message.error(error.toString());
      // return;
    }
  });
}

//请求前和请求结束的拦截器
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
// axios.interceptors.response.use(function (response) {
//   NProgress.done()//结束进度条
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });
