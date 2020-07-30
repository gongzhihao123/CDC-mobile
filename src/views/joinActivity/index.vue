<template>
  <div class="activity">
    <div class="activity">
      <div class="activityContent">
          <div v-for="activity in activityList" :key="activity.id">
              <div class="activityContentBox" >
                  <van-image :src="readPath + activity.entranceImg"></van-image>
              </div>
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
      return window.location.origin + '/activity/common/attachment?filepath='
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
    }
  },
  mounted () {
    this.getActivityList()
  }
}
</script>
