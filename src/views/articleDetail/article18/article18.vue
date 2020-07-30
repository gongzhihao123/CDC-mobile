<template>
  <div class="articleDetail">
    <div class="info">
        <div class="infoTitle">
          <p>近视防控“京十条”</p>
          <p> {{ articletime }} &nbsp;&nbsp; 浏览{{ clickCount }}次 </p>
        </div>
        <div class="infoContent">
          <p>北京市教委联合十部门出台《北京市儿童青少年近视防控十条措施》，对学校和家长如何防控青少年近视提出了细化要求，学校应如何落实，家长又该如何发力呢？</p>
          <div class="articleTitle">措施一：严格控制学生使用电子产品</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[0]"/>
          <p>学校：学生个人手机、平板电脑等电子产品严禁带入课堂，带入学校的要进行统一保管。教师使用电子屏幕开展教学时长累计不得超过教学总时长的30%。</p>
          <p>家长：家长要以身作则地引导孩子特别是学龄前儿童合理有度地使用电子产品，严禁8岁以下的低幼年龄儿童玩电子游戏，孩子每天使用电子屏幕时间不得超过1小时。</p>

          <div class="articleTitle">措施二：切实减轻学生学业负担</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[1]"/>
          <p>学校：学校要合理安排学生作业时间，小学一二年级严禁布置书面家庭作业。</p>
          <p>家长：家长要引导孩子合理安排作业时间，督促孩子规范做好眼保健操。家长要严格保障孩子睡眠时间，幼儿园和小学生每天睡眠不低于10小时、初中生不低于9小时、高中阶段学生不低于8个小时。</p>

          <div class="articleTitle">措施三：切实强化体育课和课外锻炼</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[2]"/>
          <p>学校：严禁挤占体育课时和大课间，中小学生在校时体育活动时间每天不低于1小时，要利用课后服务时间优先安排体育活动。</p>
          <p>家长：家长要引导孩子每天进行户外活动或体育锻炼，陪同或督促孩子完成寒暑假体育作业。</p>

          <div class="articleTitle">措施四：严格落实学生作息管理</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[3]"/>
          <p>学校：严禁中小学拖堂现象，严格落实全体中小学生每天上下午各1次眼保健操的要求，重点加强小学低年级学生的作息管理，学校要建立并严格执行作息制度落实情况每日检查机制。</p>

          <div class="articleTitle">措施五：大力加强学校卫生健康教育</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[4]"/>
          <p>学校：学校要对学生、教师和家长分别开展有针对性的健康教育，每学期至少分别开展一次近视防控专题教育。必须将健康教育纳入教职员工入职和在职培训。切实将健康教育融入课堂教学、校园文化和学生日常行为规范。</p>

          <div class="articleTitle">措施六：严格落实视力日常监测</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[5]"/>
          <p>学校：学校每学期对全体学生进行视力日常监测不得少于2次，必须建立健全健康体检数据库，学校必须建立视力不良学生健康档案并进行有针对性的干预，发现视力异常学生必须告知家长进行专业检查。</p>

          <div class="articleTitle">措施七：切实改善学校教学环境</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[6]"/>
          <p>学校：严格落实普通中小学校、中等职业学校建设标准，学校教室照明卫生条件必须100%达标。每学期对教室、实验室、图书馆（阅览室）、宿舍、体育场馆等采光和照明条件进行一次检查和清洁。至少每月调整一次学生座位。至少每学期集中调整一次学生课桌椅高度。</p>

          <div class="articleTitle">措施八：切实加强学生视力健康日常干预</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[7]"/>
          <p>学校：教师必须掌握“一尺、一拳、一寸”的正确读写姿势并教会学生熟练应用，监督并随时纠正学生不良读写姿势。教师发现学生出现看不清黑板、经常揉眼睛等迹象时，有义务询问其视力情况并及时提醒。</p>

          <div class="articleTitle">措施九：大力促进学生饮食健康</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[8]"/>
          <p>学校：学校供餐必须保障学生鱼类、水果、绿色蔬菜等有益于视力健康的营养膳食。</p>
          <p>家长：家长要引导孩子不挑食、不偏食，严格控制高糖、高油、高盐等食品饮料的摄入。</p>

          <div class="articleTitle">措施十：严格强化监督问责</div>
          <van-image lazy-load v-if="imgList.length > 0" :src="readPath + imgList[9]"/>
          <p>学校：建立并严格落实各区、学校、班级每年开展儿童青少年近视防控工作评议考核制度。将儿童青少年近视防控工作、总体近视率和体质健康状况纳入学校绩效考核，对儿童青少年体质健康水平下降的区、校依法依规予以问责。学校对视力明显下降的学生家长和班主任进行约谈。</p>
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
        'articleimage/18/' + 1 + '.png',
        'articleimage/18/' + 2 + '.png',
        'articleimage/18/' + 3 + '.png',
        'articleimage/18/' + 4 + '.png',
        'articleimage/18/' + 5 + '.png',
        'articleimage/18/' + 6 + '.png',
        'articleimage/18/' + 7 + '.png',
        'articleimage/18/' + 8 + '.png',
        'articleimage/18/' + 9 + '.png',
        'articleimage/18/' + 10 + '.png'
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
      apiArticleReading(18)
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
