<template>
  <div class="ours">
    <div class="oursInfo">
        <van-image class="oursInfoBackgroundImg" :src="require('./../../assets/img/oursBackground.png')" />
        <div class="user">
            <van-image v-if="currentChild.studentSex * 1 === 1" :src="require('./../../assets/img/userMan.png')" />
            <van-image v-if="currentChild.studentSex * 1 === 2" :src="require('./../../assets/img/userWoman.png')" />
            <p class="userinfo-nickname">{{ currentChild.studentId !== undefined ? currentChild.studentName : userPhone }}</p>
        </div>
        <van-image bindtap="goSwitch" class="userChange" :src="require('./../../assets/img/userSwitch.png')" />
    </div>
    <!-- 用户关系 -->
    <div class="oursRelation">
        <div class="oursRelationHeader">
            <p>我的孩子</p>
            <div bindtap="goAdd">
                <p>添加</p>
                <van-image class="oursRelationAddImg" :src="require('./.././../assets/img/userAdd.png')" />
            </div>
        </div>
        <div v-if="childrenList.length > 0" class="oursRelationList">
            <div v-for="item in childrenList" :key="item.id" v-on:click="chooseMyChild(item)">
                <div>
                    <van-image v-if="item.studentSex * 1 === 1" :src="require('./../../assets/img/userMan.png')" />
                    <van-image v-if="item.studentSex * 1 === 2" :src="require('./../../assets/img/userWoman.png')" />
                    <div class="oursChildrenList">
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
        <van-cell :icon="require('./../../assets/img/userShare.png')" :title="currentChild.studentName + '的分享'" is-link></van-cell>
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
    getMyChildrenList () {
      apiGetMyChildList().then(res => {
        if (res.code === 1) {
          this.childrenList = res.data
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
    initCurrentChild () {
      this.userPhone = sessionStorage.getItem('userName')
      this.$set(this.currentChild, 'studentId', sessionStorage.getItem('currentChildId'))
      this.$set(this.currentChild, 'studentName', sessionStorage.getItem('currentChildName'))
      this.$set(this.currentChild, 'studentSex', sessionStorage.getItem('currentChildSex'))
      this.$set(this.currentChild, 'relation', sessionStorage.getItem('currentRelation'))
      this.$set(this.currentChild, 'studentSchoolName', sessionStorage.getItem('currentSchoolName'))
      this.$set(this.currentChild, 'studentGradeName', sessionStorage.getItem('currentGradeName'))
      this.$set(this.currentChild, 'studentClassName', sessionStorage.getItem('currentClassName'))
    },
    chooseMyChild (myChild) {
      sessionStorage.setItem('currentChildId', myChild.studentId)
      sessionStorage.setItem('currentChildName', myChild.studentName)
      sessionStorage.setItem('currentChildSex', myChild.studentSex)
      sessionStorage.setItem('currentRelation', myChild.relation)
      sessionStorage.setItem('currentSchoolName', myChild.studentSchoolName)
      sessionStorage.setItem('currentGradeName', myChild.studentGradeName)
      sessionStorage.setItem('currentClassName', myChild.studentClassName)
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
    }
  },
  mounted () {
    this.getMyChildrenList()
    this.initCurrentChild()
  }
}
</script>
<style lang="scss">
.ours {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: url(./../../assets/img/oursHeader.png) no-repeat;
    background-size: 100% 100%;
  }
  .ours {
    position: relative;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>
