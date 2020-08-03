<template>
  <div class="punchRecord">
    <!-- <div class="punchRecordBackground">
        <van-image class="punchRecordImgBackground" :src="require('./../../../assets/img/poundRecordBackground.png')" />
    </div> -->
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
        <h2>打卡记录</h2>
        <div class="punchRecordInfoContent">
          <div v-for="month in clockinList" :key="month.name">
            <span>{{ month.name + '月'}}</span>
            <div class="dateBox" >
              <div class="dateBoxInfo">
                <div v-for="day in month.days" :key="day.id">
                  <p v-if="day.clockInFlag" class="selectedDay">{{ day.day }}</p>
                  <p v-else class="nonSelectedDay">{{ day.day }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="punchRecordInfoButton">
            <div v-on:click="goActivityDetail" type="info">去打卡</div>
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
                    <p>被点赞数</p>
                    <p>{{ activityStudent.thumbsupCount }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {
  // apiGetMyChildList,
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
      this.$router.push({ path: '/activityDetail', query: { activityId: this.currentActivityId, activityType: this.currentActivityType } })
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
.punchRecord {
  background: #E9E9E9;
  .punchRecordUser {
    height: 145px;
    background: url(./../../../assets/img/poundRecordBackground.png) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      padding-left: 20px;
      .punchRecordUserImg {
        width: 55px;
        height: 55px;
      }
      .punchRecordUserInfo {
        p {
          margin: 5px 0 5px 15px;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(254,254,254,1);
        }
      }
    }
  }
  .punchRecordInfo {
    height: 100%;
    min-height: 500px;
    margin: -20px 15px 0;
    padding: 20px 16px;
    background: #fff;
    border-radius: 15px;
    h2 {
      font-size: 18px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .punchRecordInfoContent {
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > span {
          display: inline-block;
          margin: 10px 0;
          font-size: 14px;
        }
        .dateBox {
          width: 100%;
          display: flex;
          justify-content: center;
          .dateBoxInfo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            > div {
              width: 14.2%;
              margin: 5px 0;
              display: flex;
              justify-content: center;
              align-items: center;
              .selectedDay {
                padding: 6px;
                border-radius: 50%;
                color: #3CC3A0;
                font-weight: 900;
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
      > div:first-child {
        .dateBox {
          justify-content: flex-start;
          .dateBoxInfo {
            width: 100%;
          }
        }
      }
    }
    .punchRecordInfoButton {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      border-bottom: 1px solid #E5E5E5;
      div {
        width: 50%;
        display: block;
        padding: 10px 8px;
        margin: 6px  6px 12px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        background: linear-gradient(45deg, #07e6da,#1cbbb4);
        border-radius: 20px;
      }
    }
    .userRank {
      > p {
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .userRankInfo {
        display: flex;
        justify-content: space-between;
        margin: 30px 0 60px;
        > div {
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          p:first-child {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(102,102,102,1);
          }
          p:last-child {
            margin-top: 22px;
            font-size: 20px;
            font-family: Calibri;
            font-weight: bold;
          }
        }
        > div:nth-child(2) {
          p:last-child {
            color: rgba(60,195,160,1);
          }
        }
        > div:nth-child(3) {
          p:last-child {
            color: rgba(60,195,160,1);
          }
        }
        > div:nth-child(4) {
          p:last-child {
            color: rgba(210,87,105,1);
          }
        }
      }
    }
  }
}
</style>
