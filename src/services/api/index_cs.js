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
  console.log(data)
  return request.post('/api/join/join', data)
    .then(res => res.data)
    .catch((e) => {})
}

export function apiJoinClockin (data) {
  return request.post('/api/join/clockin', data)
}

// 举报确定
export function apiReportHandle (url, data) {
  return request.post('/api/share/report/' + url, data)
    .then(res => res.data)
    .catch((e) => {})
}

// 点赞
export function apiSpotPraise (url, data) {
  return request.post('/api/share/thumbsup/' + url, data)
    .then(res => res.data)
    .catch((e) => {})
}

// 肥胖记录
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

// 删除文件
export function apidelFile (data) {
  return request.delete('/common/attachment', data)
    .then(res => res.data)
    .catch((e) => {})
}

// 上传分享
export function apiSubminShare (data) {
  console.log(data)
  return request.post('/api/join/share', data)
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetMyChildList () {
  return request.get('/api/mine/student')
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetStudentActivityList (studentId) {
  return request.get('/api/mine/activityList/' + studentId)
    .then(res => res.data)
    .catch((e) => {})
}
export function apiGetClockinList (activityId, studentId) {
  return request.get('/api/mine/clockinList/' + activityId + '/' + studentId)
    .then(res => res.data)
    .catch((e) => {})
}
