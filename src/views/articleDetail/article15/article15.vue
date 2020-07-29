<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p> 夏天护眼小知识</p>
          <p decode="true"> {{ time }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <p>炎炎夏日，阳光炙烤着大地，也炙烤着人们的双眼，很多同学在室外，或者长时间待在空调房里，眼睛会出现各种不适，对生活和学习都会产生不小的影响。
              如何让眼睛清爽一些！这些夏日护眼小妙招你需要get一下！</p>
          <div class="articleTitle"><p>01</p> <p>阳光强时戴上太阳镜</p></div>
          <img v-if="imgList.length > 0" :src="readPath + imgList[0]" />
          <p>不要忽视了紫外线的杀伤力，在阳光紫外线照射强度大的夏季，它不仅会让你的皮肤变黑，短时间的照射还可能引发眼睛的急性炎症，如结膜炎、角膜炎等。它还能够加速白内障的发生，还可能造成视网膜黄斑变性，进而影响视力的改变。所以，夏天出门时，最好戴上太阳镜，以阻挡紫外线对眼睛的伤害。</p>
          <div class="articleTitle"><p>02</p><p>空调不要吹太久</p></div>
          <img  v-if="imgList.length > 0" :src="readPath + imgList[1]" />
          <p>长时间开着空调的房间虽然凉爽，但这样的环境空气湿度低，如果再加上长时间用眼或者电子产品，眼睛很容易干涩。所以，不要吹太久的空调，空调房间最好每隔两个小时通风一次。可以座位附近放置茶水，以增加周边的湿度。</p>
          <div class="articleTitle"><p>03</p> <p>做眼保健操</p></div>
        <img  v-if="imgList.length > 0" :src="readPath + imgList[2]" />
          <p>如果眼睛感觉累了，就停下手里的事情，闭上双眼做一做眼保健操，轻轻按压眼周穴位，眼睛就会得到充分放松。</p>
          <div class="articleTitle"><p>04</p><p>多吃水果、多喝水</p></div>
          <img  v-if="imgList.length > 0" :src="readPath + imgList[3]" />
          <p>多吃各种水果，特别是柑桔类水果，多吃绿色蔬菜、粮食、鱼和鸡蛋，多喝水对减轻眼睛干燥也有帮助。</p>
          <p>橘子的维生素C含量较高，与其他水果相比是比较多的。维生素C的作用可用于保护视力，对抗眼部衰老等问题。对于视觉疲劳的人，可以多吃一些橘子，对身体有好处。</p>
          <p>胡萝卜是大家生活中最常吃的一种蔬菜，维生素A对保持眼睛健康至关重要。其内含抗氧化的β胡萝卜素，有益眼睛健康。胡萝卜是很好的维生素A来源，而且，除了胡萝卜，还有卷心菜和莴苣，也都富含维生素A。缺乏维生素A会引起夜盲症。</p>
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
        'articleimage/15/' + 1 + '.png',
        'articleimage/15/' + 2 + '.png',
        'articleimage/15/' + 3 + '.png',
        'articleimage/15/' + 4 + '.png'
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
      apiArticleReading(15)
        .then(res => {})
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
