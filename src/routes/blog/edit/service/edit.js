import request from '../../../../utils/request';
import qs from 'qs';

export async function fetch(id) {
  return request({
    url:`/blog/anon/articles/${id}`
  });
}

export async function update(params) {
  return request({
    url:'/blog/articles',
    method:'put',
    data:qs.stringify(params)
  });
}


export async function fetchClassifications() {
  return request({
    url:'/blog/anon/all/classifications'
  });
}
