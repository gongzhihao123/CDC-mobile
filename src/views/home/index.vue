<template>
  <div class="home">
    <div class="container">
      <text class="stickyTitle">健康知识</text>
      <div bindtap="hidenModals">
        <div class="homeBackground">
          <img class="homeBackgroundImg" src="./../../assets/img/homeBackground.png" />
          <div class="rotation">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-for="(item, index) in imgUrl" :key="index">
              <van-swipe-item >
                <img :src="item" />
              </van-swipe-item>
              <van-swipe-item>
                <img src="./../../assets/img/banner3.png" />
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        userBtnFlag: true,
        userInfo: {},
        hasUserInfo: false,
        interval: 3000,
        duration: 1000,
        indicatorColor: '#eee',
        indicatorActiveColor: '#f10215',
        imgUrls: [],
        pageNo: 1,
        pageSize: 7,
        articleList: [],
        navbarInitTop: 0,
        isFixedTop: false,
        readFile: '',
        imgUrl: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ]
      }
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {}
}
</script>
