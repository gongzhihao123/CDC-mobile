<template>
  <div class="activityDetail">
    <div class="activityTitle">
      <div class="activityHeader">
        <van-image v-if="activityType == 1" :src="require('./../../../assets/img/activityThemeEye.png')" />
        <van-image v-if="activityType == 2" :src="require('./../../../assets/img/activityThemeFat.png')" />
      </div>
      <!-- 活动简介 -->
      <div class="activityMaterial">
        <p>主办方：北京市怀柔区疾病预防控制中心</p>
        <p class="activityMaterialActive">协办方：怀柔区中小学卫生保健所</p>
        <div class="activityInfo" >
          <p class="activityInfoTitle" >活动介绍：</p>
          <p v-if="activityType == 1" class="model_text" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为全区中小学生暑期爱护眼睛工作，鼓励学生每天都做一次眼保健操，区疾病预防控制中心和区中小学生卫生保健所，共同举办爱眼睛主题云活动，通过自愿在小程序上完成打卡、分享等活动，结算最终积分，并给予奖励，培养良好的用眼习惯</p>
          <p v-if="activityType == 2" class="model_text" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鼓励全区中小学生利用暑期因地制宜的进行丰富多样的活动，每日完成小程序里的动起来打卡分享，获得活动积分（首次活动和活动结束前三天，参加活动的同学需两次手动填入实时身高体重信息）。学生可以通过合理膳食、健康运动达到减重的效果，同时还可以强健体魄，实现吃动平衡的目
的，培养学生良好的膳食及运动习惯。</p>
          <p v-on:click="navMoreDetail" class="model_detail">…<p class="more_detail" >详情 >></p>
        </div>
      </div>
    </div>
    <div class="activityContent" id="activityList">
      <div class="activityFootFill" ></div>
      <div class="activityFoot">
        <div class="activityFootButton" v-on="joinActivity">参与活动</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  apiJoinActivity
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      activityType: '',
      activityId: '',
      isBefore: ''
    }
  },
  mounted () {
    this.activityId = this.$route.query.activityId
    this.activityType = this.$route.query.activityType
  },
  methods: {
    navMoreDetail () {
      this.$router.push({ path: '/activitySuggest' + this.activityType, query: { activityId: this.activityId } })
    },
    joinActivity () {
      const studentInfo = {}// wx.getStorageSync('studentInfo')
      const that = this
      const data = {
        activityId: this.activityId,
        activityTitle: this.activityTitle,
        studentId: studentInfo.studentId
      }
      apiJoinActivity(data)
        .then((res) => {
          if (res.code === 1) {
            // 判断是否为控肥胖活动
            if (this.activityType * 1 === 2 * 1) {
              let antifatDataId = ''
              let isBefore = false
              if (res.data.beforeBmi === null) {
                isBefore = true
              } else {
                isBefore = false
                // wx.setStorageSync('beforeRrcord', res.data)
              }
              antifatDataId = res.data.id
              this.$router.push({ path: './../../clockIn/clockIn?activityId=' + this.activityId + '&isBefore=' + isBefore + '&antifatDataId=' + antifatDataId + '&activityType=' + this.activityType })
            } else {
              this.$router.push({ path: './../../clockIn/clockIn?activityId=' + this.activityId + '&activityType=' + this.activityType })
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
