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
  return request.post('/api/article/reading/' + articleId)
    .then(res => res.data)
    .catch((e) => {})
}

export function apiGetSharePageByActivity (pageNo, pageSize, data) {
  return request.get('/api/share/sharePage/' + pageNo + '/' + pageSize, { params: data })
    .then(res => res.data)
    .catch((e) => {})
}

export function apiJoinActivity (data) {
  return request.post('/api/join/join', { param: data })
    .then(res => res.data)
    .catch((e) => {})
}

export function apiJoinClockin (data) {
  return request.post('/api/join/clockin', { param: data })
}

// 举报确定
export function apiReportHandle (url, data) {
  return request.post('/api/share/report/' + url, data)
    .then(res => res.data)
    .catch((e) => {})
}

// 举报确定
export function apiSubminAntifatData (antifatDataId, data) {
  return request.post('/api/join/antifatData/' + antifatDataId, data)
    .then(res => res.data)
    .catch((e) => {})
}

// 上传文件
export function apiUploadFile (data) {
  return request.post('/common/attachment', data)
    .then(res => res.data)
    .catch((e) => {})
}

// // 登录
// export function apiUploadFile (param) {
//   console.log(param.get(''))
//   return request({
//     url: '/common/attachment',
//     method: 'post',
//     data: param,
//     isNeedLogin: true
//   })
//     .then(res => res.data)
//     .catch((e) => {})
// }

// 上传分享
export function apiSubminShare (activityId, data) {
  return request.post('/api/join/share/' + activityId, data)
    .then(res => res.data)
    .catch((e) => {})
}
