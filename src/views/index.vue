<template>
  <div class="index">
    <!-- <p class="hello" @click="getApi">Hello</p> -->
    <router-view class="indexHome"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './../components/common/footer'

export default {
  name: 'index',
  data () {
    return {
      isShowFoot: true
    }
  },
  components: {
    Footer
  },
  methods: {
    getApi () {
      // let data = {
      //   channelIds: 5
      // }
    },
    getList () {
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.index {
  height: 100%;
  background: #fff;
  .indexHome {
    padding-bottom: 70px;
  }
}

</style>
