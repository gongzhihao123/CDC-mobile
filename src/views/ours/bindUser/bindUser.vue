<template>
  <div class="bindUser">
    <div class="joinActivityHeader">绑定孩子</div>
    <p class="bindUserTitle">基本情况</p>
    <div class="bindUserinfo">
      <van-field
        readonly
        clickable
        name="picker"
        :value="childrenName"
        label="选择器"
        placeholder="点击选择城市"
        @click="changeSchool"
      />
      <van-popup v-model="selectPopupflag" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          value-key="name"
          @confirm="onConfirm"
          @cancel="selectPopupflag = false"
        ></van-picker>
</van-popup>
    </div>
  </div>
</template>
<script>
import { apiGetSchool } from '@/services/api/index'
export default {
  data () {
    return {
      childrenName: '',
      selectPopupflag: false,
      columns: []
    }
  },
  methods: {
    // 选择学校
    changeSchool () {
      this.getSchoolList()
    },
    // 选择学校确认
    onConfirm () {},
    getSchoolList () {
      apiGetSchool()
        .then(res => {
          if (res.code === 1) {
            this.columns = res.data
            this.selectPopupflag = true
          }
        })
    }
  }
}
</script>
<style lang="scss">
.bindUser {
  .joinActivityHeader {
    display: flex;
    justify-content: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(45deg, #51D0A5,#1cbbb4)
  }
  .bindUserTitle {
    margin: 10px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
}
</style>
