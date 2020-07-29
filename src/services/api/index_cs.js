import { request } from '@/services/request'
// import queryString from 'querystring'

export function apiGetActivityList (param) {
  return request({
    url: '/api/join/activityList',
    method: 'get',
    data: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetArticlePage (pageNo, pageSize, data) {
  console.log(data)
  return request.get('/api/article/articlePage/' + pageNo + '/' + pageSize, { params: data })
    .then(res => res.data)
    .catch((e) => {})
}
