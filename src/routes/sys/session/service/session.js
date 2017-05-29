import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/sys/session?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/sys/session',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/sys/session`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/sys/session/${params}`,
    method:'delete'
  });
}
