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

// 获取活动文章列表
export function apiGetArticlePage (pageNo, pageSize, data) {
  return request.get('/api/article/articlePage/' + pageNo + '/' + pageSize, { params: data })
    .then(res => res.data)
    .catch((e) => {})
}

export function apiClickArticle (data) {
  return request.post('/api/article/clicking/' + data)
    .then(res => res.data)
    .catch((e) => {})
}

export function apiArticleReading (articleId) {
  return request({
    url: '/api/article/reading/' + articleId,
    method: 'post',
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetSharePageByActivity (pageNo, pageSize, data) {
  return request({
    url: '/api/share/sharePage/' + pageNo + '/' + pageSize,
    method: 'get',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
