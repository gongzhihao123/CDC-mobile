<template>
  <div class="clockShare" ref="scroll">
    <div class="clockShareHeader">打卡分享</div>
    <div class="activlty">
      <van-tabs v-model="active" v-on:change="tabChange" sticky>
        <van-tab v-for="activity in activityList" :key="activity.id" :name="activity.id" :title="activity.title"></van-tab>
      </van-tabs>
    </div>
    <div class="share">
        <div class="clockShareInfo" v-for="(share, index) in shareList" :key="index" >
          <div class="clockShareInfoMain">
            <div class="clockShareInfoHeader">{{ share.studentName }}</div>
            <p>{{ share.content }}</p>
            <div v-if="share.contentImg" class="clockShareInfoMainImgBox">
              <van-image class="clockShareInfoMainImg"  @click="imgPreview(share.contentImg)" :src="readPath + share.contentImg" v-lazy="readPath + share.contentImg"></van-image>
            </div>
            <div class="clockShareInfoFoot">
              <p>{{ share.createdTime[0] + '-' + share.createdTime[1] + '-' + share.createdTime[2] + ' ' + share.createdTime[3] + ':' + share.createdTime[4] + ':' + share.createdTime[5] }}</p>
              <div class="articleOperation">
                <div>
                  <van-button @click="showReportPopup(share.id)" :icon="require('./../../assets/img/articleReport.png')">举报</van-button>
                </div>
                <div>
                  <van-button @click="showThumbsupPopup(share)" :icon="require('./../../assets/img/articleParise.png')">点赞</van-button>
                  <p>{{ share.thumbsupNumber }}</p>
                </div>
              </div>
            </div>
            <van-dialog v-model="reportShow" title="举报" show-cancel-button @confirm="reportHandleDefine" @cancel="reportHandleClose" @close="reportHandleClose">
              <div class="articlePopupContent">
                <van-radio-group v-model="reason" direction="horizontal">
                  <van-radio v-for="item in classify" :key="item.id" :name="item.id">{{ item.name }}</van-radio>
                </van-radio-group>
                <van-field v-model="reasonContent" rows="3" autosize label="" type="textarea" placeholder="请输入留言" />
              </div>
            </van-dialog>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import {
  apiGetActivityList,
  apiGetSharePageByActivity,
  apiReportHandle,
  apiSpotPraise
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
      reason: '',
      reasonContent: '',
      active: 1,
      activityList: [],
      shareId: '',
      shareList: [],
      pageNo: 1,
      pageSize: 7,
      total: '',
      activityId: '',
      loading: false,
      finished: false,
      error: false,
      reportShow: false
    }
  },
  computed: {
    readPath () {
      return 'https://jk.meetyuu.com/app/'
    }
  },
  methods: {
    // 获取活动列表
    async getActivityList () {
      await apiGetActivityList()
        .then(res => {
          this.activityList = res.data
          this.activityId = res.data[0].id
        })
        .catch(e => {
          console.log(e)
        })
    },
    onScroll () {
      const innerHeight = this.$refs.scroll.clientHeight
      const outerHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop
      if (innerHeight <= outerHeight + scrollTop) {
        if (this.finished !== true) {
          this.pageNo++
          this.getShareList()
        }
      }
    },
    // 标签切换
    async tabChange (tabName) {
      this.activityId = tabName
      this.pageNo = 1
      this.shareList = []
      await this.getShareList()
    },
    async getShareList () {
      await apiGetSharePageByActivity(this.pageNo, this.pageSize, { activityId: this.activityId })
        .then(res => {
          if (res.code === 1) {
            if (res.data.records.length > 0) {
              this.shareList = this.shareList.concat(res.data.records)
              this.finished = false
            } else {
              this.finished = true
              this.$toast('已经到底啦')
            }
          }
        })
        .catch(e => {
          this.error = true
        })
    },
    showReportPopup (e) {
      this.shareId = e
      this.reportShow = true
    },
    /**
     * 点赞
     */
    showThumbsupPopup (e) {
      const currentChildId = window.localStorage.getItem('currentChildId')
      const data = {
        activityId: e.activityId,
        shareStudentId: e.studentId,
        studentId: currentChildId
      }
      apiSpotPraise(e.id, data)
        .then(res => {
          if (res.code === 1) {
            e.thumbsupNumber += 1
            this.$toast(res.message)
          } else {
            this.$toast(res.message)
          }
        })
    },
    /**
       * 举报确认
       */
    reportHandleDefine () {
      const currentChildId = window.localStorage.getItem('currentChildId')
      const currentChildName = window.localStorage.getItem('currentChildName')
      const data = {
        reason: this.reason,
        reasonContent: this.reasonContent,
        studentId: currentChildId,
        studentName: currentChildName
      }
      apiReportHandle(this.shareId, data)
        .then(res => {
          if (res.code === 1) {
            this.$toast(res.message)
            this.getShareList()
          } else {
            this.$toast(res.message)
          }
        })
    },
    /**
     * 举报弹窗关闭
     */
    reportHandleClose () {
      this.reportShow = false
      this.reason = ''
      this.reasonContent = ''
    },
    imgPreview (url) {
      const arr = []
      const imgUrl = window.location.origin + '/activity/common/attachment?filepath=' + url
      arr.push(imgUrl)
      ImagePreview(arr)
    },
    checkHasChild () {
      const currentChildId = window.localStorage.getItem('currentChildId')
      if (currentChildId === null) {
        this.$toast.fail('请先绑定孩子')
        this.$router.push({ path: '/bindUser' })
      }
    }
  },
  async mounted () {
    this.checkHasChild()
    window.addEventListener('scroll', this.onScroll)
    await this.getActivityList()
    await this.getShareList()
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="scss">
.clockShare {
  .clockShareHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .share {
    padding: 0 10px;
    .clockShareInfo {
      display: flex;
      align-items: flex-start;
      padding: 20px 15px 10px;
      border-bottom: 1PX solid #E5E5E5;
      .clockShareInfoTitleImg {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
      .clockShareInfoMain {
        width: 100%;
        .clockShareInfoHeader {
          color: #2DB58F;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .clockShareInfoMainImgBox {
          height: 150px;
          width: 100%;
          overflow: hidden;
          margin: 10px 0;
          overflow: hidden;
          .van-image {
            height: auto;
          }
        }
        > p {
          line-height: 23px;
          color: #333333;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .clockShareInfoFoot {
          width: 100%;
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .articleOperation {
            display: flex;
            div {
              .van-button {
                border: none;
                padding: 0 8px 0 0;
                .van-button__content {
                  display: flex;
                  flex-direction: row-reverse;
                  .van-icon {
                    margin-left: 3px;
                  }
                }
              }
            }
            div:last-child {
              display: flex;
              align-items: center;
            }
          }
        }
        .van-dialog {
          .van-dialog__header {
            padding-top: 15px;
            line-height: 15px;
          }
          .van-dialog__content {
            .articlePopupContent {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .van-radio-group {
                margin: 5px 8px;
                .van-radio {
                  > span {
                    font-size: 13px;
                  }
                  .van-radio__icon {
                    font-size: 16px;
                  }
                }
              }
              .van-cell{
                padding: 10px 8px;
                .van-field__value {
                  background: rgba(240,241,243,1);
                  border-radius: 12px;
                  padding: 5px 8px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
