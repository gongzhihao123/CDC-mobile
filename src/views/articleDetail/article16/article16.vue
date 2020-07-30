<template>
  <div class="articleDetail16">
    <div class="info">
        <div class="infoTitle">
          <p>适合孩子的课桌椅怎么挑？这些细节马虎不得</p>
          <p> {{ articletime }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <p>居家期间，家长和老师最担心的就是孩子的视力健康。户外运动少，屏幕时间多，都对孩子的视力防控提出了很大的挑战。如今学校暑期来临，在完成暑期学业之时，我们也千万不能忽视近视的风险！这些关于青少年的科学用眼指南，一定要牢记哦～</p>
          <div class="articleTitle">1.什么样的课桌椅更有利于保护视力与预防近视？</div>
          <p>与孩子身高相匹配的课桌椅可以有效保护视力，预防近视。生活中，我们经常见到这样的情景，孩子趴在餐桌上或者坐在床上写作业、学习，有的是因为家里空间的限制，也有的是因为家长不够重视。很多父母在家装中对孩子的考量很周全了，但却忽略了孩子家庭学习阅读的灯光、学习桌椅的布置。</p>
          <div class="articleTitle">2.什么是正确的桌椅高度？</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[0]"/>
          <p>不合适的桌椅会对坐姿、视距造成很大的影响，导致近视和脊柱弯曲等疾病的发生，家里要配备学习专用的课桌椅，而不能用餐桌，餐椅或者是床来代替。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[1]"/>
          <p>因为餐桌、餐椅经常会过高，床软而且低，都不能替代正规的课桌椅。对于有可调式桌椅的家庭，可以根据孩子的身高，按照中小学课桌椅尺寸与学生身高对照表找到适合孩子的桌面高和座面高。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[2]"/>
          <p>那么，什么是正确的桌椅高度呢？正确的桌椅高度应该能使人坐着的时候保持两个基本垂直：1当两脚平放在地面时，大腿与小腿能够基本垂直。2当两臂自然下垂时，上臂与小臂基本垂直，这时桌面高度应该刚好与小臂下平面接触。</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[3]"/>
          <div class="articleTitle">3.如何调整桌椅的高度？</div>
          <p>对于有可调试桌椅的家庭，可以根据孩子的身高进行调试，找到适合孩子的桌面高和座面高。
  桌面高：桌面近胸缘距离地面的高度
  座面高：椅前缘离地面的高度</p>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[4]"/>
          <p>家长可使用简单的方法来调整家里的课桌椅，如果桌子高了就尽可能使用高一点的椅子，使用高一点的椅子之后要在脚下垫一个脚垫，要使脚能平放在脚垫上，保持大腿和小腿垂直。当桌子或者椅子过矮的时候，要将桌子或者是椅子垫高。</p>
          <p>孩子处在生长发育阶段，身高每年都在变化，而与孩子身高不匹配的课桌椅，不仅会影响孩子视力，还会导致弯腰驼背，因此，要根据孩子身高定期调整课桌椅，避免“过期”桌椅。</p>
          <div class="articleTitle">4.学校课桌椅设置</div>
          <p>最前排课桌的前沿与前方黑板的水平距离不应当小于2.2米。最后排课桌的后沿与前方黑板的水平距离，小学不应大于8米、中学不应大于9米。就是教室也不应该过长。学生两肘间的宽度，一般为0.7~0.8米，而标准的课桌宽度是0.6米，为了保证正确的读写姿势，纵向走道宽度，也就是两排书桌相隔的距离不应小于0.6米，而且沿墙布置的课桌的端部与墙面的净距离不应小于0.15米，也就是靠边的桌子不能靠到墙，要留出0.15米的距离。</p>
          <p>在新冠肺炎防控期间，课桌的摆放要注意增大间距，增大间距的同时要考虑到上面讲的几点。最后还有一点，每学期要为学生课桌椅高度进行个性化调整，以保证每个孩子都能够得到与自己身高相匹配的课桌椅。</p>
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
        'articleimage/16/' + 1 + '.png',
        'articleimage/16/' + 2 + '.png',
        'articleimage/16/' + 3 + '.png',
        'articleimage/16/' + 4 + '.png',
        'articleimage/16/' + 5 + '.png'
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
      apiArticleReading(16)
        .then(res => {})
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss">
.articleDetail16 {
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
