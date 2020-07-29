<template>
  <div class="footer">
    <ul>
      <li v-for="(item, index) in footList" :key="index" @click="nav(item.path)">
        <img :src="item.path === $route.path ? footList[index].active : footList[index].img" alt="">
        <i>{{ item.name }}</i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      footList: [
        { name: '首页', path: '/home', img: require('./../../assets/img/homeLogo.png'), active: require('./../../assets/img/homeLogoActive.png') },
        { name: '参加活动', path: '/activity', img: require('./../../assets/img/activityLogo.png'), active: require('./../../assets/img/activityLogoActive.png') },
        { name: '打卡分享', path: 'clockShare', img: require('./../../assets/img/clockShareLogo.png'), active: require('./../../assets/img/clockShareLogoActive.png') },
        { name: '健康小达人', path: '/healthDarren', img: require('./../../assets/img/healthLogo.png'), active: require('./../../assets/img/healthLogoActive.png') },
        { name: '我的', path: '/ours', img: require('./../../assets/img/oursLogo.png'), active: require('./../../assets/img/oursLogoActive.png') }
      ]
    }
  },
  methods: {
    nav (path) {
      this.$router.replace(path)
    }
  },
  mounted () {
    console.log(this.$route.path)
  }
}
</script>
<style lang="scss" scoped>
.footer {
  height: 60px;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
      }
      i {
        font-style: normal;
      }
    }
  }
}
</style>
