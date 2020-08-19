<template>
  <div class="joinActivity">
    <div class="joinActivityHeader">活动专区</div>
      <div class="activityContent">
          <div v-for="activity in activityList" :key="activity.id">
              <div class="activityContentBox" @click="goActivityDetail(activity.id, activity.type, activity.title)">
                  <van-image :src="readPath + activity.entranceImg"></van-image>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import {
  apiGetActivityList
} from '@/services/api/index_cs'
export default {
  data () {
    return {
      activityList: []
    }
  },
  computed: {
    readPath () {
      return 'https://jk.meetyuu.com/app/'
    }
  },
  methods: {
    // 获取活动列表
    getActivityList () {
      apiGetActivityList()
        .then(res => {
          this.activityList = res.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 跳转活动详情
    goActivityDetail (activityid, activityType, activityTitle) {
      this.$router.push({ path: '/activityDetail', query: { activityId: activityid, activityType: activityType, activityTitle: activityTitle } })
    }
  },
  mounted () {
    this.getActivityList()
  }
}
</script>
<style lang="scss">
.joinActivity {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .activityContent {
    padding: 20px 10px;
    .activityContentBox {
      margin-bottom: 10px;
    }
  }
}
</style>
