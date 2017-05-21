import request from '../utils/request';
import qs from 'qs';
export async function query() {
  return request('/api/users');
}

export function login(params) {
  return request({
    url:'/api/login',
    method: 'post',
    data: qs.stringify(params)
  });
}

export function logout() {
  return request({
    url:'/api/logout',
    method: 'post'
  });
}

export function current() {
  return request({
    url:'/api/users/current'
  });
}
