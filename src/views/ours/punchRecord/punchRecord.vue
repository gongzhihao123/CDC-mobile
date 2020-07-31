<template>
  <div class="punchRecord">
    <div class="punchRecordBackground">
        <van-image class="punchRecordImgBackground" :src="require('./../../../assets/img/poundRecordBackground.png')" />
    </div>
    <div class="punchRecordUser">
        <div>
            <van-image v-if="currentChild.studentSex*1 === 1" class="punchRecordUserImg" :src="require('./../../../assets/img/userMan.png')" />
            <van-image v-if="currentChild.studentSex*1 === 2" class="punchRecordUserImg" :src="require('./../../../assets/img/userWoman.png')" />
            <div class="punchRecordUserInfo">
                <p>{{ currentChild.studentName }}</p>
                <p>{{ currentChild.studentSchoolName }} {{ currentChild.studentGradeName + currentChild.studentClassName }}</p>
            </div>
        </div>
    </div>
    <!-- 打卡记录 -->
    <div class="punchRecordInfo">
        <div class="punchRecordInfoContent">
          <div v-for="month in clockinList" :key="month.name">
            <span>{{ month.name + '月'}}</span>
            <div class="dateBox" >
              <div v-for="day in month.days" :key="day.id">
                <p v-if="day.clockInFlag" class="selectedDay">{{ day.day }}</p>
                <p v-else class="nonSelectedDay">{{ day.day }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="punchRecordInfoButton">
            <van-button v-on:click="goActivityDetail" type="info">去打卡</van-button>
        </div>
        <div class="userRank">
            <p>我当前的排名</p>
            <div class="userRankInfo">
                <div>
                    <p>排名</p>
                    <p>未开启</p>
                </div>
                <div>
                    <p>打卡次数</p>
                    <p>{{ activityStudent.clockInCount }}</p>
                </div>
                <div>
                    <p>分享次数</p>
                    <p>{{ activityStudent.shareCount }}</p>
                </div>
                <div>
                    <p>点赞数</p>
                    <p>{{ activityStudent.thumbsupCount }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {
  apiGetMyChildList,
  apiGetClockinList
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      userPhone: '',
      currentActivityId: '',
      currentChild: {},
      activityStudent: {},
      clockinList: []
    }
  },
  methods: {
    initCurrentChild () {
      this.userPhone = window.localStorage.getItem('userName')
      this.$set(this.currentChild, 'studentId', window.localStorage.getItem('currentChildId'))
      this.$set(this.currentChild, 'studentName', window.localStorage.getItem('currentChildName'))
      this.$set(this.currentChild, 'studentSex', window.localStorage.getItem('currentChildSex'))
      this.$set(this.currentChild, 'relation', window.localStorage.getItem('currentRelation'))
      this.$set(this.currentChild, 'studentSchoolName', window.localStorage.getItem('currentSchoolName'))
      this.$set(this.currentChild, 'studentGradeName', window.localStorage.getItem('currentGradeName'))
      this.$set(this.currentChild, 'studentClassName', window.localStorage.getItem('currentClassName'))
    },
    goActivityDetail () {
      this.$router.push({ path: '/activityDetail', query: { activityid: this.currentActivityId, activityType: this.currentActivityType } })
    },
    getClockinList () {
      apiGetClockinList(this.currentActivityId, this.currentChild.studentId).then(res => {
        const cList = res.data
        const dateSet = {}
        cList.forEach(e => {
          if (!dateSet[e.month]) {
            dateSet[e.month] = {
              name: e.month,
              days: []
            }
          }
          dateSet[e.month].days.push(e)
        })
        this.clockinList = dateSet
      })
    }
  },
  mounted () {
    this.currentActivityId = this.$route.query.activityId
    this.currentActivityType = this.$route.query.activityType
    this.activityStudent.clockInCount = this.$route.query.clockInCount
    this.activityStudent.shareCount = this.$route.query.shareCount
    this.activityStudent.thumbsupCount = this.$route.query.thumbsupCount
    this.initCurrentChild()
    this.getClockinList()
  }
}
</script>
<style lang="scss">
.punchRecordInfoContent {
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .dateBox {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      > div {
        width: 13%;
        .selectedDay {
          padding: 6px;
          background: #3CC3A0;
          color: #fff;
          display: inline-block;
        }
        .nonSelectedDay {
          padding: 6px;
          background: #fff;
          display: inline-block;
        }
      }
    }
  }
}
</style>
