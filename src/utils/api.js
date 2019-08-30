import request from './request'

export function get(url,params){
  return request({
    method: 'GET',
    url: url,
    params
  })
}

export function post(url, data){
  return request({
    method: 'POST',
    url: url,
    data
  })
}