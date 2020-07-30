<template>
  <div class="ours">
    <div class="oursInfo">
        <van-image class="oursInfoBackgroundImg" :src="require('./../../assets/img/oursBackground.png')" />
        <div class="user">
            <p class="userinfo-nickname">{{ userRelationName ? userRelationName : userPhone }}</p>
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
            <div v-for="item in childrenList" :key="item.id">
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
    <div class="oursActivity" v-if="studentInfo.studentName">
        <van-cell-group v-if="currentStudentAvtivityList.length > 0" :title="studentInfo.studentName + 参加的活动">
            <div v-for="currentStudentAvtivity in currentStudentAvtivityList" :key="currentStudentAvtivity.id">
                <van-cell :thumb="readFile + item.mini_img" :title="item.activity_title" is-link bindtap="goOursJoinActivity"></van-cell>
            </div>
        </van-cell-group>
    </div>
    <div class="oursShare" v-if="studentInfo.studentName">
        <van-cell bindtap="goOursShare" thumb="./../../assets/img/userShare.png" :title="studentInfo.studentName + 的分享" is-link></van-cell>
    </div>
  </div>
</template>
<script>
import {
  apiGetMyChildList
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      userPhone: '',
      studentInfo: {},
      token: '',
      childrenList: [],
      currentStudentAvtivityList: [],
      userRelationName: '',
      readFile: ''
    }
  },
  methods: {
    getMyChildren () {
      apiGetMyChildList().then(res => {
        if (res.code === 1) {
          this.childrenList = res.data
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {
    this.token = sessionStorage.getItem('token')
    this.userPhone = sessionStorage.getItem('userName')
    this.getMyChildren()
  }
}
</script>
