<template>
  <div class="ours">
    <div class="joinActivityHeader">我的</div>
    <div class="oursInfo"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
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
