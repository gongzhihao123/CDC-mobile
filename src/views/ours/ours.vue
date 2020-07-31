<template>
  <div class="ours">
    <div class="oursInfo">
        <!-- <van-image class="oursInfoBackgroundImg" :src="require('./../../assets/img/oursBackground.png')" /> -->
        <div class="user">
            <van-image v-if="currentChild.studentSex * 1 === 1" :src="require('./../../assets/img/userMan.png')" />
            <van-image v-if="currentChild.studentSex * 1 === 2" :src="require('./../../assets/img/userWoman.png')" />
            <p class="userinfo-nickname" v-if="currentChild.studentId">{{ currentChild.studentName }}</p>
            <div class="todoChange" v-if="!currentChild.studentId">
              <van-button plain type="primary">请选择孩子</van-button>
            </div>
        </div>
    </div>
    <!-- 用户关系 -->
    <div class="oursRelation">
        <div class="oursRelationHeader">
            <p>我的孩子</p>
            <div @click="goAdd">
                <p>添加</p>
                <van-image class="oursRelationAddImg" :src="require('./.././../assets/img/userAdd.png')" />
            </div>
        </div>
        <div v-if="childrenList.length > 0" class="oursRelationList" >
            <div v-for="item in childrenList" :key="item.id" v-on:click="chooseMyChild(item)">
                <div class="oursRelationListInfo" @click="selectChaneg(item.id)">
                    <van-image v-if="item.studentSex * 1 === 1" :src="require('./../../assets/img/userMan.png')" />
                    <van-image v-if="item.studentSex * 1 === 2" :src="require('./../../assets/img/userWoman.png')" />
                    <div class="oursChildrenList" :class="{ selectChildrenActive:activeIndex * 1 === item.id * 1 }">
                        <div>
                            <p>{{ item.studentName }}</p>
                            <p>{{ item.studentGradeName + item.studentClassName }}</p>
                        </div>
                        <p>{{ item.studentSchoolName }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 参加的活动 -->
    <div class="oursActivity" v-if="currentChild.studentId">
        <van-cell-group v-if="currentStudentActivityList.length > 0" :title="currentChild.studentName + '参加的活动'">
            <van-cell
            v-for="currentStudentAvtivity in currentStudentActivityList"
            :key="currentStudentAvtivity.id"
            :icon="readPath + currentStudentAvtivity.mini_img"
            :title="currentStudentAvtivity.activity_title"
            is-link v-on:click="goMyJoinedActivity(currentStudentAvtivity)" />
        </van-cell-group>
    </div>
    <div class="oursShare" v-if="currentChild.studentName">
        <van-cell v-on:click="goStudentShare" :icon="require('./../../assets/img/userShare.png')" :title="currentChild.studentName + '的分享'" is-link></van-cell>
    </div>
  </div>
</template>
<script>
import {
  apiGetMyChildList,
  apiGetStudentActivityList
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      userPhone: '',
      currentChild: {},
      activeIndex: '',
      token: '',
      childrenList: [],
      currentStudentActivityList: [],
      userRelationName: '',
      readFile: ''
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    goAdd () {
      this.$router.push('/bindUser')
    },
    getMyChildrenList () {
      apiGetMyChildList().then(res => {
        if (res.code === 1) {
          this.childrenList = res.data
          // 如果已绑定孩子 并且 还没有选择孩子 那么自动选择第一个孩子
          const hasChild = this.childrenList && this.childrenList.length > 0
          const noCurrentChild = !window.localStorage.getItem('currentChildId')
          if (hasChild && noCurrentChild) {
            this.chooseMyChild(this.childrenList[0])
            this.activeIndex = this.childrenList[0].id
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getStudentActivityList () {
      apiGetStudentActivityList(this.currentChild.studentId).then(res => {
        if (res.code === 1) {
          this.currentStudentActivityList = res.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    selectChaneg (id) {
      this.activeIndex = id
      sessionStorage.setItem('activeIndex', id)
    },
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
    chooseMyChild (myChild) {
      window.localStorage.setItem('currentChildId', myChild.studentId)
      window.localStorage.setItem('currentChildName', myChild.studentName)
      window.localStorage.setItem('currentChildSex', myChild.studentSex)
      window.localStorage.setItem('currentRelation', myChild.relation)
      window.localStorage.setItem('currentSchoolName', myChild.studentSchoolName)
      window.localStorage.setItem('currentGradeName', myChild.studentGradeName)
      window.localStorage.setItem('currentClassName', myChild.studentClassName)
      this.initCurrentChild()
      this.initMineData()
    },
    initMineData () {
      this.getStudentActivityList()
    },
    goMyJoinedActivity (studentActivity) {
      this.$router.push({
        path: '/punchRecord',
        query: {
          activityId: studentActivity.activity_id,
          activityType: studentActivity.activity_type,
          clockInCount: studentActivity.clock_in_count,
          shareCount: studentActivity.share_count,
          thumbsupCount: studentActivity.thumbsup_count
        }
      })
    },
    // 跳转活动详情
    goStudentShare () {
      this.$router.push({ path: '/userActivityRecord' })
    }
  },
  mounted () {
    this.getMyChildrenList()
    this.initCurrentChild()
    this.activeIndex = sessionStorage.getItem('activeIndex')
    this.getStudentActivityList()
  }
}
</script>
<style lang="scss">
.ours {
  .oursInfo {
    background: url(./../../assets/img/oursBackground.png) no-repeat;
    background-size: 100% 100%;
    .user {
      display: flex;
      align-items: center;
      padding: 17px 0 17px 30px;
      .van-image {
        width: 60px;
        height: 60px;
      }
      p {
        margin-left: 8px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
    }
  }
  .oursRelation {
    padding: 10px;
    .oursRelationHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      > p {
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      > div {
        display: flex;
        align-items: center;
        > p {
          font-size:14px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
        .oursRelationAddImg {
          width: 18px;
          height: 18px;
          margin-left: 6px;
        }
      }
    }
    .oursRelationList {
      display: flex;
      flex-direction: column;
      > div {
        margin: 5px 0;
        .oursRelationListInfo {
          display: flex;
          align-items: center;
          .van-image {
            width: 44px;
            margin-right: 10px;
          }
          .oursChildrenList {
            width: 100%;
            display: flex;
            flex-direction: column;
            > div {
              display: flex;
              margin-bottom: 5px;
              p {
                font-size:14px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
              }
              p:last-child {
                margin-left: 8px;
                color: #666666;
              }
            }
            > p {
              font-size:14px;
              font-family:PingFang SC;
              font-weight:bold;
              color:#666666;
            }
          }
        }
      }
    }
    .selectChildrenActive {
      background: url(./../../assets/img/selectChild.png) no-repeat right;
      p {
        color:#5CD5A8 !important;
      }
    }
  }
  .oursActivity {
    border-top: 1PX solid #E5E5E5;
    > div {
      .van-cell-group__title {
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .van-cell-group {
        .van-cell {
          .van-cell__left-icon {
            width: 65px;
            height: 38px;
            .van-icon__image {
              width: 65px;
              height: 38px;
            }
          }
          .van-cell__title {
            display: flex;
            align-items: center;
            > span {
              font-size:16px;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(51,51,51,1);
            }
          }
        }
      }
    }
  }
  .oursShare {
    border-top: 1px solid #E5E5E5;
    .van-cell {
      display: flex;
      align-items: center;
      .van-cell__left-icon {
        .van-icon__image {
          width: 22px;
          height: 22px;
        }
      }
      .van-cell__title {
        display: flex;
        align-items: center;
        > span {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }
  }
}
</style>
