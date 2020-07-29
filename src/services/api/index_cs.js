import { request } from '@/services/request'
// import queryString from 'querystring'

export function apiGetActivityList (param) {
  return request({
    url: '/api/join/activityList',
    method: 'get',
    param: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetArticlePage (pageNo, pageSize, data) {
  return request({
    url: '/api/article/articlePage/' + pageNo + '/' + pageSize,
    method: 'get',
    params: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
