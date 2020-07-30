<template>
  <div class="userSwitch">
    <div class="relatedUser">
        <p>已关联的孩子</p>
        <div class="relatedUserList">
            <div v-for="child in relationChildList" :key="child.id">
                <div bindtap="selectChild">
                    <van-image v-if="child.studentSex * 1 === 1" :src="require('./../../../assets/img/userMan.png')" />
                    <van-image v-if="child.studentSex * 1 === 2" :src="require('./../../../assets/img/userWoman.png')" />
                    <p>{{ child.studentName }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="selectedUser">
        <p>已选中</p>
        <div class="selectedUserInfo">
            <div>
                <van-image v-if="selectChildInfo.studentSex * 1 === 1" :src="require('./../../../assets/img/userMan.png')" />
                <van-image v-if="selectChildInfo.studentSex * 1 === 2" :src="require('./../../../assets/img/userWoman.png')" />
                <p>{{ selectChildInfo.studentName }}</p>
            </div>
        </div>
    </div>
    <div class="userSwitchButton">
        <div bindtap="switchUserDefine">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      relationChild: [],
      selectChildInfo: {}
    }
  }
}
</script>
