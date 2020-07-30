<template>
  <div class="clockIn">
    <div class="clockInContent">
        <p class="clockInHeder">跟我做</p>
        <div class="clockInList" >
          <iframe src="//player.bilibili.com/player.html?aid=838903282&bvid=BV1G54y1S7CR&cid=216039436&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
        </div>
        <div class="weightRecord" v-if="isShowWeightRecord != 1" bindtap="navClockInGoRecord">
            <div class="weightRecordNow">
                <p>当前身高体重</p>
            </div>
            <div class="clockInGoRecord">去记录 <van-icon class="clockInGoRecordIcon" type="ios-arrow-forward" size="24"  /></div>
        </div>
        <div class="clockInFill" style="height: 100rpx;"></div>
        <div class="clockInButtonGroup">
            <van-button class="clockInButton" :disabled="disableFlag"  v-on:click="clockInButton" >
                打卡
            </van-button>
            <van-button class="clockInButton" :disabled="disableFlag"  v-on:click="goShare" >
                去分享
            </van-button>
        </div>
        <van-overlay v-model="showClockInDialog" closeable round >11111
            <div class="clockInPopup">
                <van-image class="popupImg" :src="require('./../../assets/img/clockInSuccess.png')"></van-image>
                <p>恭喜您打卡成功，获得相应积分！</p>
            </div>
        </van-overlay>
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
      isShowWeightRecord: ''
    }
  },
  methods: {
    // 打卡按钮
    clockInButton () {
      const studentInfo = {} // wx.getStorageSync('studentInfo')
      const data = {
        activityId: this.activityId,
        studentId: studentInfo.studentId
      }
      apiJoinClockin().then(res => {
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
    /**
     * 跳转分享
     */
    goShare () {
      this.$router.push({ path: './../share/share?activityId=' + this.activityId })
      this.showClockInDialog = false
    }
  }
}
</script>
