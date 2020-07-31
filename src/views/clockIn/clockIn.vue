<template>
  <div class="clockIn">
    <div class="joinActivityHeader">活动专区</div>
    <div class="clockInContent">
        <p class="clockInHeder">跟我做</p>
        <div class="clockInList" >
          <iframe v-if="activityType == 1" src = "https://xbeibeix.com/api/bilibili/biliplayer/?url=BV16p4y1i7pf" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"/>
          <iframe v-if="activityType == 2" src = "https://xbeibeix.com/api/bilibili/biliplayer/?url=BV1G54y1S7CR" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"/>
          <iframe v-if="activityType == 2" src = "https://xbeibeix.com/api/bilibili/biliplayer/?url=BV1Gt4y1X7z5" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"/>
          <iframe v-if="activityType == 2" src = "https://xbeibeix.com/api/bilibili/biliplayer/?url=BV1PD4y1D7sY" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"/>
          <iframe v-if="activityType == 2" src = "https://xbeibeix.com/api/bilibili/biliplayer/?url=BV1954y1q7KS" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"/>
          <!-- <iframe v-if="activityType == 1" src="//player.bilibili.com/player.html?aid=968931122&bvid=BV16p4y1i7pf&cid=216047596&page=1&danmaku=0" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          <iframe v-if="activityType == 2" src="//player.bilibili.com/player.html?aid=838903282&bvid=BV1G54y1S7CR&cid=216039436&page=1&danmaku=0" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          <iframe v-if="activityType == 2" src="//player.bilibili.com/player.html?aid=626453689&bvid=BV1Gt4y1X7z5&cid=216037615&page=1&danmaku=0" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          <iframe v-if="activityType == 2" src="//player.bilibili.com/player.html?aid=711414755&bvid=BV1PD4y1D7sY&cid=216046566&page=1&danmaku=0" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
          <iframe v-if="activityType == 2" src="//player.bilibili.com/player.html?aid=841447527&bvid=BV1954y1q7KS&cid=216043111&page=1&danmaku=0" style="width: 100%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> -->
        </div>
        <div class="weightRecord" v-if="isShowWeightRecord != 1" @click="navClockInGoRecord">
            <div class="weightRecordNow">
                <p>当前身高体重</p>
            </div>
            <div class="clockInGoRecord">去记录 <van-icon name="arrow" /></div>
        </div>
        <div class="clockInButtonGroup">
            <van-button class="clockInButton" :disabled="disableFlag"  v-on:click="clockInButton" >
                打卡
            </van-button>
            <van-button class="clockInButton" :disabled="disableFlag"  v-on:click="goShare" >
                去分享
            </van-button>
        </div>
        <van-dialog v-model="showClockInDialog" @confirm="dialogConfirmButton" @cancel="dialogConfirmButton" @close="dialogConfirmButton" title="">
           <div class="clockInPopup">
                <van-image class="popupImg" :src="require('./../../assets/img/clockInSuccess.png')"></van-image>
                <p>恭喜您打卡成功，获得相应积分！</p>
            </div>
        </van-dialog>
    </div>
  </div>
</template>
<script>
import {
  apiJoinClockin,
  apiGetSharePageByActivity
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      showClockInDialog: false,
      disableFlag: false,
      isShowWeightRecord: '',
      activityId: '',
      activityType: '',
      antifatDataId: '',
      isBefore: false
    }
  },
  mounted () {
    const isBefore = this.$route.query.isBefore
    if (isBefore) {
      this.isBefore = isBefore
    }
    const antifatDataId = this.$route.query.antifatDataId
    if (antifatDataId) {
      this.antifatDataId = antifatDataId
    }
    this.activityId = this.$route.query.activityId
    this.activityType = this.$route.query.activityType

    if (this.activityType * 1 === 2) {
      this.isShowWeightRecord = sessionStorage.getItem('isShowWeightRecord')
      if (this.isShowWeightRecord === 1) {
        // 第二次
        this.judgeDate()
      } else {
        this.isShowWeightRecord = 0
      }
    } else {
      this.isShowWeightRecord = 1
    }
  },
  methods: {
    /**
     * 判断当前时间是否在结束日期内
     */
    judgeDate () {
      const nowDay = new Date().getDate()
      const nowMonth = new Date().getMonth() + 1
      if (nowMonth === 8) {
        if (nowDay === 29 || nowDay === 30 || nowDay === 31) {
          this.isShowWeightRecord = 2
        } else {
          this.isShowWeightRecord = 1
        }
      } else {
        this.isShowWeightRecord = 1
      }
    },
    // 打卡按钮
    clockInButton () {
      const studentInfo = {} // wx.getStorageSync('studentInfo')
      const data = {
        activityId: this.activityId,
        studentId: 1
      }
      apiJoinClockin(data).then(res => {
        if (res.data.code === 1) {
          this.showClockInDialog = true
        } else {
          this.$toast(res.data.message)
        }
      })
        .catch(e => {
          console.log(e)
        })
    },
    dialogConfirmButton () {
      this.showClockInDialog = false
    },
    // 跳转记录页
    navClockInGoRecord () {
      this.$router.push({ path: '/record', query: { isBefore: this.isBefore, antifatDataId: this.antifatDataId } })
    },
    /**
     * 跳转分享
     */
    goShare () {
      this.$router.push({ path: '/share', query: { activityId: this.activityId } })
    }
  }
}
</script>
<style lang="scss">
.clockIn {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4);
  }
  .clockInContent {
    padding: 0 10px;
    .clockInHeder {
      display: inline-block;
      margin: 10px 0;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .clockInList {
      padding-bottom: 10px;
      border-bottom: 1PX solid rgba(229,229,229,1);
    }
    .weightRecord {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding: 10px 0;
      .weightRecordNow {
        p {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
      .clockInGoRecord {
        display: flex;
        align-items: center;
        font-size:15px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(102,102,102,1);
      }
    }
    .clockInButtonGroup {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      background: #fff;
      .clockInButton {
        width: 120px;
        border-radius: 15px;
        font-size: 17px;
        color: #fff;
        background: linear-gradient(45deg, #07e6da, #1cbbb4)
      }
    }
    .van-dialog {
      .van-dialog__content {
        margin-top: 15px;
        .clockInPopup {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .popupImg {
            width: 66px;
            height: 66px;
          }
          p {
            margin: 14px 0;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(60,195,160,1);
          }
        }
      }
    }
  }
}
</style>
