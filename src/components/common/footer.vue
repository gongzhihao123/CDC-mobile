<template>
  <div class="footer">
    <ul>
      <li v-for="(item, index) in footList" :key="index" @click="nav(item.path, index)">
        <img :src="item.name === $route.meta.category ? footList[index].active : footList[index].img" alt="">
        <i :class="{selectActive : item.name === $route.meta.category}">{{ item.val }}</i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      footList: [
        { name: 'home', val: '首页', path: '/home', img: require('./../../assets/img/homeLogo.png'), active: require('./../../assets/img/homeLogoActive.png') },
        { name: 'join', val: '参加活动', path: '/joinActivity', img: require('./../../assets/img/activityLogo.png'), active: require('./../../assets/img/activityLogoActive.png') },
        { name: 'clockShare', val: '打卡分享', path: '/clockShare', img: require('./../../assets/img/clockShareLogo.png'), active: require('./../../assets/img/clockShareLogoActive.png') },
        { name: 'daren', val: '健康小达人', path: '/healthDarren', img: require('./../../assets/img/healthLogo.png'), active: require('./../../assets/img/healthLogoActive.png') },
        { name: 'mine', val: '我的', path: '/ours', img: require('./../../assets/img/oursLogo.png'), active: require('./../../assets/img/oursLogoActive.png') }
      ],
      isActivie: 1
    }
  },
  methods: {
    nav (path, index) {
      this.isActivie = index
      this.$router.replace(path)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.footer {
  height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 1PX solid #ccc;
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
        margin-top: 5px;
      }
      .selectActive {
        color: #5CD5A8;
      }
    }
  }
}
</style>
