import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: login,
    children: [
      { path: '/login', name: 'login', component: () => import('./../views/login.vue') }
    ]
  },
  {
    path: '/home',
    name: 'index',
    component: index,
    children: [
      { path: '/home', name: 'home', component: () => import('./../views/home/index.vue') },
      // 活动
      { path: '/joinActivity', name: 'joinActivity', component: () => import('./../views/joinActivity/index.vue') },
      { path: '/activityDetail', name: 'activityDetail', component: () => import('./../views/joinActivity/activityDetail/activityDetail.vue') },
      { path: '/activitySuggest1', name: 'activitySuggest1', component: () => import('./../views/joinActivity/activitySuggest1/activitySuggest1.vue') },
      { path: '/activitySuggest2', name: 'activitySuggest2', component: () => import('./../views/joinActivity/activitySuggest2/activitySuggest2.vue') },
      // 文章
      { path: '/article15', name: 'article15', component: () => import('./../views/articleDetail/article15/article15.vue') },
      { path: '/article16', name: 'article16', component: () => import('./../views/articleDetail/article16/article16.vue') },
      { path: '/article17', name: 'article17', component: () => import('./../views/articleDetail/article17/article17.vue') },
      { path: '/article18', name: 'article18', component: () => import('./../views/articleDetail/article18/article18.vue') },
      { path: '/article19', name: 'article19', component: () => import('./../views/articleDetail/article19/article19.vue') },
      { path: '/article20', name: 'article20', component: () => import('./../views/articleDetail/article20/article20.vue') },
      { path: '/article21', name: 'article21', component: () => import('./../views/articleDetail/article21/article21.vue') },
      // 打卡&分享
      { path: '/clockIn', name: 'clockIn', component: () => import('./../views/clockIn/clockIn.vue') },
      { path: '/record', name: 'record', component: () => import('./../views/clockIn/record/record.vue') },
      { path: '/share', name: 'share', component: () => import('./../views/share/share.vue') },
      { path: '/clockShare', name: 'clockShare', component: () => import('./../views/clockShare/clockShare.vue') },
      // 健康小达人
      { path: '/healthDarren', name: 'healthDarren', component: () => import('./../views/healthDarren/healthDarren.vue') },
      // 我的
      { path: '/ours', name: 'ours', component: () => import('./../views/ours/ours.vue') },
      { path: '/bindUser', name: 'bindUser', component: () => import('./../views/ours/bindUser/bindUser.vue') },
      { path: '/punchRecord', name: 'punchRecord', component: () => import('./../views/ours/punchRecord/punchRecord.vue') },
      { path: '/userActivityRecord', name: 'userActivityRecord', component: () => import('./../views/ours/userActivityRecord/userActivityRecord.vue') },
      { path: '/userSwitch', name: 'userSwitch', component: () => import('./../views/ours/userSwitch/userSwitch.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
