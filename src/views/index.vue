<template>
  <div class="index">
    <!-- <p class="hello" @click="getApi">Hello</p> -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './../components/common/footer'
import { apiTest } from '@/services/api/index'

export default {
  name: 'index',
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
}

</style>
