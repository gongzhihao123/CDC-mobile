import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/home',
    children: [
      { path: '/home', name: 'home', component: () => import('./../views/home/index.vue') },
      // 活动
      { path: '/activity', name: 'activity', component: () => import('./../views/activity/index.vue') },
      { path: '/activityDetail', name: 'activityDetail', component: () => import('./../views/activity/activityDetail/activityDetail.vue') },
      { path: '/activityList', name: 'activityList', component: () => import('./../views/activity/activityList/activityList.vue') },
      { path: '/activitySuggest1', name: 'activitySuggest1', component: () => import('./../views/activity/activitySuggest1/activitySuggest1.vue') },
      { path: '/activitySuggest2', name: 'activitySuggest2', component: () => import('./../views/activity/activitySuggest2/activitySuggest2.vue') },
      // 文章
      { path: '/article15', name: 'article15', component: () => import('./../views/articleDetail/article15/article15.vue') },
      { path: '/article16', name: 'article16', component: () => import('./../views/articleDetail/article16/article16.vue') },
      { path: '/article17', name: 'article17', component: () => import('./../views/articleDetail/article17/article17.vue') },
      { path: '/article18', name: 'article18', component: () => import('./../views/articleDetail/article18/article18.vue') },
      { path: '/article19', name: 'article19', component: () => import('./../views/articleDetail/article19/article19.vue') },
      { path: '/article20', name: 'article20', component: () => import('./../views/articleDetail/article20/article20.vue') },
      { path: '/article21', name: 'article21', component: () => import('./../views/articleDetail/article21/article21.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
