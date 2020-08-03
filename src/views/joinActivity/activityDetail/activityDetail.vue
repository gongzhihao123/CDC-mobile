<template>
  <div class="activityDetail">
    <div class="joinActivityHeader">活动详情</div>
    <div class="activityDetailBox">
      <div class="activityTitle">
        <div class="activityHeader">
          <van-image v-if="activityType * 1 === 1" :src="require('./../../../assets/img/activityThemeEye.png')" />
          <van-image v-if="activityType * 1 === 2" :src="require('./../../../assets/img/activityThemeFat.png')" />
        </div>
        <!-- 活动简介 -->
        <div class="activityMaterial">
          <p>主办方：北京市怀柔区疾病预防控制中心</p>
          <p class="activityMaterialActive">协办方：怀柔区中小学卫生保健所</p>
          <div class="activityInfo">
            <p class="activityInfoTitle" >活动介绍：</p>
            <p v-if="activityType * 1 === 1" class="model_text" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为全区中小学生暑期爱护眼睛工作，鼓励学生每天都做一次眼保健操，区疾病预防控制中心和区中小学生卫生保健所，共同举办爱眼睛主题云活动，通过自愿在小程序上完成打卡、分享等活动，结算最终积分，并给予奖励，培养良好的用眼习惯</p>
            <p v-if="activityType * 1 === 2" class="model_text" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鼓励全区中小学生利用暑期因地制宜的进行丰富多样的活动，每日完成小程序里的动起来打卡分享，获得活动积分（首次活动和活动结束前三天，参加活动的同学需两次手动填入实时身高体重信息）。学生可以通过合理膳食、健康运动达到减重的效果，同时还可以强健体魄，实现吃动平衡的目
  的，培养学生良好的膳食及运动习惯。</p>
            <div @click.stop="navMoreDetail" class="model_detail">…<p class="more_detail" >详情 >></p></div>
          </div>
        </div>
      </div>
      <div class="joinActivityButton">
        <div @click="joinActivity">参加活动</div>
      </div>
      <div class="activityContent">
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
            <div class="activityInfo" v-for="item in articleList" :key="item.id" v-on:click="clickArticle(item)">
              <van-image :src="readPath + item.thumbnailPath" />
              <div class="activityInfoContent">
                <p>{{ item.title }}</p>
                <span>浏览{{ item.clickCount }}次</span>
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
  apiJoinActivity,
  apiGetArticlePage,
  apiClickArticle
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      activityType: '',
      activityTitle: '',
      activityId: '',
      isBefore: '',
      pageNo: 1,
      pageSize: 5,
      channelIds: '',
      articleList: [],
      listFinished: false,
      listLoading: false
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  async mounted () {
    this.checkHasChild()
    this.activityId = this.$route.query.activityId
    this.activityType = this.$route.query.activityType
    this.activityTitle = this.$route.query.activityTitle
    await this.getArticleList()
  },
  methods: {
    navMoreDetail () {
      this.$router.push({ path: '/activitySuggest' + this.activityType, query: { activityId: this.activityId } })
    },
    async getArticleList () {
      this.activityType * 1 === 1 ? this.channelIds = 3 : this.channelIds = 4
      await apiGetArticlePage(this.pageNo, this.pageSize, { channelIds: this.channelIds })
        .then(res => {
          this.articleList = res.data.records
          this.listFinished = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 参加活动
    joinActivity () {
      const currentChildId = window.localStorage.getItem('currentChildId')
      const data = {
        activityId: this.activityId,
        activityType: this.activityType,
        activityTitle: this.activityTitle,
        studentId: currentChildId
      }
      apiJoinActivity(data)
        .then((res) => {
          if (res.code === 1) {
            this.$router.push({ path: '/clockIn', query: { activityId: this.activityId, activityType: this.activityType } })
          }
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
    checkHasChild () {
      const currentChildId = window.localStorage.getItem('currentChildId')
      if (currentChildId === null) {
        this.$toast.fail('请先绑定孩子')
        this.$router.push({ path: '/bindUser' })
      }
    }
  }
}
</script>
<style lang="scss">
.activityDetail {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .activityDetailBox {
    padding: 10px;
    .activityTitle {
      .activityMaterial {
        padding: 9px 15px;
        background: #EAF6FF;
        > p {
          font-size:14px;
          font-family:PingFang SC;
          font-weight:500;
          padding-bottom: 6px;
          color:rgba(51,51,51,1);
        }
        .activityInfo {
          border-top: 1PX solid #999999;
          padding-top: 15px;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          .activityInfoTitle {
            font-size:14px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
          .model_text{
            text-indent: 32px;
            font-size: 13px;
            color: #657180;
            text-align: justify;
            line-height: 22px;
           }
          .model_detail {
            width: 4em;
            position: absolute;
            right: 0;
            bottom: 0;
            background: #EAF6FF;
            font-size: 16px;
            line-height: 1.5;
            color: #657180;
          }
          .more_detail {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 14px;
            color: #4876f1;
            margin-left: 5px;
          }
        }
      }
    }
    .joinActivityButton {
      padding: 0 20px;
      div {
        padding: 10px 8px;
        margin: 6px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        background: linear-gradient(45deg, #07e6da,#1cbbb4);
        border-radius: 20px;
      }
    }
    .activityContent {
      .stickyTitle {
        margin: 10px 0;
        .van-sticky {
          margin: 10px 0;
          p {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
        }
      }
      .articleList {
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
              margin-top: 5px;
              text-align: right;
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
