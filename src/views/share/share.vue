<template>
  <div>
    <div class="activlty">
      <van-tabs v-model="active" v-on:change="tabChange">
        <van-tab v-for="activity in activityList" :key="activity.id" :name="activity.id" :title="activity.title"></van-tab>
      </van-tabs>
    </div>
    <div class="share">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell v-for="share in shareList" :key="share.id" >
          <div class="clockShareInfo">
            <van-image class="clockShareInfoImg" :src="share.wechatUserImg"></van-image>
            <div class="clockShareInfoMain">
                <div class="clockShareInfoHeader">{{ share.studentName }}</div>
                <p>{{ share.content }}</p>
                <div v-if="share.contentImg" class="clockShareInfoMainImgBox">
                    <van-image class="clockShareInfoMainImg" :src="readPath + share.contentImg"></van-image>
                </div>
                <!-- 图片预览 -->
                <div class="userPredivImage" wx:if="predivImageFlag" bindtap="hiddenPredivImage">
                    <van-image src="yuLancontentImg"></van-image>
                </div>
                <div class="clockShareInfoFoot">
                    <p>{{ share.createdTime[0] + '-' + share.createdTime[1] + '-' + share.createdTime[2] + ' ' + share.createdTime[3] + ':' + item.createdTime[4] + ':' + item.createdTime[5] }}</p>
                    <div class="articleOperation">
                        <div>
                            <p>举报</p>
                            <van-image src="./../../assets/img/articleReport.png"></van-image>
                        </div>
                        <div>
                            <p>点赞</p>
                            <van-image src="./../../assets/img/articleParise.png"></van-image>
                            <p>{{ share.thumbsupNumber }}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import {
  apiGetActivityList,
  apiGetSharePageByActivity
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      active: 1,
      activityList: [],
      shareList: [],
      pageNo: 0,
      pageSize: 5,
      activityId: '',
      loading: false,
      finished: false
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    // 获取活动列表
    getActivityList () {
      apiGetActivityList()
        .then(res => {
          this.activityList = res.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 标签切换
    tabChange (tabName) {
      this.activityId = tabName
      this.getShareList()
    },
    getShareList () {
      apiGetSharePageByActivity(this.pageNo, this.pageSize, { activityId: this.activityId })
        .then(res => {
          this.shareList = res.data
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getActivityList()
  }
}
</script>
