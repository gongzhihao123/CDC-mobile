import { request } from '@/services/request'
// import queryString from 'querystring'

// 登录
export function apiLogin (param) {
  return request({
    url: '/api/login/login',
    method: 'post',
    data: param,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 注册
export function apiReg (data) {
  return request({
    url: '/api/login/wechatUser',
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 获取学校列表
export function apiGetSchool (data) {
  return request({
    url: '/api/mine/schoolList',
    method: 'get',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 获取校区列表
export function apiGetCampus (url, data) {
  return request({
    url: '/api/mine/campusList/' + url,
    method: 'get',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 获取学校列表
export function apiGetGrade (campusId, sectionId, data) {
  return request({
    url: '/api/mine/gradeList/' + campusId + '/' + sectionId,
    method: 'get',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 获取学校列表
export function apiGetClass (url, data) {
  return request({
    url: '/api/mine/classList/' + url,
    method: 'get',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}

// 绑定检查
export function apiBindCheck (data) {
  return request({
    url: '/api/mine/studentCheck',
    method: 'post',
    data: data,
    isNeedLogin: true
  })
    .then(res => res.data)
    .catch((e) => {})
}
