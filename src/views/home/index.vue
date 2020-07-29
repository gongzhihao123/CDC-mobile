<template>
  <div class="home">
    <div class="container">
      <div bindtap="hidenModals">
        <div class="homeBackground">
          <img class="homeBackgroundImg" src="./../../assets/img/homeBackground.png" />
          <div class="rotation">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(image, index) in imgUrls" :key="index">
                <img :src="readPath + image.carouselImg" />
              </van-swipe-item>
              <van-swipe-item>
                <img src="./../../assets/img/banner3.png" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="stickyTitle">
            <van-sticky>
              <p @click="getArticleList">基础用法</p>
            </van-sticky>
          </div>
          <div class="articleList">
            <van-list
              v-model="listLoading"
              :finished="listFinished"
              finished-text="没有更多了"
            >
              <van-row  v-for="article in articleList" :key="article.id" :title="article.title" >
                <van-col span="6"><img :src="readPath + article.thumbnailPath" /></van-col>
                <van-col span="1"></van-col>
                <van-col span="13"><span>{{ article.title }}</span></van-col>
                <van-col span="4"><span>浏览{{ article.clickCount }}次</span></van-col>
              </van-row>
            </van-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  apiGetActivityList,
  apiGetArticlePage
} from '@/services/api/index_cs'
export default {
  data () {
    return {
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
      listLoading: false,
      listFinished: false,
      navbarInitTop: 0,
      isFixedTop: false
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    // 获取轮播图
    getSwipeData () {
      apiGetActivityList()
        .then(res => {
          this.imgUrls = res.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
      * 获取文章列表
      */
    getArticleList () {
      apiGetArticlePage(this.pageNo, this.pageSize, { channelIds: 5 })
        .then(res => {
          this.articleList = res.data.records
          console.log(this.articleList)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getSwipeData()
  }
}
</script>
