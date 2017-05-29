import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/sys/logs?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/sys/logs',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function update(params) {
  return request({
    url:`/sys/logs`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/sys/logs/${params}`,
    method:'delete'
  });
}
