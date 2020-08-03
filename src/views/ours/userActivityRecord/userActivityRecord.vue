<template>
  <div class="userActivityRecord" ref="oursScroll">
    <div class="userActivityRecordHeader">我的分享</div>
    <div class="activlty">
      <van-tabs v-model="active" v-on:change="tabChange">
        <van-tab v-for="activity in activityList" :key="activity.id" :name="activity.id" :title="activity.title"></van-tab>
      </van-tabs>
    </div>
    <div class="share">
      <div class="clockShareInfo" v-for="(share, index) in shareList" :key="index" >
        <!-- <van-image class="clockShareInfoTitleImg" :src="readPath + share.wechatUserImg"></van-image> -->
        <div class="clockShareInfoMain">
          <div class="clockShareInfoHeader">{{ share.studentName }}</div>
          <p>{{ share.content }}</p>
          <div v-if="share.contentImg" class="clockShareInfoMainImgBox">
            <van-image class="clockShareInfoMainImg" fit="cover" @click="imgPreview(share.contentImg)" :src="readPath + share.contentImg"></van-image>
          </div>
          <div class="clockShareInfoFoot">
            <p>{{ share.createdTime[0] + '-' + share.createdTime[1] + '-' + share.createdTime[2] + ' ' + share.createdTime[3] + ':' + share.createdTime[4] + ':' + share.createdTime[5] }}</p>
            <div class="articleOperation">
              <div>
                <van-button :icon="require('./../../../assets/img/articleParise.png')">点赞</van-button>
                <p>{{ share.thumbsupNumber }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ImagePreview } from 'vant'
import {
  apiGetActivityList,
  apiGetSharePageByActivity
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      currentChild: {},
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
      error: false
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
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
    // 标签切换
    tabChange (tabName) {
      this.activityId = tabName
      this.getShareList()
    },
    async getShareList () {
      await apiGetSharePageByActivity(this.pageNo, this.pageSize, { activityId: this.activityId, studentId: this.currentChild.studentId })
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
      this.finished = true
    },
    showReportPopup (e) {
      this.shareId = e
      this.reportShow = true
    },
    imgPreview (url) {
      const arr = []
      const imgUrl = window.location.origin + '/activity/common/attachment?filepath=' + url
      arr.push(imgUrl)
      ImagePreview(arr)
    },
    onOursScroll () {
      const innerHeight = this.$refs.scroll.clientHeight
      const outerHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop
      if (innerHeight <= outerHeight + scrollTop) {
        this.pageNo++
        this.getShareList()
      }
    }
  },
  async mounted () {
    window.addEventListener('oursScroll', this.onOursScroll)
    this.$set(this.currentChild, 'studentId', window.localStorage.getItem('currentChildId'))
    await this.getActivityList()
    await this.getShareList()
  },
  destroyed () {
    window.removeEventListener('oursScroll', this.onOursScroll)
  }
}
</script>

<style lang="scss">
.userActivityRecord {
  .userActivityRecordHeader {
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
          margin: 10px 0;
          overflow: hidden;
          .van-image {
            height: 150px;
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
        .van-overlay {
          opacity: .3;
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
