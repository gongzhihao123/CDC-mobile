<template>
  <div class="home">
    <div class="container">
      <div class="home-header">首页</div>
      <div class="homeBackground">
        <div class="rotation">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in imgUrls" :key="index" v-on:click="goActivityDetail(image.id, image.type ,image.title)">
              <img :src="readPath + image.carouselImg" />
            </van-swipe-item>
            <van-swipe-item v-on:click="goHealthDarren" >
              <img src="./../../assets/img/banner3.png" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="stickyTitle">
          <van-sticky>
            <p @click="getArticleList">健康知识</p>
          </van-sticky>
        </div>
        <div class="articleList">
          <van-list
            v-model="listLoading"
            :finished="listFinished"
            finished-text="没有更多了"
          >
            <!-- <van-row  v-for="article in articleList" :key="article.id" :title="article.title" @click="clickArticle(article)">
              <van-col span="6"><img :src="readPath + article.thumbnailPath" /></van-col>
              <van-col span="1"></van-col>
              <van-col span="12" class="homeArtcileInfoTitle"><span>{{ article.title }}</span></van-col>
              <van-col span="5" class="homeArtcileInfoliu"><span>浏览{{ article.clickCount }}次</span></van-col>
            </van-row> -->
            <div class="activityInfo"  v-for="article in articleList" :key="article.id" :title="article.title" @click="clickArticle(article)">
              <van-image :src="readPath + article.thumbnailPath" />
              <div class="activityInfoContent">
                <p>{{ article.title }}</p>
                <span>浏览{{ article.clickCount }}次</span>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  apiGetActivityList,
  apiGetArticlePage,
  apiClickArticle
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
      total: '',
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
          this.listFinished = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 点击文章
     */
    clickArticle (e) {
      apiClickArticle(e.id)
        .then(res => {
          this.goArticleDetail(e)
        })
    },
    /**
     * 跳转到文章
     */
    goArticleDetail (e) {
      const time = e.publishedTime[0] + '-' + e.publishedTime[1] + '-' + e.publishedTime[2] + ' ' + e.publishedTime[3] + ':' + e.publishedTime[4] + ':' + e.publishedTime[5]
      this.$router.push({ path: '/article' + e.id, query: { time: time, clickCount: e.clickCount } })
    },
    goActivityDetail (activityid, activityType, activityTitle) {
      this.$router.push({ path: '/activityDetail', query: { activityId: activityid, activityType: activityType, activityTitle: activityTitle } })
    },
    goHealthDarren () {
      this.$router.push({ path: '/healthDarren' })
    }
  },
  mounted () {
    this.getSwipeData()
    this.getArticleList()
  }
}
</script>
<style lang="scss">
.home {
  .container {
    .home-header {
      font-size: 16px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      background: url(./../../assets/img/homeHeader.png) no-repeat;
      background-size: 100% 100%;
    }
    .homeBackground {
      .rotation {
        background: url(./../../assets/img/homeBackground.png) no-repeat;
        background-size: 100% 100%;
        .van-swipe {
          margin: 0 10px;
          padding-bottom: 10px;
        }
      }
    }
    .stickyTitle {
      margin: 10px;
      .van-sticky {
        > p {
          font-size: 36rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51,51,51,1);
        }
      }
    }
    .articleList {
      margin: 0 10px;
      .van-list {
        .activityInfo {
          display: flex;
          margin-bottom: 10px;
          align-items: center;
          .van-image {
            width: 80px;
            height: 57px;
          }
          .activityInfoContent {
            width: 100%;
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            p {
              width: 100%;
              text-align: left;
              font-size: 16px;
            }
            span {
              width: 100%;
              display: inline-block;
              text-align: right;
              margin-top: 5px;
              font-size:14px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
            }
          }
        }
      }
    }
  }
}
</style>
