<template>
  <div class="index">
    <!-- <p class="hello" @click="getApi">Hello</p> -->
    <router-view class="indexHome"></router-view>
    <Footer v-if="isShowFoot"></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './../components/common/footer'
import { apiTest } from '@/services/api/index'

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
  watch: {
    $route (e) {
      const ThisPage = e.name
      if (ThisPage === 'home' || ThisPage === 'joinActivity' || ThisPage === 'clockShare' || ThisPage === 'healthDarren' || ThisPage === 'ours') {
        this.isShowFoot = true
      } else {
        this.isShowFoot = false
      }
    }
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
    margin-bottom: 70px;
  }
}

</style>
