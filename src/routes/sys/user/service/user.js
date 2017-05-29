import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/sys/users?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/sys/users',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/sys/users`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/sys/users/${params}`,
    method:'delete'
  });
}

export async function fetchRoles() {
  return request({
    url:'/sys/roles/all'
  });
}

export async function auth(id, params) {
  return request({
    url:`sys/auths/allot/${id}`,
    method:'post',
    data:qs.stringify(params)
  });
}
