<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>漫画科普 | 近视到底怎么防？同仁眼科专家给你讲讲</p>
          <p decode="true"> {{ time }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <div class='div_img' v-for="(image, index) in imgList" :item="image" :key="index">
              <van-image lazy-load :src="readPath + image"/>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { apiArticleReading } from '@/services/api/index_cs'
export default {
  data () {
    return {
      imgList: [
        'articleimage/19/' + 1 + '.jpeg',
        'articleimage/19/' + 2 + '.jpeg',
        'articleimage/19/' + 3 + '.jpeg',
        'articleimage/19/' + 4 + '.jpeg',
        'articleimage/19/' + 5 + '.jpeg',
        'articleimage/19/' + 6 + '.jpeg',
        'articleimage/19/' + 7 + '.jpeg',
        'articleimage/19/' + 8 + '.jpeg',
        'articleimage/19/' + 9 + '.jpeg',
        'articleimage/19/' + 10 + '.jpeg',
        'articleimage/19/' + 11 + '.jpeg',
        'articleimage/19/' + 12 + '.jpeg',
        'articleimage/19/' + 13 + '.jpeg',
        'articleimage/19/' + 14 + '.jpeg',
        'articleimage/19/' + 15 + '.jpeg',
        'articleimage/19/' + 16 + '.jpeg',
        'articleimage/19/' + 17 + '.jpeg',
        'articleimage/19/' + 18 + '.jpeg',
        'articleimage/19/' + 19 + '.jpeg',
        'articleimage/19/' + 20 + '.jpeg',
        'articleimage/19/' + 21 + '.jpeg',
        'articleimage/19/' + 22 + '.jpeg',
        'articleimage/19/' + 23 + '.jpeg',
        'articleimage/19/' + 24 + '.jpeg',
        'articleimage/19/' + 25 + '.jpeg',
        'articleimage/19/' + 26 + '.jpeg',
        'articleimage/19/' + 27 + '.jpeg',
        'articleimage/19/' + 28 + '.jpeg',
        'articleimage/19/' + 29 + '.jpeg',
        'articleimage/19/' + 30 + '.jpeg',
        'articleimage/19/' + 31 + '.jpeg',
        'articleimage/19/' + 32 + '.jpeg',
        'articleimage/19/' + 33 + '.jpeg',
        'articleimage/19/' + 34 + '.jpeg',
        'articleimage/19/' + 35 + '.jpeg',
        'articleimage/19/' + 36 + '.jpeg',
        'articleimage/19/' + 37 + '.jpeg',
        'articleimage/19/' + 38 + '.jpeg',
        'articleimage/19/' + 39 + '.jpeg',
        'articleimage/19/' + 40 + '.jpeg'
      ],
      timer: '',
      time: '',
      clickCount: 0
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  mounted () {
    this.initTimer()
  },
  beforeDestroy () {
    this.destoryTimer()
  },
  methods: {
    initTimer () {
      this.timer = setInterval(() => { this.getReading() }, 10000)
    },
    destoryTimer () {
      clearInterval(this.timer)
    },
    getReading () {
      apiArticleReading(19)
        .then(res => {})
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
