import Vue from 'vue'
import App from './App.vue'
// import Router from 'vue-router'
import router from './router'
import store from './store'
import 'lib-flexible'
import './lib/rem.js'

import './assets/style/index.css'

import FastClick from 'fastclick'
import 'vant/lib/index.css'
import {
  Button,
  Swipe,
  SwipeItem,
  Sticky,
  List,
  Col,
  Row,
  Toast,
  Image as VanImage,
  Lazyload,
  Tab,
  Tabs,
  Popup,
  Cell,
  CellGroup,
  Dialog,
  Radio,
  RadioGroup,
  Field
} from 'Vant'
Vue
  .use(Button).use(Swipe).use(SwipeItem)
  .use(Sticky).use(List).use(Col)
  .use(Row).use(Toast).use(VanImage)
  .use(Lazyload).use(Tab).use(Tabs)
  .use(Popup).use(Cell).use(CellGroup)
  .use(Dialog).use(RadioGroup).use(Radio)
  .use(Field)

FastClick.attach(document.body)

Vue.config.productionTip = false

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
