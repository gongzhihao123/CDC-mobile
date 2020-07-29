<template>
  <div class="home">
    <div class="container">
      <text class="stickyTitle">健康知识</text>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危2按钮</van-button>
      <div bindtap="hidenModals">
        <div class="homeBackground">
          <img class="homeBackgroundImg" src="./../../assets/img/homeBackground.png" />
          <div class="rotation">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-for="(item, index) in imgUrl" :key="index">
              <van-swipe-item >
                <img :src="item.src" />
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
          { src: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
          { src: 'https://img.yzcdn.cn/vant/apple-2.jpg' }
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
