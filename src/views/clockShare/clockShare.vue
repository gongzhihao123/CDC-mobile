<template>
  <div class="clockShare">
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
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div class="clockShareInfo" v-for="share in shareList" :key="share.id" >
          <div class="clockShareInfoMain">
            <div class="clockShareInfoHeader">{{ share.studentName }}</div>
            <p>{{ share.content }}</p>
            <div v-if="share.contentImg" class="clockShareInfoMainImgBox">
            <van-image class="clockShareInfoMainImg" :src="readPath + share.contentImg"></van-image>
          </div>
          <div class="clockShareInfoFoot">
          <p>{{ share.createdTime[0] + '-' + share.createdTime[1] + '-' + share.createdTime[2] + ' ' + share.createdTime[3] + ':' + share.createdTime[4] + ':' + share.createdTime[5] }}</p>
          <div class="articleOperation">
            <div>
              <van-button @click="showReportPopup" round type="danger" :icon="require('./../../assets/img/articleReport.png')">举报</van-button>
            </div>
            <div>
              <van-button @click="showThumbsupPopup" round type="info" :icon="require('./../../assets/img/articleParise.png')">点赞</van-button>
              <p>{{ share.thumbsupNumber }}</p>
            </div>
            <van-popup v-model="reportShow">内1容</van-popup>
            <van-popup v-model="thumbsupShow">内2容</van-popup>
          </div>
        </div>
          </div>
        </div>
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
      classify: [
        { id: '1', name: '色情低俗', checked: false },
        { id: '2', name: '政治敏感', checked: false },
        { id: '3', name: '广告垃圾信息', checked: false },
        { id: '4', name: '病毒木马', checked: false },
        { id: '5', name: '其他', checked: false }
      ],
      active: 1,
      activityList: [],
      shareList: [],
      pageNo: 0,
      pageSize: 5,
      activityId: '',
      loading: false,
      finished: false,
      error: false,
      reportShow: false,
      thumbsupShow: false
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
          this.shareList = res.data.records
          this.loading = false
        })
        .catch(e => {
          this.error = true
          console.log(e)
        })
      this.finished = true
    },
    showReportPopup () {
      this.reportShow = true
    },
    showThumbsupPopup () {
      this.thumbsupShow = true
    }
  },
  mounted () {
    this.getActivityList()
  }
}
</script>
