<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>防治小学生肥胖措施</p>
          <p> {{ articletime }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <p>儿童少年时期发生的肥胖绝大多数属于单纯性肥胖，其发生原因既有环境因素又有遗传因素。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[0]"/>
          <p>营养过剩是儿童青少年肥胖的最重要原因，吃进去的食物过多，以致使多余的热量转变成脂肪，在体内蓄积，同时，又缺乏足够运动，那么，缺乏运动也是造成儿童少年肥胖的最重要因素。饮食习惯与肥胖密切相关，有人研究，大量吃甜食、动物性脂肪和油膩食物的人容易发生肥胖。主食吃得过多，吃饭速度过快也是造成肥胖的原因。</p>

          <p>肥胖的预防措施包括以下几点</p>
          <p>1、认识肥胖对机体的危害，肥胖产生原因及防治方法，提高预防肥胖的知识和能力。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[1]"/>

          <p>2、培养良好的饮食习惯。进食量适中，不过饱，为了增加饱腹感，餐前可先吃水果和汤类。少吃糖果、点心等甜食，少吃油腻食物，吃饭要细嚼慢咽，防止狼吞虎咽，两餐间的零食可以以水果和玉米花一类的小食品来代替糖果糕点。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[2]"/>

          <p>3、积极参加体育活动，合理安排作息制度，睡眠时间不要过多，饭后不要马上看书或看电视，晚饭与上床睡觉之间最好有3小时的间隔。</p>
          <p>4、如果已发胖，千万不要强行采取饥饿疗法或减肥药物来降低体重，这样会影响青春期正常发育甚至发生青春期厌食症，应该及时进行饮食成分的调整，如减少主食，限制吃肥肉!奶油、精制糕点、糖果:多吃含纤维素多的食物，如新鲜蔬菜和水果;瘦肉、鸡蛋、黄豆，则不宜减少。</p>
          <p>5、加强体育锻炼，增加热量消耗，如做减肥体操、游泳、跑步等各种活动。应有一定的运动量，并坚持锻炼持之以恒，这样既可增强体质，提高身体抵抗力，又可起到减轻体重的作用。</p>

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
        'articleimage/20/' + 1 + '.png',
        'articleimage/20/' + 2 + '.png',
        'articleimage/20/' + 3 + '.png'
      ],
      timer: '',
      articletime: '',
      clickCount: 0
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  mounted () {
    this.articletime = this.$route.query.time
    this.clickCount = this.$route.query.clickCount
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
      apiArticleReading(20)
        .then(res => {})
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss">
.articleDetail {
  padding: 0 10px;
  .info {
    .infoTitle {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      p:first-child {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51,51,51,1);
        padding-bottom: 8px;
        border-bottom: 1px solid #ccc;
      }
      p:last-child {
        margin-top: 8px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(153,153,153,1);
      }
    }
    .infoContent {
      p {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51,51,51,1);
        line-height: 23px;
        text-indent: 32px;
        display: block;
        margin-bottom: 15px;
      }
      .articleTitle {
        margin: 15px 0 10px 0;
        color: #333;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
}
</style>
