import request from '../../../../utils/request';
import qs from 'qs';
export async function fetch(params) {
  return request({
    url:`/blog/anon/articles?${qs.stringify(params)}`
  });
}

export async function create(params) {
  return request({
    url:'/blog/articles',
    method:'post',
    data:qs.stringify(params)
  });
}

export async function confirm(id) {
  return request({
    url:`/blog/articles/confirm/${id}`,
    method:'put'
  });
}

export async function update(params) {
  return request({
    url:`/blog/articles`,
    method:'put',
    data:qs.stringify(params)
  });
}

export async function remove(params) {
  return request({
    url:`/blog/articles/${params}`,
    method:'delete'
  });
}

export async function queryById(id) {
  return request({
    url:`/blog/anon/articles/${id}`
  });
}

export async function topHandler(id) {
  return request({
    url:`/blog/top/articles/${id}`,
    method:'put'
  });
}
