import { request } from '@/services/request'
// import queryString from 'querystring'

// 登录
export function apiLogin (param) {
  return request({
    url: '/api/login/login',
    method: 'post',
    param: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 注册
export function apiReg (param) {
  return request({
    url: '/api/login/wechatUser',
    method: 'post',
    param: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

export function apiList (pageNo, pageSize, data) {
  return request({
    url: '/api/article/articlePage/' + pageNo + '/' + pageSize,
    method: 'get',
    params: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
